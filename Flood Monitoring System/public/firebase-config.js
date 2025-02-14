// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDD4jvOspUMRN24rCa7LfzKiImXwmn2aBI",
  authDomain: "monitor-fea81.firebaseapp.com",
  databaseURL: "https://monitor-fea81-default-rtdb.firebaseio.com",
  projectId: "monitor-fea81",
  storageBucket: "monitor-fea81.appspot.com",
  messagingSenderId: "614750221339",
  appId: "1:614750221339:web:f91969562db3be6f3bb4be"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };
