import { getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
   //add your firebase api key here
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
