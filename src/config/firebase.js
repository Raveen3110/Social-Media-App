import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import "firebase/compat/storage"


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBEn4E55osTXYzDOcUVZvjf5Nn2xHLoT0o",
    authDomain: "social-media-app-77ad8.firebaseapp.com",
    projectId: "social-media-app-77ad8",
    storageBucket: "social-media-app-77ad8.appspot.com",
    messagingSenderId: "1049329716911",
    appId: "1:1049329716911:web:5de1f26a2b0ddc2fd54e5a",
    measurementId: "G-2FGZJCC89H"
  };

  firebase.initializeApp(firebaseConfig)
 
  export const auth = firebase.auth()
  export const db = firebase.firestore()
  export const storage = firebase.storage()


  export default firebase