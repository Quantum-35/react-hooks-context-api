import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";


var firebaseConfig = {

};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

