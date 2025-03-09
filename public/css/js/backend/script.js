import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebaseConfig';

async function getHorariosDisponiveis(data) {
  const agendamentosRef = collection(db, 'agendamentos');
  const q = query(agendamentosRef, where('data', '==', data));

  const querySnapshot = await getDocs(q);
  let horariosDisponiveis = [];

  querySnapshot.forEach((doc) => {
    const horarios = doc.data().horarios;
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
