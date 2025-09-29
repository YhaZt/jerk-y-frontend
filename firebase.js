// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcuz6oPQ1R0XZKdMU6-0CG1dO-Cn6Vz4s",
  authDomain: "jerk-y.firebaseapp.com",
  projectId: "jerk-y",
  storageBucket: "jerk-y.firebasestorage.app",
  messagingSenderId: "822502289687",
  appId: "1:822502289687:web:cf07dc4f7c5fb4bf82c752",
  measurementId: "G-5SEJ9SVVD3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);