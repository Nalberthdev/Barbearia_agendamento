import { db } from './firebase.js'; // Importa o db do firebase.js
import { collection, getDocs, query, where } from 'firebase/firestore'; // Importa as funções do Firestore

async function getHorariosDisponiveis(data) {
  // Cria uma referência para a coleção 'agendamentos'
  const agendamentosRef = collection(db, 'agendamentos');

  // Cria uma consulta para buscar agendamentos na data especificada
  const q = query(agendamentosRef, where('data', '==', data));

  // Executa a consulta e obtém os documentos
  const querySnapshot = await getDocs(q);
  let horariosDisponiveis = [];

  // Itera sobre os documentos retornados
  querySnapshot.forEach((doc) => {
    const horarios = doc.data().horarios;

    // Filtra os horários disponíveis
    horarios.forEach((horario) => {
      if (horario.disponivel) {
        horariosDisponiveis.push(horario.hora);
      }
    });
  });

  return horariosDisponiveis;
}

// Exemplo de uso:
getHorariosDisponiveis('2025-03-10').then((horarios) => {
  console.log('Horários disponíveis:', horarios);
});