// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, setDoc } from "firebase/firestore";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQhZ-oTWdgGIyn1BUWk_tdyz0kSgqhYxE",
  authDomain: "quiz-app-33e0f.firebaseapp.com",
  projectId: "quiz-app-33e0f",
  storageBucket: "quiz-app-33e0f.appspot.com",
  messagingSenderId: "617559243563",
  appId: "1:617559243563:web:81b5d0bf9c0b6ac078a36e",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Add quiz into firebase
const quizTableName = "quizes";
export const addNewQuiz = async (quiz) => {
  await addDoc(collection(db, quizTableName), quiz);
};

export const getAllQuiz = async () => {
  const allEntries = await getDocs(collection(db, quizTableName));
  return allEntries.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const getQuizDetails = async (quizId) => {
  const temp = await getDoc(doc(db, quizTableName, quizId));
  const quiz = await temp.data();
  return quiz;
};

export const editQuizDetails = async (quizId, quiz) => {
  await setDoc(doc(db, quizTableName, quizId), quiz);
};

export const deleteQuizDetails = async (quizId) => {
  await deleteDoc(doc(db, "quizes", quizId));
};
