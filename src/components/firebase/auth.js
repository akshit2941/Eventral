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
    });

    return user;
  } catch (error) {
    console.error("Error creating user:", error.message);
    throw error;
  }
};

export const doSignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
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
    });

    return user;
  } catch (error) {
    console.error("Error signing in with Google:", error.message);
    throw error;
  }

  // add user to firestore
};

export const doSignOut = () => {
  auth.signOut()
    .then(() => {
      window.location.href = '/'; // Redirect to home page after logout
    })
    .catch(error => {
      console.error('Error signing out:', error);
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

// Function to get user avatar URL from Firestore
export const getUserAvatar = async () => {
  try {
    const userId = auth.currentUser.uid; // Get current user ID
    const userDoc = await firestore.collection('artists').doc(userId).get();

    if (userDoc.exists) {
      const userData = userDoc.data();
      if (userData.photoUrl) {
        return userData.photoUrl;
      } else {
        console.log("User document does not contain photoUrl field");
        return null;
      }
    } else {
      console.log("User document does not exist");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user avatar:", error);
    return null;
  }
};
