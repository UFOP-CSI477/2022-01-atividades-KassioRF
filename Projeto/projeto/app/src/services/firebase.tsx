// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMGfk283iylVYFx1zlGqqOOyASUhaeL7k",
  authDomain: "tpweb-b8e4b.firebaseapp.com",
  projectId: "tpweb-b8e4b",
  storageBucket: "tpweb-b8e4b.appspot.com",
  messagingSenderId: "539315121826",
  appId: "1:539315121826:web:32630265c358ccf6ce71fb"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const firebaseApp = () => {
  return firebase;
}

export { firebaseApp };

export const database = getDatabase(firebase);