import * as admin from 'firebase-admin';
import firebase, { initializeApp, auth, firestore } from "firebase";
import "firebase/auth";
import "firebase/firestore";

let adminAuth = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: ""
}, "auth");

let adminBloc = admin.initializeApp({
  credential: admin.credential.cert(serviceAccountBloc),
  databaseURL: ""
}, "bloc");

var configAuth = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
};
const firebaseAuth = initializeApp(configAuth, "auth");

var config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
};

const firebaseBloc = initializeApp(config, "bloc");

export default async function login(user, password, project) {
  return new Promise((resolve, reject) => {

    firebaseAuth.auth().signInWithEmailAndPassword(user, password)

    firebaseAuth.auth().onAuthStateChanged(async user => {

      if (user) {
        let token = await adminBloc.auth().createCustomToken(user.uid, { test: true });
        resolve(token);        
      }
    });

    firebaseBloc.auth().onAuthStateChanged(async user => {
      console.log('bloc:', user);
    });
  });
}