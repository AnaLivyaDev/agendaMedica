document.addEventListener("DOMContentLoaded", function () {
    const medicoLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    if (!medicoLogado || !medicoLogado.email) {
        alert("Você precisa estar logado como médico para ver este relatório.");
        window.location.href = "../../pages/loginMedico.html";
        return;
    }

    const agendamentos = JSON.parse(localStorage.getItem("agendamentosPaciente")) || [];

    // Filtrar agendamentos do médico logado
    const consultasDoMedico = agendamentos.filter(
        consulta => consulta.email === medicoLogado.email
    );

    const relatorioContainer = document.getElementById("relatorio-consultas");

    if (consultasDoMedico.length === 0) {
        relatorioContainer.innerHTML = "<p>Você não possui consultas agendadas ainda.</p>";
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
            <hr>
        `;
        relatorioContainer.appendChild(card);
    });
});
