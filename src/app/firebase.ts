import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBX-oOdRpfIivLO8A5bAqJaizDn1Ov1k90",
  authDomain: "blog-13f8c.firebaseapp.com",
  projectId: "blog-13f8c",
  storageBucket: "blog-13f8c.firebasestorage.app",
  messagingSenderId: "1004426293604",
  appId: "1:1004426293604:web:9ec060cf2bad89eccd0a71",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app);

export { auth, createUserWithEmailAndPassword, db, signInWithEmailAndPassword };
