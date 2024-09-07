import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyCiffuqVXr8lQ_lzKsjto81IPy5NtIPbzg",
  authDomain: "teacherpage-36cea.firebaseapp.com",
  projectId: "teacherpage-36cea",
  storageBucket: "teacherpage-36cea.appspot.com",
  messagingSenderId: "1062792557874",
  appId: "1:1062792557874:web:48dc8fd4aa06977a20532b",
  measurementId: "G-1V2ZK6YSMS",
  databaseURL: "https://teacherpage-36cea-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
