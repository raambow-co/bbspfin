import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

export const firebaseConfig = {
  apiKey: "AIzaSyCeYjOFGjyTnoBboNpZqy4iUQNfsPZhce4",
  authDomain: "bbspartners-01.firebaseapp.com",
  projectId: "bbspartners-01",
  storageBucket: "bbspartners-01.firebasestorage.app",
  messagingSenderId: "813985229438",
  appId: "1:813985229438:web:29e43c31e108892600462f",
  measurementId: "G-MEPVVD2GPN"
};

export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

export async function submitToFirestore(data: Record<string, any>, collectionName = 'submissions') {
  try {
    const colRef = collection(db, collectionName);
    const docRef = await addDoc(colRef, {
      ...data,
      createdAt: serverTimestamp(),
      submittedAt: new Date().toISOString()
    });
    return { success: true, docId: docRef.id };
  } catch (err) {
    console.error(`Firestore save failed for ${collectionName}:`, err);
    return { success: false, error: err };
  }
}

export default app;
