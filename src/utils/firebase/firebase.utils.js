import { initializeApp } from "firebase/app"; //contains several libraries
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { //from authentication library
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword
} from "firebase/auth"; //contained in firebase/app

import { //Firestore database library
  getFirestore,
  doc,
  getDoc,
  setDoc
} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  //don't worry about api key showing with firebase
  apiKey: "AIzaSyAUOehT-bBzH6qRFuM8fZtZW93lz9hTTyI",
  authDomain: "crwn-clothing-db-4a0a7.firebaseapp.com",
  projectId: "crwn-clothing-db-4a0a7",
  storageBucket: "crwn-clothing-db-4a0a7.appspot.com",
  messagingSenderId: "13341415307",
  appId: "1:13341415307:web:57eeee77c0e62143e0c18e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider(); //sets up a google provider object
provider.setCustomParameters(
  //settings to manage authentication
  {
    prompt: "select_account", //forces user to select an account on prompt
  }
);

export const auth = getAuth(); //instantiate authentication
export const signInWithGooglePopup = () => signInWithPopup(auth, provider); 

export const db = getFirestore(); //initialize the database


//-------------------Save user in database from Sign in--------------------//
//get the data obtained from the authentication service and then save it in
//the firestore database
export const createUserDocumentFromAuth = async (userAuth) => {//user auth is what is returned from the user authentication
  if (!userAuth) return; //if there's no user authentication, don't run this function
  //get me the document reference with said specifications:
  const userDocRef = doc(db, "users", userAuth.uid);//doc takes in 1. database 2. collection 3. data. uid is th eunique id to a user, given back in the sign-in component
//even if the "users" collection nor the document exist, google will create a pointer to them

  console.log(userDocRef);

  //----get the data related to the document userDocRef, check whether it exists
  const userSnapshot = await getDoc(userDocRef);//getDoc get's the doc's data
  console.log(userSnapshot);
  console.log(userSnapshot.exists());//check if it exists in the database

  //----If the user doesn't exist in the database, create it, otherwise, return it
  if (!userSnapshot.exists()) {//if it's true that the user doesn't exist, then
    //create the user in the database
    const { displayName, email } = userAuth; //destructuring user from thr authentication
    const createdAt = new Date(); //time-stamp of when the object was created

    //Try and catch statements: Try to set the document, or create it rather. Remember this is asynchronous.
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      }); //using the document reference...create said object
    } catch(error) {
      console.log("Error creating the user" + error);
    }
  } 
  return userDocRef; //if the user already exists, simply return it.
}

//------------Create from email and Password--------------//
export const createAuthUserFromEmailAndPassword = async(displayName ,email,password) => { //this function needs and email and password
  //if no email nor password is provided exit, don't call the method
  if (!email || !password) return;
  //if both are entered
  const userCredential = await createUserWithEmailAndPassword(auth, email, password); //this is a google function so it's async
  const user = userCredential.user;
  console.log(user);

  // ----Onto actually creating the user in our DB----//
  // 1. create a reference path
  const userDocRef = doc(db, "users", user.uid); 

  //2. create user if it doesn't exist already
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) { //if user doesn't exist already, create him
    const { email } = user;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {//sets the data in a document (userDocRef in this case)
        displayName,
        email,
        createdAt
      }); //using the document reference...create said object
    } catch(error) {
      console.log("Error creating the user" + error);
    } 
  }
  return userDocRef; //in case user already exists

}