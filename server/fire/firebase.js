const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyCR5LuvMf0g-TtZZtRYXSK6Lm5ltospfXs",
    authDomain: "parkfast-6122f.firebaseapp.com",
    projectId: "parkfast-6122f",
    storageBucket: "parkfast-6122f.appspot.com",
    messagingSenderId: "360343421345",
    appId: "1:360343421345:web:242db151ff34ddc7224be0",
    measurementId: "G-HP091RP547"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = { db };
