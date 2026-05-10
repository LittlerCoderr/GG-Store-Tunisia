import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  updateEmail,
} from 'firebase/auth';
import { doc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './config';

/**
 * Sign up a new user, create their Firestore document.
 */
export const signUpWithEmail = async (email, password, displayName) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Update Firebase Auth profile
  await updateProfile(user, { displayName });

  // Create Firestore user document
  await setDoc(doc(db, 'users', user.uid), {
    uid: user.uid,
    displayName,
    email,
    photoURL: '',
    balance: 0,
    createdAt: serverTimestamp(),
  });

  return user;
};

/**
 * Sign in an existing user with email and password.
 */
export const signInWithEmail = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

/**
 * Sign out the current user.
 */
export const signOutUser = async () => {
  await signOut(auth);
};

/**
 * Update the user's display name and/or photo URL in both
 * Firebase Auth and their Firestore document.
 */
export const updateUserProfile = async (uid, { displayName, photoURL }) => {
  const updates = {};
  const authUpdates = {};

  if (displayName !== undefined) {
    updates.displayName = displayName;
    authUpdates.displayName = displayName;
  }
  if (photoURL !== undefined) {
    updates.photoURL = photoURL;
    authUpdates.photoURL = photoURL;
  }

  await updateProfile(auth.currentUser, authUpdates);
  await updateDoc(doc(db, 'users', uid), updates);
};

/**
 * Update the user's email in Firebase Auth and Firestore.
 */
export const updateUserEmail = async (uid, newEmail) => {
  await updateEmail(auth.currentUser, newEmail);
  await updateDoc(doc(db, 'users', uid), { email: newEmail });
};
