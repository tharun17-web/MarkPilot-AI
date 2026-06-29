import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC8m9a3L3Dk0sYcgitHs3j7aXu7QfFZ1bA",
  authDomain: "markpilot-ai.firebaseapp.com",
  projectId: "markpilot-ai",
  storageBucket: "markpilot-ai.firebasestorage.app",
  messagingSenderId: "366227525015",
  appId: "1:366227525015:web:4dfced995ce8c57207c8d2",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);