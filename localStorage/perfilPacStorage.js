document.addEventListener("DOMContentLoaded", function () {
    // pega o usuário que está logado
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    // confere o usuário pelo console log
    console.log("Usuário logado:", usuarioLogado);

    if (!usuarioLogado || !usuarioLogado.cpf) {
        alert("Você precisa estar logado para ver seu perfil.");
        window.location.href = "../pages/loginPaciente.html";
        return;
    }
    // se passar pela verificação mostra as informações do perfil
    document.getElementById("perfil-nome").textContent = usuarioLogado.nome;
    document.getElementById("perfil-cpf").textContent = usuarioLogado.cpf;
    document.getElementById("perfil-email").textContent = usuarioLogado.email;
    document.getElementById("perfil-senha").textContent = usuarioLogado.senha;
});