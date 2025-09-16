const medicos = JSON.parse(localStorage.getItem("medicos")) || [];
const paciente = JSON.parse(localStorage.getItem("paciente")) || [];



// Carrega especialidades únicas
const especialidadesUnicas = [...new Set(medicos.map(m => m.especialidade))];

const selectEspecialidade = document.getElementById("especialidade");
especialidadesUnicas.forEach(especialidade => {
    const option = document.createElement("option");
    option.value = especialidade;
    option.textContent = especialidade;
    selectEspecialidade.appendChild(option);
});

function carregarMedico() {
    const especialidadeSelecionada = document.getElementById("especialidade").value;
    const selectMedico = document.getElementById("medicos");
    selectMedico.innerHTML = '<option value="">-- Selecione --</option>';

    const medicosFiltrados = medicos.filter(m => m.especialidade === especialidadeSelecionada);

    medicosFiltrados.forEach(medico => {
        const option = document.createElement("option");
        option.value = medico.email;
        option.textContent = medico.nome;
        selectMedico.appendChild(option);
    });

    document.getElementById("Horas").innerHTML = '<option value="">-- Selecione um médico primeiro --</option>';
}

function carregarHorario() {
    const emailMedico = document.getElementById("medicos").value;
    const selectHorario = document.getElementById("horas");
    selectHorario.innerHTML = '<option value="">-- Selecione --</option>';

    const medico = medicos.find(m => m.email === emailMedico);
    if (medico && medico.horario && Array.isArray(medico.horario)) {
        medico.horario.forEach(horario => {
            const option = document.createElement("option");
            option.value = horario;
            option.textContent = horario;
            selectHorario.appendChild(option);
        });
    }

}

function salvarAgendamento(event) {
    event.preventDefault(); // impedir reload do form

    const especialidade = document.getElementById("especialidade").value;
    const emailMedico = document.getElementById("medicos").value;
    const horario = document.getElementById("horas").value;

    if (!especialidade || !emailMedico || !horario) {
        alert("Preencha todos os campos.");
        return;
    }

    const medico = medicos.find(m => m.email === emailMedico);
    const paciente = JSON.parse(localStorage.getItem("usuarioLogado"))

    if (!paciente || !paciente.nome) {
        alert("Erro: paciente não logado");
        return;
    }


    const agendamento = {
        paciente: paciente.nome,
        cpfPaciente: paciente.cpf,
        medico: medico.nome,
        email: medico.email,
        especialidade: medico.especialidade,
        horario: horario
    };


    // Recupera agendamentos anteriores (caso queira salvar vários)
    const agendamentos = JSON.parse(localStorage.getItem("agendamentosPaciente")) || [];

    agendamentos.push(agendamento);

    localStorage.setItem("agendamentosPaciente", JSON.stringify(agendamentos));

    alert("Consulta agendada com sucesso!");

    document.getElementById("especialidade").value = "";
    document.getElementById("medicos").innerHTML = '<option value="">-- Selecione --</option>';
    document.getElementById("horas").innerHTML = '<option value="">-- Selecione um médico primeiro --</option>';
}
