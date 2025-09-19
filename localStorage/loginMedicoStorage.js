function logarMedico(event) {
    event.preventDefault();

    const crm = document.getElementById("crm").value.trim();
    const senha = document.getElementById("senha").value.trim();

    const medicos = JSON.parse(localStorage.getItem("medicos")) || [];

    const usuario = medicos.find(p => p.crm === crm && p.senha === senha);

    if (usuario) {
        // Salva usuário logado
        localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

        alert(`Bem-vindo, ${usuario.nome}!`);
        window.location.href = "../pages/pages-medico/relatorioMed.html"; // vai pra página ir após login
    } else {
        alert("crm ou senha incorretos.");
    }
}

// função que vai alternar a senha de acordo com o olho
function alternarSenha() {
    const senhaInput = document.getElementById("senha");
    const toggleSenha = document.getElementById("toggleSenha");

    const senhaEscondida = senhaInput.type === "text";

    senhaInput.type = senhaEscondida ? "password" : "text";

    toggleSenha.src = senhaEscondida
        ? "../imagens/olhoAberto.png"
        : "../imagens/olhoFechado.png";
}
