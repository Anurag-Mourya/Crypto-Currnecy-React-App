
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBzCa8PQRwajWgUzw3JgH3LXb3unegoiSc",
  authDomain: "crypto-currency-react-app.firebaseapp.com",
  projectId: "crypto-currency-react-app",
  storageBucket: "crypto-currency-react-app.appspot.com",
  messagingSenderId: "518408378391",
  appId: "1:518408378391:web:9c7d4657b4ff7f87e4e452",
  url: 'https://practice-of-firebase-1f930-default-rtdb.firebaseio.com/',
};


export const app = initializeApp(firebaseConfig); 