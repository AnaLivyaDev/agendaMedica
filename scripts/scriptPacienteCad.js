let nome = document.querySelector('#nome')
let labelNome = document.querySelector('#labelNome')

let cpf = document.querySelector('#cpf')
let labelCpf = document.querySelector('#labelCpf')

let email = document.querySelector('#email')
let labelEmail = document.querySelector('#labelEmail')

let senha = document.querySelector('#senha')
let labelSenha = document.querySelector('#labelSenha')



// assim que começar a digitar a função acontece
nome.addEventListener('keyup', () => {
    let valorNome = nome.value.replace(/\s+/g, '');

    if (valorNome.length <= 2) {
        labelNome.style.color = 'red'
        labelNome.innerHTML = 'Nome *Insira no mínimo 3 caracteres'
        nome.style.borderColor = 'red'
    } else {
        labelNome.style.color = 'green'
        labelNome.innerHTML = 'Nome'
        nome.style.borderColor = 'green'
    }
})


// Máscara para CPF
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
})

// validação do email
email.addEventListener('keyup', () => {
    let regexEmail = /^[^\s]+@[^\s]+\.com+$/;

    // Obtém o valor atual do campo de email
    let valorEmail = email.value.replace(/\s+/g, '');

    // Verifica se o valor corresponde ao regex
    if (regexEmail.test(valorEmail)) {
        labelEmail.style.color = 'green';
        email.style.borderColor = 'green';
        labelEmail.innerHTML = 'Email válido';
    } else {
        labelEmail.style.color = 'red';
        email.style.borderColor = 'red';
        labelEmail.innerHTML = 'Email *seu email não é válido';
    }
});

// a senha tem que ter no minimo 4 caracteres
senha.addEventListener('keyup', () => {
    if (senha.value.length < 4) {
        labelSenha.style.color = 'red'
        labelSenha.innerHTML = 'Senha *no mínimo 4 caracteres'
        senha.style.borderColor = 'red'
    } else {
        labelSenha.style.color = 'green'
        labelSenha.innerHTML = 'Senha válida'
        senha.style.borderColor = 'green'
    }
})

