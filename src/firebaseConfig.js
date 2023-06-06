import firebase from "firebase/compat/app"
import "firebase/compat/auth"

const config = {
  apiKey: "AIzaSyARPxtFBQ7zaDqTMZhzvrj0YWDSEFCFJFs",
  authDomain: "social-auth-d0f82.firebaseapp.com",
  projectId: "social-auth-d0f82",
  storageBucket: "social-auth-d0f82.appspot.com",
  messagingSenderId: "487801467809",
  appId: "1:487801467809:web:94ac8c2039a3f464f951e0",
  measurementId: "G-F2WF6YN41Q"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

if (!firebase.apps.length) {
    firebase.initializeApp(config)
}

export default firebase