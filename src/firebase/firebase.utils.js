import firebase from "firebase/app";

import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAjMzx4xj_nvkSwyNbNo11HveOWgUUMpJM",
  authDomain: "crwn-clothing-2336b.firebaseapp.com",
  databaseURL: "https://crwn-clothing-2336b.firebaseio.com",
  projectId: "crwn-clothing-2336b",
  storageBucket: "crwn-clothing-2336b.appspot.com",
  messagingSenderId: "83475259126",
  appId: "1:83475259126:web:e95c87aa8d26e83358d6d7",
  measurementId: "G-4XCFWCKJS7",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`user/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = firebase.firestore.FieldValue.serverTimestamp();

    try {
      userRef.set({ displayName, email, createdAt, ...additionalData });
    } catch (error) {
      console.log("error occured during creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const SignInWithGoogle = async (props = {}) => {
  try {
    await auth.signInWithPopup(provider);
    props.history.push("/");
  } catch (error) {
    alert(error.message);
  }
};

export default firebase;
