document.addEventListener("DOMContentLoaded", function () {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    console.log("Usuário logado:", usuarioLogado);

    if (!usuarioLogado || !usuarioLogado.cpf) {
        alert("Você precisa estar logado para ver seu perfil.");
        window.location.href = "../pages/loginPaciente.html";
        return;
    }

    document.getElementById("perfil-nome").textContent = usuarioLogado.nome;
    document.getElementById("perfil-cpf").textContent = usuarioLogado.cpf;
    document.getElementById("perfil-email").textContent = usuarioLogado.email;
    document.getElementById("perfil-senha").textContent = usuarioLogado.senha;
});