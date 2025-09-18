const medicos = JSON.parse(localStorage.getItem("medicos")) || [];
const paciente = JSON.parse(localStorage.getItem("paciente")) || [];

// Carrega especialidades únicas
const especialidadesUnicas = [...new Set(medicos.map((m) => m.especialidade))];

const selectEspecialidade = document.getElementById("especialidade");
especialidadesUnicas.forEach((especialidade) => {
  const option = document.createElement("option");
  option.value = especialidade;
  option.textContent = especialidade;
  selectEspecialidade.appendChild(option);
});

function carregarMedico() {
  const especialidadeSelecionada =
    document.getElementById("especialidade").value;
  const selectMedico = document.getElementById("medicos");
  selectMedico.innerHTML = '<option value="">-- Selecione --</option>';

  const medicosFiltrados = medicos.filter(
    (m) => m.especialidade === especialidadeSelecionada
  );

  medicosFiltrados.forEach((medico) => {
    const option = document.createElement("option");
    option.value = medico.email;
    option.textContent = medico.nome;
    selectMedico.appendChild(option);
  });

  document.getElementById("Horas").innerHTML =
    '<option value="">-- Selecione um médico primeiro --</option>';
}

function carregarHorario() {
  const emailMedico = document.getElementById("medicos").value;
  const selectHorario = document.getElementById("horas");
  selectHorario.innerHTML = '<option value="">-- Selecione --</option>';

  const medicos = JSON.parse(localStorage.getItem("medicos")) || [];
  const agendamentos =
    JSON.parse(localStorage.getItem("agendamentosPaciente")) || [];

  const medico = medicos.find((m) => m.email === emailMedico);

  if (medico && Array.isArray(medico.horarios)) {
    // Pega horários ocupados (formato "data - hora")
    const horariosOcupados = agendamentos
      .filter((a) => a.email === emailMedico)
      .map((a) => `${a.data} - ${a.horario}`);

    // Filtra os horários livres
    const horariosDisponiveis = medico.horarios.filter((h) => {
      const chave = `${h.data} - ${h.hora}`;
      return !horariosOcupados.includes(chave);
    });

    // Exibe os horários disponíveis
    horariosDisponiveis.forEach((h) => {
      const option = document.createElement("option");
      option.value = `${h.data} - ${h.hora}`;
      option.textContent = `${h.data} - ${h.hora}`;
      selectHorario.appendChild(option);
    });

    if (horariosDisponiveis.length === 0) {
      const option = document.createElement("option");
      option.textContent = "Nenhum horário disponível";
      option.disabled = true;
      selectHorario.appendChild(option);
    }
  }
}
function salvarAgendamento(event) {
  event.preventDefault();

  const especialidade = document.getElementById("especialidade").value;
  const emailMedico = document.getElementById("medicos").value;
  const horarioSelecionado = document.getElementById("horas").value;

  if (!especialidade || !emailMedico || !horarioSelecionado) {
    alert("Preencha todos os campos.");
    return;
  }

  const [data, hora] = horarioSelecionado.split(" - ");

  const medicos = JSON.parse(localStorage.getItem("medicos")) || [];
  const paciente = JSON.parse(localStorage.getItem("usuarioLogado"));

  if (!paciente || !paciente.nome) {
    alert("Erro: paciente não logado");
    return;
  }

  const medico = medicos.find((m) => m.email === emailMedico);

  if (!medico) {
    alert("Erro: médico não encontrado");
    return;
  }

  // Salva o agendamento no localStorage
  const agendamento = {
    paciente: paciente.nome,
    cpfPaciente: paciente.cpf,
    medico: medico.nome,
    email: medico.email,
    especialidade: medico.especialidade,
    data: data,
    horario: hora,
  };

  const agendamentos =
    JSON.parse(localStorage.getItem("agendamentosPaciente")) || [];
  agendamentos.push(agendamento);
  localStorage.setItem("agendamentosPaciente", JSON.stringify(agendamentos));
  // --- Envio do email ---
  emailjs
    .send("service_y6a6o9w", "template_hw1qurq", {
      to_name: medico.nome,
      from_name: paciente.nome,
      especialidade: medico.especialidade,
      data: data,
      hora: hora,
    })
    .then(
      (response) => {
        console.log(
          "Email enviado com sucesso!",
          response.status,
          response.text
        );
        alert("Consulta agendada e e-mail enviado com sucesso!");
        document.getElementById("Formulario").reset();
        window.location.href = "consultasPac.html";
      },
      (error) => {
        console.error("Erro ao enviar email:", error);
        alert(
          "Consulta agendada, mas houve um problema ao enviar o e-mail ao médico."
        );
      }
    );
}
