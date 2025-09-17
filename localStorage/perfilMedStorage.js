document.addEventListener("DOMContentLoaded", () => {
  // Pega o médico logado
  const medicoLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

  if (!medicoLogado) {
    alert("Você precisa estar logado para acessar o perfil.");
    window.location.href = "../../pages/loginMedico.html"; // volta para login se não estiver logado
    return;
  }

  // Preenche os campos do perfil
  document.getElementById("perfil-nome").textContent = medicoLogado.nome || "";
  document.getElementById("perfil-cpf").textContent =
    medicoLogado.cpf || "Não cadastrado";
  document.getElementById("perfil-email").textContent =
    medicoLogado.email || "";
  document.getElementById("perfil-senha").textContent =
    medicoLogado.senha || "";
});
