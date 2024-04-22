import { auth, firestore } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Add user to Firestore
    const userRef = doc(firestore, "artists", user.uid);
    await setDoc(userRef, {
      displayName: displayName,
      email: user.email,
      // Add any additional user data you want to store in Firestore
    }, { merge: true }); // Merge option here

    return user;
  } catch (error) {
    alert("Error creating user: " + error.message);
    window.location.reload();
    return null;
  }
};


export const doSignInWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    alert("Error signing in: " + error.message);
    // Reload the page
    window.location.reload();
    // Alternatively, you can show an alert:
    // alert("Error signing in: " + error.message);
    return null;
  }
};

export const doSignInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Add user to Firestore
    const userRef = doc(firestore, "artists", user.uid);
    await setDoc(userRef, {
      displayName: user.displayName,
      email: user.email,
      photoUrl: user.photoURL,
      // Add any additional user data you want to store in Firestore
    }, { merge: true });

    return user;
  } catch (error) {
    alert("Error signing in with Google:" + error.message);
    // Reload the page
    window.location.reload();
    // Alternatively, you can show an alert:
    // alert("Error signing in with Google: " + error.message);
    return null;
  }

  // add user to firestore
};

export const doSignOut = () => {
  auth.signOut()
    .then(() => {
      window.location.href = '/'; // Redirect to home page after logout
    })
    .catch(error => {
      alert('Error signing out:', error);
      return null;
    });
};

export const doPasswordReset = (email) => {
  return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password) => {
  return updatePassword(auth.currentUser, password);
};

export const doSendEmailVerification = () => {
  return sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}/home`,
  });
};

