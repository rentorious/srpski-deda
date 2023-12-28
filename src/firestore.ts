import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyBtj3Y2y4mSaMZBsnFHptIc5zSiTf1pIH8",
  authDomain: "secresanta-408810.firebaseapp.com",
  projectId: "secresanta-408810",
  storageBucket: "secresanta-408810.appspot.com",
  messagingSenderId: "1054027367743",
  appId: "1:1054027367743:web:3fc2ed03f28c9d79f9bf8a",
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
