// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoFcOeg0G-QKKDGpEz5loQMaeker1AIUA",
  authDomain: "blogsite-33dcd.firebaseapp.com",
  projectId: "blogsite-33dcd",
  storageBucket: "blogsite-33dcd.appspot.com",
  messagingSenderId: "807173861139",
  appId: "1:807173861139:web:2112b7be0191ee711434e6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)