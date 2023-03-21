import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"



const firebaseConfig = {
    apiKey: "AIzaSyCR5LuvMf0g-TtZZtRYXSK6Lm5ltospfXs",
    authDomain: "parkfast-6122f.firebaseapp.com",
    projectId: "parkfast-6122f",
    storageBucket: "parkfast-6122f.appspot.com",
    messagingSenderId: "360343421345",
    appId: "1:360343421345:web:242db151ff34ddc7224be0",
    measurementId: "G-HP091RP547"
};

// init firebase app
const app = initializeApp(firebaseConfig);

// init firestore app
export const db = getFirestore();

// init 

export const auth = getAuth(app);

