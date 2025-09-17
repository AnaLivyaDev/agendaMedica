let cpf = document.querySelector('#cpf')

// máscara do cpf
cpf.addEventListener('input', () => {
    let valor = cpf.value;

    // Remove tudo que não for número
    valor = valor.replace(/\D/g, '');

    // Aplicação da máscara
    if (valor.length > 3 && valor.length <= 6) {
        valor = valor.replace(/^(\d{3})(\d+)/, '$1.$2');
    } else if (valor.length > 6 && valor.length <= 9) {
        valor = valor.replace(/^(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
    } else if (valor.length > 9) {
        valor = valor.replace(/^(\d{3})(\d{3})(\d{3})(\d+)/, '$1.$2.$3-$4');
    }

    cpf.value = valor;
});


function logarPaciente(event) {
    event.preventDefault();

    const cpf = document.getElementById("cpf").value.trim();
    const senha = document.getElementById("senha").value.trim();

    const pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];

    const usuario = pacientes.find(p => p.cpf === cpf && p.senha === senha);

    // condição para logar usuário
    if (usuario) {
        // salva usuário
        localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

        alert(`Bem-vindo, ${usuario.nome}!`);
        window.location.href = "../pages/consultasPac.html"; //vai pra página após o login
    } else {
        alert("cpf ou senha incorretos.")
    }
}
