import {getFirestore} from "firebase/firestore";
import { initializeApp } from "firebase/app";



const firebaseConfig = {
    apiKey: "AIzaSyDb0wAvFSqnkwbSVD3KNNvdVzU98ASK3Pc",
    authDomain: "bdanimal-529de.firebaseapp.com",
    projectId: "bdanimal-529de",
    storageBucket: "bdanimal-529de.appspot.com",
    messagingSenderId: "858051643673",
    appId: "1:858051643673:web:eb821bc78395d1875e9d88"
  };
  


const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);