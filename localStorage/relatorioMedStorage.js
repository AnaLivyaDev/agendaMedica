document.addEventListener("DOMContentLoaded", function () {
  const medicoLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

  if (!medicoLogado || !medicoLogado.email) {
    alert("Você precisa estar logado como médico para ver este relatório.");
    window.location.href = "../../pages/loginMedico.html";
    return;
  }

  let agendamentos =
    JSON.parse(localStorage.getItem("agendamentosPaciente")) || [];

  // Filtrar agendamentos do médico logado
  let consultasDoMedico = agendamentos.filter(
    (consulta) => consulta.email === medicoLogado.email
  );

  const relatorioContainer = document.getElementById("relatorio-consultas");

  function renderConsultas() {
    relatorioContainer.innerHTML = "";

    if (consultasDoMedico.length === 0) {
      relatorioContainer.innerHTML =
        "<p>Você não possui consultas agendadas ainda.</p>";
      return;
    }

    consultasDoMedico.forEach((consulta, index) => {
      const card = document.createElement("div");
      card.classList.add("card-consulta");
      card.innerHTML = `
        <p><strong>#${index + 1}</strong></p>
        <p><strong>Paciente:</strong> ${consulta.paciente}</p>
        <p><strong>CPF:</strong> ${consulta.cpfPaciente}</p>
        <p><strong>Horário:</strong> ${consulta.horario}</p>
        <p><strong>Especialidade:</strong> ${consulta.especialidade}</p>
        <button class="btn-desmarcar" data-index="${index}">Desmarcar</button>
        <hr>
      `;
      relatorioContainer.appendChild(card);
    });

    // Eventos para os botões de desmarcar
    document.querySelectorAll(".btn-desmarcar").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const idx = e.target.getAttribute("data-index");

        // Remove da lista de consultas do médico
        const consultaRemovida = consultasDoMedico[idx];
        consultasDoMedico.splice(idx, 1);

        // Atualiza também no localStorage
        agendamentos = agendamentos.filter(
          (c) =>
            !(
              c.email === consultaRemovida.email &&
              c.cpfPaciente === consultaRemovida.cpfPaciente &&
              c.horario === consultaRemovida.horario
            )
        );

        localStorage.setItem(
          "agendamentosPaciente",
          JSON.stringify(agendamentos)
        );

        renderConsultas();
      });
    });
  }

  renderConsultas();
});
