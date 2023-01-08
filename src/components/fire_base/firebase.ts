// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUKFiwkkBzNRsRznFFICN6tbKJBXGQQho",
  authDomain: "to-do-test-25ec7.firebaseapp.com",
  projectId: "to-do-test-25ec7",
  storageBucket: "to-do-test-25ec7.appspot.com",
  messagingSenderId: "963285176394",
  appId: "1:963285176394:web:0d42e1ac00665960eb16b3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export { db }
