import { initializeApp } from 'firebase/app';
import {
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    onAuthStateChanged} from 'firebase/auth'
import{
    getFirestore,
    doc,
    getDoc,
    setDoc
}from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCg2wcZFIPpE-DBKBytkrBNHC8FvAHjnfk",
  authDomain: "food-app-e3045.firebaseapp.com",
  projectId: "food-app-e3045",
  storageBucket: "food-app-e3045.appspot.com",
  messagingSenderId: "805930763060",
  appId: "1:805930763060:web:e35053ebb9282a6bc51b61"
};

const app = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
    userAuth, 
    additionalInformation = {}
    ) => {
    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);
    
    if(!userSnapshot.exists()) {
        const { email } = userAuth;
        const createdAt = new Date();
        try{
            await setDoc(userDocRef, {
                email,
                createdAt,
                ...additionalInformation
            });
        }catch (error) {
            console.log(error);
        }
    }

    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password)
};

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsusbscribe = onAuthStateChanged(
            auth, 
            (userAuth) => {
                unsusbscribe();
                resolve(userAuth);
            },
            reject
        )
    })
}

