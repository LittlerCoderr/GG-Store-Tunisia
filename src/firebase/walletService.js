import {
  doc,
  getDoc,
  collection,
  getDocs,
  addDoc,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './config';

/**
 * Fetch the full user document from Firestore.
 * Returns user data including balance (read-only on frontend).
 */
export const getUserData = async (uid) => {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
  return null;
};

/**
 * Fetch the user's wallet top-up transactions, newest first.
 * Each doc: { amount, date, status: 'pending'|'approved', note }
 */
export const getWalletTransactions = async (uid) => {
  const colRef = collection(db, 'users', uid, 'wallet_transactions');
  const q = query(colRef, orderBy('date', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

/**
 * Fetch the user's purchase history, newest first.
 * Each doc: { itemName, date, price, generatedCode, orderId }
 */
export const getPurchaseHistory = async (uid) => {
  const colRef = collection(db, 'users', uid, 'purchase_history');
  const q = query(colRef, orderBy('date', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

/**
 * Save a purchase record to the user's purchase_history sub-collection.
 * Called after a successful checkout.
 */
export const savePurchaseRecord = async (uid, { itemName, price, generatedCode, orderId }) => {
  const colRef = collection(db, 'users', uid, 'purchase_history');
  await addDoc(colRef, {
    itemName,
    price,
    generatedCode,
    orderId,
    date: serverTimestamp(),
  });
};
