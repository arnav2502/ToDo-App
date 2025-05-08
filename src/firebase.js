import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Replace with your Firebase project config:
const firebaseConfig = {
  apiKey: "AIzaSyAoYCAzDw-LK4u9eaGdnsqMxM0lUe7Og_g",
  authDomain: "taskmaster-bktzr.firebaseapp.co",
  projectId: "taskmaster-bktzr",
  appId: "1:368015787172:web:7dcbc4682d4bc780829231",
  // ...other config
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);