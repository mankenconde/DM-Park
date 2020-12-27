// import * as firebase from 'firebase';
import firebase from "firebase";
import "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBVQYRYjyCdsZnkx8EOG152XRWkE-inkyM",
    authDomain: "dmpark-9b061.firebaseapp.com",
    databaseURL: "https://dmpark-9b061.firebaseio.com",
    projectId: "dmpark-9b061",
    storageBucket: "dmpark-9b061.appspot.com",
    messagingSenderId: "179743542565",
    appId: "1:179743542565:web:e203fcafafe9f6211c1ecc",
    measurementId: "G-2QVJLTXGYP"
};

firebase.initializeApp(firebaseConfig);

//reference to the databse service from firebase
export const database = firebase.database();
export const firestore = firebase.firestore();

export default firebase;
