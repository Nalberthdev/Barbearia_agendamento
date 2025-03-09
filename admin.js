import { db } from './firebase.js';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

// Função para salvar horários no Firestore
async function salvarHorarios(data, horarios) {
  try {
    // Converte a string de horários em um array de objetos
    const horariosArray = horarios.split(',').map(hora => ({
      hora: hora.trim(),
      disponivel: true,
    }));

    // Cria um documento na coleção 'agendamentos'
    const docRef = await addDoc(collection(db, 'agendamentos'), {
      data: data,
      horarios: horariosArray,
    });

    console.log("Horários salvos com ID:", docRef.id);
    alert("Horários salvos com sucesso!");
  } catch (error) {
    console.error("Erro ao salvar horários:", error);
    alert("Erro ao salvar horários. Tente novamente.");
  }
}

// Função para carregar horários já salvos
async function carregarHorarios(data) {
  const agendamentosRef = collection(db, 'agendamentos');
  const q = query(agendamentosRef, where('data', '==', data));

  const querySnapshot = await getDocs(q);
  let horariosSalvos = [];

  querySnapshot.forEach((doc) => {
    const horarios = doc.data().horarios;
    horariosSalvos = horarios.map(horario => horario.hora).join(', ');
  });

  return horariosSalvos;
}

// Evento de envio do formulário
document.getElementById('horarios-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = document.getElementById('data').value;
  const horarios = document.getElementById('horarios').value;

  if (!data || !horarios) {
    alert("Preencha todos os campos!");
    return;
  }

  await salvarHorarios(data, horarios);
});

// Carrega horários ao selecionar uma data
document.getElementById('data').addEventListener('change', async (e) => {
  const data = e.target.value;
  const horariosSalvos = await carregarHorarios(data);

  if (horariosSalvos) {
    document.getElementById('horarios').value = horariosSalvos;
  } else {
    document.getElementById('horarios').value = '';
  }
});