// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs, doc, getDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
export const addNewQuiz = async (quiz) => {
  await addDoc(collection(db, "quizes"), quiz);
};

export const getAllQuiz = async () => {
  const allEntries = await getDocs(collection(db, "quizes"));
  return allEntries.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const getQuizDetails = async (quizId) => {
  const temp = await getDoc(doc(db, "quizes", quizId));
  const quiz = await temp.data();
  return quiz;
};
