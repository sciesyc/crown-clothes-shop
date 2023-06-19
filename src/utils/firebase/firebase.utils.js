import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  writeBatch,
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAoGL3oYRreWELfSTUoL48ujXcqLz0fw1s',
  authDomain: 'crown-clothing-db-7595c.firebaseapp.com',
  projectId: 'crown-clothing-db-7595c',
  storageBucket: 'crown-clothing-db-7595c.appspot.com',
  messagingSenderId: '806440668114',
  appId: '1:806440668114:web:9c6921376e43dc86c6960b',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
console.log('firebaseApp: ', firebaseApp);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);

  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();

  console.log('done');
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((documentSnapshot) => documentSnapshot.data());
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation
) => {
  console.log('createUserDocumentFromAuth start');
  if (!userAuth) return;
  console.log('createUserDocumentFromAuth userAuth', userAuth);

  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error in creating the user', error.message);
    }
  }

  return userSnapshot;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
