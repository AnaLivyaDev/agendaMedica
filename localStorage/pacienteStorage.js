function salvarCadastroPaciente(event) {
    if (event) event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const cpf = document.getElementById('cpf').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();

    // validação
    if (!nome || !cpf || !email || !senha) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    // criando objeto do paciente
    const paciente = {
        nome: nome,
        cpf: cpf,
        email: email,
        senha: senha
    }

    localStorage.setItem("paciente", JSON.stringify(paciente))

    // verificando se já existe paciente com esse cpf
    let pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];

    const jaCadastrado = pacientes.some(m => m.cpf === cpf);
    if (jaCadastrado) {
        alert("Este cpf já está cadastrado.");
        return;
    }

    pacientes.push(paciente);
    localStorage.setItem("pacientes", JSON.stringify(pacientes));
    alert("Paciente cadastrado em nosso sistema com sucesso!");

    // limpando os campos após cadastro
    document.querySelector("form").reset();

    // vai para a página de login assim que cadastrar
    window.location.href = '../pages/loginPaciente.html'
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
