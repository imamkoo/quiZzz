// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDV9JZyt9ZDP5vhGxcr8RI3T7DWBc7OkUU",
  authDomain: "quiz-app-5737c.firebaseapp.com",
  projectId: "quiz-app-5737c",
  storageBucket: "quiz-app-5737c.appspot.com",
  messagingSenderId: "206884772269",
  appId: "1:206884772269:web:3810491a6699487f7ae924",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
