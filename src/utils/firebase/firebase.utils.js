import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    signInWithRedirect,
    GoogleAuthProvider
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';

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


// Authentication code
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
})


export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);


// firestore database code
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapShot = await getDoc(userDocRef);

    // if user data does not exist in the database...
    // then run this code below (create the data).
    if (!userSnapShot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, // set the document in the db
                {
                    displayName, email, createdAt
                })
        } catch (error) {
            console.log(`There is an error creating the user ${error.message}`)
        }
    }
   
    // if user data exist in the database....
    // then run this code (return the data).
    return userDocRef;
}