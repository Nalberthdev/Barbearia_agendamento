import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBJn3coiv6Hk_0VfFAKrdMlPiuBOsdZe-k",
  authDomain: "agendamento-9d70d.firebaseapp.com",
  projectId: "agendamento-9d70d",
  storageBucket: "agendamento-9d70d.firebasestorage.app",
  messagingSenderId: "899715124150",
  appId: "1:899715124150:web:6209591d3d213895d80f17",
  measurementId: "G-V6HRSMJ4ZZ"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
