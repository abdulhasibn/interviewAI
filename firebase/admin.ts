import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
const initFirebaseAdmin = () => {
  const apps = getApps();
  const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  };
  if (!apps.length) {
    initializeApp({
      credential: cert(serviceAccount),
    });
  }

  return { auth: getAuth(), db: getFirestore() };
};

const { auth, db } = initFirebaseAdmin();

export { auth, db };
