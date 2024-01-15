import { getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBhUzeiBshsambqniVQOP8tXIWYdr7MFOI",
  authDomain: "job-search-app-a5cae.firebaseapp.com",
  projectId: "job-search-app-a5cae",
  storageBucket: "job-search-app-a5cae.appspot.com",
  messagingSenderId: "422759291382",
  appId: "1:422759291382:web:20ef6f8a30d745fe7fcfd7",
};

// const app = initializeApp(firebaseConfig);

// const auth = getAuth(app);

// const db = getFirestore();

// export { auth, db };

let app;
let auth;
let db;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
} catch (error) {
  console.error("Error initializing Firebase:", error);
}

export { auth, db };