document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("consultas-container");

    // Pega o paciente atualmente logado
    const pacienteLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    if (!pacienteLogado || !pacienteLogado.cpf) {
        container.innerHTML = "<p>Paciente não logado.</p>";
        return;
    }

    // Pega todos os agendamentos salvos
    const todosAgendamentos = JSON.parse(localStorage.getItem("agendamentosPaciente")) || [];

    // Filtra os agendamentos só desse paciente (pelo CPF)
    const agendamentosDoPaciente = todosAgendamentos.filter(
        agendamento => agendamento.cpfPaciente === pacienteLogado.cpf
    );

    // Se não tiver nenhum agendamento, mostra mensagem
    if (agendamentosDoPaciente.length === 0) {
        container.innerHTML = "<p>Você ainda não marcou nenhuma consulta.</p>";
        return;
    }

    // Para cada agendamento, cria um card
    agendamentosDoPaciente.forEach((consulta) => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
      <h2>${consulta.medico}</h2>
      <p><strong>Especialidade:</strong> ${consulta.especialidade}</p>
      <p><strong>Horário:</strong> ${consulta.horario}</p>
      <p><strong>Paciente:</strong> ${consulta.paciente}</p>
    `;

        container.appendChild(card);
    });
});
