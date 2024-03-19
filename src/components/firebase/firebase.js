import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB54DCk_c9fxXNW67qcdMpz1RzC3qGYsuY",
  authDomain: "eventral-47e8e.firebaseapp.com",
  projectId: "eventral-47e8e",
  storageBucket: "eventral-47e8e.appspot.com",
  messagingSenderId: "297141149658",
  appId: "1:297141149658:web:a0356ec447857f590feae3",
  measurementId: "G-PBXCQT32JT"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)



export { app, auth };
