// firebase-config.js

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCD01kL0PEx-2oRHtm8zXPDuzQqzpTdof0",
  authDomain: "todo-12838.firebaseapp.com",
  projectId: "todo-12838",
  storageBucket: "todo-12838.appspot.com", 
  messagingSenderId: "68748198060",
  appId: "1:68748198060:web:4cb290f37e43d0585c5f09",
  measurementId: "G-3WQYPCVHQE"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const analytics = getAnalytics(app);
