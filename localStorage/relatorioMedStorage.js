document.addEventListener("DOMContentLoaded", function () {
  const medicoLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

  if (!medicoLogado || !medicoLogado.email) {
    alert("Você precisa estar logado como médico para ver este relatório.");
    window.location.href = "../../pages/loginMedico.html";
    return;
  }

  let agendamentos =
    JSON.parse(localStorage.getItem("agendamentosPaciente")) || [];

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
        <p><strong>Especialidade:</strong> ${consulta.especialidade.toUpperCase()}</p>
        <p><strong>Data:</strong> ${consulta.data}</p>
        <p><strong>Horário:</strong> ${consulta.horario}</p>
        
        <button class="btn-desmarcar" data-index="${index}">Desmarcar</button>
        <button class="btn-realizada" data-index="${index}">Consulta Realizada</button>
        <hr>
      `;

      relatorioContainer.appendChild(card);
    });

    // Botão DESMARCAR
    document.querySelectorAll(".btn-desmarcar").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const idx = e.target.getAttribute("data-index");

        const confirmar = confirm("Tem certeza que deseja desmarcar esta consulta?");
        if (!confirmar) return;

        const consultaRemovida = consultasDoMedico[idx];
        consultasDoMedico.splice(idx, 1);

        agendamentos = agendamentos.filter(
          (c) =>
            !(
              c.email === consultaRemovida.email &&
              c.cpfPaciente === consultaRemovida.cpfPaciente &&
              c.horario === consultaRemovida.horario &&
              c.data === consultaRemovida.data
            )
        );



        localStorage.setItem("agendamentosPaciente", JSON.stringify(agendamentos));
        renderConsultas();
      });
    });

    // Botão CONSULTA REALIZADA
    document.querySelectorAll(".btn-realizada").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const idx = e.target.getAttribute("data-index");

        const confirmar = confirm("Marcar esta consulta como realizada?");
        if (!confirmar) return;

        const consultaConcluida = consultasDoMedico[idx];
        consultasDoMedico.splice(idx, 1);

        agendamentos = agendamentos.filter(
          (c) =>
            !(
              c.email === consultaConcluida.email &&
              c.cpfPaciente === consultaConcluida.cpfPaciente &&
              c.horario === consultaConcluida.horario &&
              c.data === consultaConcluida.data
            )
        );

        // (Opcional) salvar em "historicoConsultas"
        let historico = JSON.parse(localStorage.getItem("historicoConsultas")) || [];
        historico.push(consultaConcluida);
        localStorage.setItem("historicoConsultas", JSON.stringify(historico));

        localStorage.setItem("agendamentosPaciente", JSON.stringify(agendamentos));
        renderConsultas();
      });
    });
  }

  renderConsultas();
});
