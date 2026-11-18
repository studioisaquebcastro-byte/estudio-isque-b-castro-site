# Firestore Security Spec (`leads`)

## 1. Data Invariants
- Every document in `/leads/{leadId}` must contain the 10 core fields (`created_at`, `name`, `email`, `whatsapp`, `brand`, `theme`, `message`, `status`, `notes`, `last_reply_at`) plus optional `last_reply` (`{ sent_at, subject, attachment_count }` or `null`) with no shadow/extra keys.
- `created_at` must equal `request.time` on creation and remain immutable on update.
- Public visitors may ONLY `create` a lead with `status == "new"`, `notes == ""`, `last_reply_at == null`, and without setting `last_reply`.
- Public visitors and non-admin authenticated users may NEVER `get`, `list`, `update`, or `delete` any lead.
- Only a signed-in Google user whose `email == "studioisaquebcastro@gmail.com"` AND `email_verified == true` is admin.
- Admin updates are restricted to `status` (`"new" | "replied" | "closed"`), `notes`, `last_reply_at` (`null` or `request.time`), and `last_reply` (`sent_at == request.time`, `subject` string <= 200, `attachment_count` int 0..10).

## 2. Adversarial Payloads ("Dirty Dozen")
1. **Shadow field on create**: `{ ..., isAdmin: true }` -> `PERMISSION_DENIED` (`hasOnly` check).
2. **Pre-set status on create**: `{ ..., status: "replied" }` -> `PERMISSION_DENIED` (`status == 'new'`).
3. **Spoofed timestamp on create**: `{ ..., created_at: oldDate }` -> `PERMISSION_DENIED` (`created_at == request.time`).
4. **Pre-filled admin notes on create**: `{ ..., notes: "VIP" }` -> `PERMISSION_DENIED` (`notes == ''`).
5. **1MB string poisoning in `message`**: `{ ..., message: "a".repeat(5000) }` -> `PERMISSION_DENIED` (`size() <= 4000`).
6. **Oversized `leadId` path poisoning**: doc ID of 200 chars or invalid chars -> `PERMISSION_DENIED` (`isValidId`).
7. **Invalid email format**: `{ ..., email: "not-an-email" }` -> `PERMISSION_DENIED` (regex match).
8. **Unauthenticated `list` on `/leads`**: -> `PERMISSION_DENIED` (`isAdmin()`).
9. **Non-admin authenticated `get` on `/leads/{id}`**: -> `PERMISSION_DENIED` (`isAdmin()`).
10. **Unverified admin email spoofing**: `email == "studioisaquebcastro@gmail.com"`, `email_verified == false` -> `PERMISSION_DENIED`.
11. **Admin mutating immutable `email`/`message`**: update touching `email` -> `PERMISSION_DENIED` (`affectedKeys().hasOnly(['status', 'notes', 'last_reply_at'])`).
12. **Invalid status transition value**: `{ status: "archived" }` -> `PERMISSION_DENIED` (`status in ['new', 'replied', 'closed']`).
