import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {updateProfile } from "firebase/auth";
import { getStorage,ref ,uploadBytesResumable, getDownloadURL,getMetadata } from 'firebase/storage';
import { getFirestore, serverTimestamp,Timestamp ,doc, setDoc,getDoc,addDoc,updateDoc ,collection, query, where, getDocs, orderBy, limit  } from 'firebase/firestore';



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEbh-txyO6Ir2BGawy978y2gscFsIfgM8",
  authDomain: "reels-fde10.firebaseapp.com",
  projectId: "reels-fde10",
  storageBucket: "reels-fde10.appspot.com",
  messagingSenderId: "850082497487",
  appId: "1:850082497487:web:23bb11035b79d99ee048ba",
  measurementId: "G-5FGL1XZ6CQ"
};

// Initialize Firebase
const app =firebase.initializeApp(firebaseConfig);
const auth=firebase.auth();
const db = getFirestore(app);
const storage = getStorage(app);
export { auth, db, storage, serverTimestamp,Timestamp ,uploadBytesResumable,ref,getMetadata,updateProfile, getDownloadURL ,doc,setDoc,getDoc,addDoc,updateDoc,collection, query, where, getDocs , orderBy, limit};