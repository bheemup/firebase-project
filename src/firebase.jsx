import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"; 
const firebaseConfig = {
  apiKey: "AIzaSyCOW9LYaSbsQz4Vd62MAvffi_nsnORXuMs",
  authDomain: "fir-6bed8.firebaseapp.com",
  databaseURL: "https://fir-6bed8-default-rtdb.firebaseio.com",
  projectId: "fir-6bed8",
  storageBucket: "fir-6bed8.appspot.com",
  messagingSenderId: "510781870818",
  appId: "1:510781870818:web:6c68d36d8fd8dc2c2b04bb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth =getAuth();
export {app, auth};