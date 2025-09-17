let nome = document.querySelector("#nome");
let labelNome = document.querySelector("#labelNome");

let crm = document.querySelector("#crm");
let labelCrm = document.querySelector("#labelCrm");

let email = document.querySelector("#email");
let labelEmail = document.querySelector("#labelEmail");

let senha = document.querySelector("#senha");
let labelSenha = document.querySelector("#labelSenha");

let especialidade = document.querySelector("#especialidade");
let labelEspecialidade = document.querySelector("#labelEspecialidade");

//assim que eu digitar no nome vai começar a função
nome.addEventListener("keyup", () => {
  let valorNome = nome.value.replace(/\s+/g, "");

  if (valorNome.length <= 2) {
    labelNome.style.color = "red";
    labelNome.innerHTML = "Nome *Insira no mínimo 3 caracteres";
    nome.style.borderColor = "red";
  } else {
    labelNome.style.color = "green";
    labelNome.innerHTML = "Nome";
    nome.style.borderColor = "green";
  }
});

//função que valida o CRM, no caso escrito até 7 caracteres
crm.addEventListener("keyup", () => {
  if (crm.value.length < 7) {
    labelCrm.style.color = "red";
    labelCrm.innerHTML = "CRM *Digite o seu CRM";
    crm.style.borderColor = "red";
  } else {
    labelCrm.style.color = "green";
    labelCrm.innerHTML = "CRM";
    crm.style.borderColor = "green";
  }
});

// função para validar o email
email.addEventListener("keyup", () => {
  let regexEmail = /^[^\s]+@[^\s]+\.com+$/;

  // Obtém o valor atual do campo de email e tira os espaços
  let valorEmail = email.value.replace(/\s+/g, "");

  // Verifica se o valor corresponde ao regex
  if (regexEmail.test(valorEmail)) {
    labelEmail.style.color = "green";
    email.style.borderColor = "green";
    labelEmail.innerHTML = "Email válido";
  } else {
    labelEmail.style.color = "red";
    email.style.borderColor = "red";
    labelEmail.innerHTML = "Email *seu email não é válido";
  }
});
