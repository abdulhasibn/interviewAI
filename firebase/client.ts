// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_API_KEY,
  authDomain: "prepwise-6074f.firebaseapp.com",
  projectId: "prepwise-6074f",
  storageBucket: "prepwise-6074f.firebasestorage.app",
  messagingSenderId: "525175872532",
  appId: "1:525175872532:web:86745239067353b4c49b01",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
