import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDfVv4cRAmGN1F3Xch6F1nCLihDHMnVJFQ",
    authDomain: "insta-clone-f2b70.firebaseapp.com",
    projectId: "insta-clone-f2b70",
    storageBucket: "insta-clone-f2b70.firebasestorage.app",
    messagingSenderId: "756010764148",
    appId: "1:756010764148:web:051fe69c6eb468fe450e21"
};

const app = initializeApp(firebaseConfig);

// Firebase services
export const storage = getStorage(app);
export const auth = getAuth(app);
export const db = getFirestore(app);