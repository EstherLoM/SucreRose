// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwo-AF4_UhmCPK5BQNtsooaXiLWrFBxFc",
  authDomain: "fir-javascript-crud-69655.firebaseapp.com",
  projectId: "fir-javascript-crud-69655",
  storageBucket: "fir-javascript-crud-69655.appspot.com",
  messagingSenderId: "350266284833",
  appId: "1:350266284833:web:f851cc2b3b9ed8b3607c60"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore();

/**
 * Save a New Task in Firestore
 * @param {string} title the title of the Task
 * @param {string} description the description of the Task
 */
export const saveTask = (title,dificultad,porciones,tiempo,ingredientes, description) =>
  addDoc(collection(db, "tasks"), { title,dificultad,porciones,tiempo,ingredientes, description });

export const onGetTasks = (callback) =>
  onSnapshot(collection(db, "tasks"), callback);

/**
 *
 * @param {string} id Task ID
 */
export const deleteTask = (id) => deleteDoc(doc(db, "tasks", id));

export const getTask = (id) => getDoc(doc(db, "tasks", id));

export const updateTask = (id, newFields) =>
  updateDoc(doc(db, "tasks", id), newFields);

export const getTasks = () => getDocs(collection(db, "tasks"));
