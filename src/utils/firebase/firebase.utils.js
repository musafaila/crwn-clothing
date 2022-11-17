import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyANy33PA42qWu1O22Mnq0ZL7jDicigSSks",

    authDomain: "crwn-clothing-ea14e.firebaseapp.com",

    projectId: "crwn-clothing-ea14e",

    storageBucket: "crwn-clothing-ea14e.appspot.com",

    messagingSenderId: "497158888591",

    appId: "1:497158888591:web:2784bc5ff5084ac51724fa",
};


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);