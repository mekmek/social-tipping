import firebase from 'firebase'

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyClby3on7h4LCprQCpHdUzfN4vLgoMkXGQ",
  authDomain: "social-tipping-app.firebaseapp.com",
  projectId: "social-tipping-app",
  storageBucket: "social-tipping-app.appspot.com",
  messagingSenderId: "528773370919",
  appId: "1:528773370919:web:84bda9ba9e50b6e7f8aa02"
};

export default () => {
  firebase.initializeApp(FIREBASE_CONFIG);
  return firebase;
}