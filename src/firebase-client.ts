import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocFromServer,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  type Unsubscribe,
  type Timestamp,
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/gmail.send');
provider.setCustomParameters({ prompt: 'select_account' });

// Cache Gmail OAuth access token strictly in memory (never localStorage/sessionStorage).
let cachedAccessToken: string | null = null;
let isSigningIn = false;

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null,
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((p) => ({
          providerId: p.providerId,
          email: p.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration.');
    }
  }
}
void testConnection();

export interface LeadInput {
  name: string;
  email: string;
  whatsapp?: string;
  brand?: string;
  theme?: string;
  message: string;
}

export type LeadStatus = 'new' | 'replied' | 'closed';

export interface LastReplyLog {
  sent_at: Timestamp | null;
  subject: string;
  attachment_count: number;
}

export interface LeadRecord {
  id: string;
  created_at: Timestamp | null;
  name: string;
  email: string;
  whatsapp: string;
  brand: string;
  theme: string;
  message: string;
  status: LeadStatus;
  notes: string;
  last_reply_at: Timestamp | null;
  last_reply: LastReplyLog | null;
}

const clamp = (val: unknown, max: number) =>
  typeof val === 'string' ? val.trim().slice(0, max) : '';

export async function createLead(input: LeadInput): Promise<string> {
  const payload = {
    created_at: serverTimestamp(),
    name: clamp(input.name, 120),
    email: clamp(input.email, 254),
    whatsapp: clamp(input.whatsapp, 32),
    brand: clamp(input.brand, 160),
    theme: clamp(input.theme, 200),
    message: clamp(input.message, 4000),
    status: 'new' as const,
    notes: '',
    last_reply_at: null,
  };

  try {
    const ref = await addDoc(collection(db, 'leads'), payload);
    return ref.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, 'leads');
  }
}

export function onAuthChange(callback: (user: User | null) => void): Unsubscribe {
  return onAuthStateChanged(auth, (user) => {
    if (!user && !isSigningIn) {
      cachedAccessToken = null;
    }
    callback(user);
  });
}

export async function signInWithGoogleAdmin(): Promise<{
  user: User;
  idToken: string;
  accessToken: string | null;
}> {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    cachedAccessToken = credential?.accessToken ?? null;
    const idToken = await result.user.getIdToken();
    return {
      user: result.user,
      idToken,
      accessToken: cachedAccessToken,
    };
  } finally {
    isSigningIn = false;
  }
}

export async function getAdminIdToken(forceRefresh = false): Promise<string | null> {
  if (!auth.currentUser) return null;
  return auth.currentUser.getIdToken(forceRefresh);
}

export function getGmailAccessToken(): string | null {
  return cachedAccessToken;
}

export async function signOutAdmin(): Promise<void> {
  cachedAccessToken = null;
  await signOut(auth);
}

export function subscribeLeads(
  onData: (leads: LeadRecord[]) => void,
  onError?: (error: Error) => void,
): Unsubscribe {
  const q = query(collection(db, 'leads'), orderBy('created_at', 'desc'));
  return onSnapshot(
    q,
    (snapshot) => {
      const rows: LeadRecord[] = snapshot.docs.map((d) => {
        const data = d.data();
        const rawReply =
          data.last_reply && typeof data.last_reply === 'object' ? data.last_reply : null;
        return {
          id: d.id,
          created_at: (data.created_at as Timestamp) ?? null,
          name: String(data.name ?? ''),
          email: String(data.email ?? ''),
          whatsapp: String(data.whatsapp ?? ''),
          brand: String(data.brand ?? ''),
          theme: String(data.theme ?? ''),
          message: String(data.message ?? ''),
          status: (data.status as LeadStatus) || 'new',
          notes: String(data.notes ?? ''),
          last_reply_at: (data.last_reply_at as Timestamp) ?? null,
          last_reply: rawReply
            ? {
                sent_at: (rawReply.sent_at as Timestamp) ?? null,
                subject: String(rawReply.subject ?? ''),
                attachment_count: Number(rawReply.attachment_count ?? 0),
              }
            : null,
        };
      });
      onData(rows);
    },
    (error) => {
      try {
        handleFirestoreError(error, OperationType.LIST, 'leads');
      } catch (wrapped) {
        if (onError) onError(wrapped as Error);
      }
    },
  );
}

export async function updateLead(
  id: string,
  updates: {
    status?: LeadStatus;
    notes?: string;
    markReplied?: boolean;
    replyLog?: { subject: string; attachmentCount: number };
  },
): Promise<void> {
  const path = `leads/${id}`;
  const patch: Record<string, unknown> = {};
  if (updates.status !== undefined) patch.status = updates.status;
  if (updates.notes !== undefined) patch.notes = clamp(updates.notes, 4000);
  if (updates.markReplied) {
    patch.status = 'replied';
    patch.last_reply_at = serverTimestamp();
    if (updates.replyLog) {
      patch.last_reply = {
        sent_at: serverTimestamp(),
        subject: clamp(updates.replyLog.subject, 200) || 'Re: your request',
        attachment_count: Math.max(0, Math.min(10, Math.trunc(updates.replyLog.attachmentCount))),
      };
    }
  }
  try {
    await updateDoc(doc(db, 'leads', id), patch);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function deleteLead(id: string): Promise<void> {
  const path = `leads/${id}`;
  try {
    await deleteDoc(doc(db, 'leads', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}
