import firebaseRulesPlugin from '@firebase/eslint-plugin-security-rules';

export default [
  {
    ignores: ['dist/**/*', 'node_modules/**/*', 'vendor/**/*', 'js/firebase-client.js'],
  },
  firebaseRulesPlugin.configs['flat/recommended'],
];
