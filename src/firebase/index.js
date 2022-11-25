import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAxWSGUl2iJoY1BiB4Kr1lCDJioKqGX60s",
    authDomain: "codex-d1aab.firebaseapp.com",
    projectId: "codex-d1aab",
    storageBucket: "codex-d1aab.appspot.com",
    messagingSenderId: "461572207810",
    appId: "1:461572207810:web:7bd16016db43a8da67b75b"
};
  
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth }
