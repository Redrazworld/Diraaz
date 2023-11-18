// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbAnKAn0lhX6U3YdUJtgAycOSkF8YlL5E",
  authDomain: "kloth-ffea7.firebaseapp.com",
  projectId: "kloth-ffea7",
  storageBucket: "kloth-ffea7.appspot.com",
  messagingSenderId: "715679516240",
  appId: "1:715679516240:web:f18d8f28356848117c7355"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
 export const storage =getStorage(app);