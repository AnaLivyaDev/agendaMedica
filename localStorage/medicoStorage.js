// console.log('jfjjj')    
function salvarCadastro(event) {
    if (event) event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const crm = document.getElementById("crm").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;
    const horarioInput = document.getElementById("hora").value.trim();
    const horario = horarioInput.split(",").map(h => h.trim());
    let horariosArray = [];

    const especialidade = document.getElementById("especialidade").value;




    // Validação
    if (!nome || !crm || !email || !senha || !especialidade) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    // antes de salvar o objeto, adicionar horario ao array de horarios
    horariosArray.push(horario)

    // Criando objeto do médico
    const medico = {
        nome: nome,
        crm: crm,
        email: email,
        senha: senha,
        horario: horario,
        especialidade: especialidade
    };

    // Verificando se já existe um médico com esse email
    let medicos = JSON.parse(localStorage.getItem("medicos")) || [];

    const jaCadastrado = medicos.some(m => m.email === email);
    if (jaCadastrado) {
        alert("Este e-mail já está cadastrado.");
        return;
    }


    medicos.push(medico);
    localStorage.setItem("medicos", JSON.stringify(medicos));

    alert("Médico cadastrado com sucesso!");

    // Limpa os campos após cadastro
    document.querySelector("form").reset();

    window.location.href = '../pages/loginMedico.html'
}
