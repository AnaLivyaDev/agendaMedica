document.addEventListener("DOMContentLoaded", () => {
  const btnAdicionar = document.getElementById("btnAdicionar");
  const listaHorarios = document.getElementById("listaHorarios");

  let horarios = [];

  // Recupera horários salvos do médico logado, se houver
  const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
  if (usuarioLogado && Array.isArray(usuarioLogado.horarios)) {
    horarios = usuarioLogado.horarios;
    renderHorarios(); // Mostra os horários salvos ao carregar a página
  }

  // Função para salvar os horários no localStorage automaticamente
  function salvarHorariosNoLocalStorage() {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (!usuarioLogado) return;

    usuarioLogado.horarios = horarios;

    let medicos = JSON.parse(localStorage.getItem("medicos")) || [];
    medicos = medicos.map((m) =>
      m.crm === usuarioLogado.crm ? usuarioLogado : m
    );

    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));
    localStorage.setItem("medicos", JSON.stringify(medicos));
  }

  // Função para renderizar a lista
  function renderHorarios() {
    listaHorarios.innerHTML = "";
    horarios.forEach((h, index) => {
      const div = document.createElement("div");
      div.classList.add("horario-card");
      div.innerHTML = `
        <span>${h.data} - ${h.hora}</span>
        <button class="btn-apagar" data-index="${index}">X</button>
      `;
      listaHorarios.appendChild(div);
    });

    // Eventos dos botões de apagar
    document.querySelectorAll(".btn-apagar").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const idx = e.target.getAttribute("data-index");

        const confirmDelete = confirm("Tem certeza que deseja excluir este horário?");
        if (!confirmDelete) return;

        horarios.splice(idx, 1);
        renderHorarios();
        salvarHorariosNoLocalStorage(); // Salva após excluir
      });
    });
  }

  // Adiciona horário ao card
  btnAdicionar.addEventListener("click", () => {
    const dataInput = document.getElementById("dataConsulta").value;
    const hora = document.getElementById("horaConsulta").value;

    if (!dataInput || !hora) {
      alert("Escolha uma data e um horário.");
      return;
    }

    const agora = new Date();
    const dataHoraEscolhida = new Date(`${dataInput}T${hora}`);

    if (dataHoraEscolhida < agora) {
      alert("Não é permitido cadastrar datas ou horários que já passaram.");
      return;
    }

    // Formata a data para o padrão brasileiro
    const dataFormatada = new Date(dataInput).toLocaleDateString("pt-BR");

    // Verifica se já existe essa data e hora
    const horarioExistente = horarios.some(
      (h) => h.data === dataFormatada && h.hora === hora
    );

    if (horarioExistente) {
      alert("Esse horário já foi adicionado.");
      return;
    }

    horarios.push({ data: dataFormatada, hora });
    renderHorarios();
    salvarHorariosNoLocalStorage(); // Salva automaticamente após adicionar

    // Limpa o campo de hora
    document.getElementById("horaConsulta").value = "";
  });

});
