import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
 apiKey: "AIzaSyCCqe8Su7OvJDmXvH4XS9bttYistKyd59o",
  authDomain: "aquapeak-f1303.firebaseapp.com",
  projectId: "aquapeak-f1303",
  storageBucket: "aquapeak-f1303.firebasestorage.app",
  messagingSenderId: "652231935730",
  appId: "1:652231935730:web:11046472e0d3e53f10726b",
  measurementId: "G-SN3P5RKH6F"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;