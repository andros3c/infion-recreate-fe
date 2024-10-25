import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC-Oh25yvZV9VV2SotFGKrihGx4kOeiYnM",
  authDomain: "infion-recreate-fe-82a2b.firebaseapp.com",
  projectId: "infion-recreate-fe-82a2b",
  storageBucket: "infion-recreate-fe-82a2b.appspot.com",
  messagingSenderId: "810902107574",
  appId: "1:810902107574:web:56e00e990860e1c3f2bd17",
  measurementId: "G-MRT3Q0BNZF",
};

const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app);
