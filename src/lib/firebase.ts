import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDrrLlmL9wqRAlICOf7dEFBvAv78Q-uBkA",
  authDomain: "cura-hospitals1.firebaseapp.com",
  projectId: "cura-hospitals1",
  storageBucket: "cura-hospitals1.firebasestorage.app",
  messagingSenderId: "859783788197",
  appId: "1:859783788197:web:c0f9ac321714e1f73a7f4c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
