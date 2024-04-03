import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDFK1cFrZAgpQCH6JH_XukzDvx-iFLreVE",
  authDomain: "eventral-2d7da.firebaseapp.com",
  projectId: "eventral-2d7da",
  storageBucket: "eventral-2d7da.appspot.com",
  messagingSenderId: "891757773347",
  appId: "1:891757773347:web:3f4a61a6d5148236cda796",
  measurementId: "G-PGJV0HKB2H"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)



export { app, auth };
