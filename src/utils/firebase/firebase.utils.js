import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    signInWithRedirect,
    GoogleAuthProvider,
    createUserWithEmailAndPassword
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';


// app config
const firebaseConfig = {
    apiKey: "AIzaSyANy33PA42qWu1O22Mnq0ZL7jDicigSSks",

    authDomain: "crwn-clothing-ea14e.firebaseapp.com",

    projectId: "crwn-clothing-ea14e",

    storageBucket: "crwn-clothing-ea14e.appspot.com",

    messagingSenderId: "497158888591",

    appId: "1:497158888591:web:2784bc5ff5084ac51724fa",
};

// Initialize Firebase App
const firebaseApp = initializeApp(firebaseConfig);


// AUTHENTICATION
const googleProvider = new GoogleAuthProvider(); // google provider
googleProvider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth(); // initialize auth instance
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);


// FIRESTORE DATABASE
export const db = getFirestore(); // initialize db instance

export const createUserDocumentFromAuth = async (AuthUser, additionalInfo = {}) => {
    if (!AuthUser) return;

    const userDocRef = doc(db, 'users', AuthUser.uid);
    const userSnapShot = await getDoc(userDocRef);


    // if user data does not exist in the database...
    // then run this code below (create the data).
    if (!userSnapShot.exists()) {
        const { displayName, email } = AuthUser;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, // set the document in the db
                {
                    displayName, email, createdAt, ...additionalInfo
                })
        } catch (error) {
            console.log(`There is an error creating the user ${error.message}`)
        }
    }

    // this will run finally.
    // weather the above condition is true or false.
    return userDocRef;
}


// create user document from sign up
export const createAuthUserFromEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    // const { email, password } = userDetails;
    return await createUserWithEmailAndPassword(auth, email, password);
}



// todo: understand the spread operator clearly.
// todo: create notes for auth and firestore db.
// todo: split firebase utils into different folders.