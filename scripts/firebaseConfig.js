import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
  addDoc,
  getDocs, // Adicione esta importação
  query, // Adicione esta importação
  where,
  orderBy,
  startAt,
  endAt,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCELZUB4BzaezA4rZiYMERuQ6DF40ULL_A",
  authDomain: "ledwoki.firebaseapp.com",
  databaseURL: "https://ledwoki-default-rtdb.firebaseio.com",
  projectId: "ledwoki",
  storageBucket: "ledwoki.firebasestorage.app",
  messagingSenderId: "272504469517",
  appId: "1:272504469517:web:f2091f23bf7c564cbdbd44",
  measurementId: "G-S8GBZ6SDZ1",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
  db,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
  query,
  where,
  orderBy,
  startAt,
  endAt,
};
