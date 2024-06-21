// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyDeUu2Ws2L3vNqy3rT7-_2CLS9nNuu6Abo",
  authDomain: "term5-tatsuto-sugioka.firebaseapp.com",
  projectId: "term5-tatsuto-sugioka",
  storageBucket: "term5-tatsuto-sugioka.appspot.com",
  messagingSenderId: "877574459939",
  appId: "1:877574459939:web:31fdeb23c2cb1891ec9796"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
