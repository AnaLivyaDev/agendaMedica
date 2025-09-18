function formatarData(dataStr) {
  const partes = dataStr.split("-");
  if (partes.length === 3) {
    // Formato esperado: "YYYY-MM-DD"
    return `${partes[2]}/${partes[1]}/${partes[0]}`; // DD/MM/YYYY
  } else {
    return "Data inválida";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("consultas-containers");

  // Verifica se há paciente logado
  const pacienteLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  if (!pacienteLogado || !pacienteLogado.cpf) {
    container.innerHTML =
      "<p>Você precisa estar logado para ver suas consultas.</p>";
    return;
  }

  // Recupera os agendamentos do localStorage
  const todosAgendamentos =
    JSON.parse(localStorage.getItem("agendamentosPaciente")) || [];

  // Filtra os agendamentos para esse paciente
  const agendamentosDoPaciente = todosAgendamentos.filter(
    (agendamento) => agendamento.cpfPaciente === pacienteLogado.cpf
  );

  // Se não houver consultas
  if (agendamentosDoPaciente.length === 0) {
    container.innerHTML = "<p>Você ainda não marcou nenhuma consulta.</p>";
    return;
  }

  // Renderiza cards
  agendamentosDoPaciente.forEach((consulta) => {
    const card = document.createElement("div");
    card.classList.add("card-consulta");
    console.log(consulta.data)
    card.innerHTML = `
            <h2>Dr(a). ${consulta.medico}</h2>
            <p><strong>Especialidade:</strong> ${consulta.especialidade.toUpperCase()}</p>
            <p><strong>Horário:</strong> ${consulta.horario}</p>
            <p><strong>Data:</strong> ${consulta.data ? consulta.data : 'Data não informada'}</p>
            <p><strong>Paciente:</strong> ${consulta.paciente}</p>
        `;

    container.appendChild(card);
  });
});
