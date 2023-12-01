import { initializeApp } from 'firebase/app';
import {
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from 'firebase/auth'
import{
    getFirestore,
    doc,
    setDoc,
    getDocFromServer
}from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDDa02vOGJna962UlLeIe4fo6T-fpwXB5U",
    authDomain: "foodapp-7fb03.firebaseapp.com",
    projectId: "foodapp-7fb03",
    storageBucket: "foodapp-7fb03.appspot.com",
    messagingSenderId: "209468985379",
    appId: "1:209468985379:web:3d6c60170fb9bf1680e196"
  };  


const app = initializeApp(firebaseConfig);// eslint-disable-line no-unused-vars

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {
    console.log(userAuth)
    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDocFromServer(userDocRef);
    
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

export const signOutUser =async () => signOut(auth);

