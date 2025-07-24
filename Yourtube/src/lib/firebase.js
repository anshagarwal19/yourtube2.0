// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDbz4-aRGlL-Fm0VktVnlAG_rRuuXWHJo",
  authDomain: "yourtube-d6192.firebaseapp.com",
  projectId: "yourtube-d6192",
  storageBucket: "yourtube-d6192.firebasestorage.app",
  messagingSenderId: "571494799393",
  appId: "1:571494799393:web:77aab440bbea6ec556eb60"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };