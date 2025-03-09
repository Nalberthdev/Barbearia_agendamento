import { db } from "./firebase.js";
import { collection, addDoc } from "firebase/firestore";

// Teste de conexão com Firestore
async function adicionarTeste() {
    try {
        const docRef = await addDoc(collection(db, "agendamentos"), {
            cliente: "Teste Cliente",
            data: "2025-03-10",
            hora: "14:00"
        });
        console.log("Agendamento adicionado com ID:", docRef.id);
    } catch (e) {
        console.error("Erro ao adicionar agendamento:", e);
    }
}

// Chamar a função de teste
adicionarTeste();
