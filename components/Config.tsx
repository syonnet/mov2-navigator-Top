// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import	{ getDatabase } from "firebase/database";



export const firebaseConfig = {
  apiKey: "AIzaSyCZDlSn4S3hbmZLKjiLZsCGs3I8OWx9ifw",
  authDomain: "proyectomob2.firebaseapp.com",
  databaseURL: "https://proyectomob2-default-rtdb.firebaseio.com",
  projectId: "proyectomob2",
  storageBucket: "proyectomob2.appspot.com",
  messagingSenderId: "806150547323",
  appId: "1:806150547323:web:6bec62f8aa1f758d27bfde"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);