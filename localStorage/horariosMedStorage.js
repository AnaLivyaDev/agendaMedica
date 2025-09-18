document.addEventListener("DOMContentLoaded", () => {
  const btnAdicionar = document.getElementById("btnAdicionar");
  const btnSalvar = document.getElementById("btnSalvar");
  const listaHorarios = document.getElementById("listaHorarios");

  let horarios = [];

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
        horarios.splice(idx, 1);
        renderHorarios();
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

    // Formata a data para brasileiro antes de salvar
    const dataFormatada = new Date(dataInput).toLocaleDateString("pt-BR");

    horarios.push({ data: dataFormatada, hora });
    renderHorarios();

    document.getElementById("horaConsulta").value = "";
  });

  // Salva no localStorage dentro do médico logado
  btnSalvar.addEventListener("click", () => {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (!usuarioLogado) {
      alert("Nenhum médico logado.");
      return;
    }

    usuarioLogado.horarios = horarios;

    let medicos = JSON.parse(localStorage.getItem("medicos")) || [];
    medicos = medicos.map((m) =>
      m.crm === usuarioLogado.crm ? usuarioLogado : m
    );

    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));
    localStorage.setItem("medicos", JSON.stringify(medicos));

    alert("Horários salvos com sucesso!");
    horarios = [];
    renderHorarios();
  });
});
