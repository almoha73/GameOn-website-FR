"use strict";

//Apparition de la navbar type rideau
const mainNavbar = document.querySelector(".main-navbar");
const toggleButton = document.querySelector("#nav-icon");

toggleButton.addEventListener("click", () => {
  mainNavbar.classList.toggle("appear");
});

// DOM Elements
const modalbg = document.querySelector(".bground");
const modal = document.querySelector(".modal-body");
const modalBtn = document.querySelectorAll(".modal-btn");
const btnSubmit = document.querySelector(".btn-submit");
const form = document.querySelector("form");
const closeModal = document.querySelector(".close");
const prenom = document.querySelector("#first");
const prenomHelp = document.querySelector(".prenomHelp");
const nom = document.querySelector("#last");
const nomHelp = document.querySelector(".nomHelp");
const mail = document.querySelector("#email");
const mailHelp = document.querySelector(".mailHelp");
const birth = document.querySelector("#birthdate");
const birthHelp = document.querySelector(".birthHelp");
const radio = document.querySelectorAll(".checkbox-input");
const radioHelp = document.querySelector(".radioHelp");
const quantity = document.querySelector("#quantity");
const quantityHelp = document.querySelector(".quantityHelp");
let inputField = document.querySelectorAll("input.text-control");
let help = document.querySelectorAll(".help");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

function launchModal() {
  modalbg.style.display = "block";
  prenomHelp.innerHTML = `Veuillez renseigner votre prénom`;
  prenomHelp.style.color = "white";
  focusBlur();
  closeForm();
}

//  Close modal formulaire avec la croix
function closeForm() {
  closeModal.addEventListener("click", () => {
    closeModal.style.display = "none";
    setTimeout(() => {
      location.reload();
    }, 1000);
  });
}

// Focus et Blur des 5 premiers input
function focusBlur() {
  for (let i = 0; i < inputField.length; i++) {
    inputField[i].addEventListener("focus", addColor);
    inputField[i].addEventListener("blur", removeColor);

    function addColor() {
      inputField[i].style.border = "3px solid blue";
    }

    function removeColor() {
      inputField[i].style.border = "";
    }
  }
}

// fonction changement d'apparence du formumaire après validation
function formChange() {
  //close modal après validation
  const btnSubmit = document.querySelector(".btn-submit");
  const modalbg2 = document.querySelector(".bground-2");

  btnSubmit.addEventListener("click", () => {
    modalbg.style.display = "none";
    modalbg2.style.display = "block";
  });
  const btnCloseModal = document.querySelector(".btn-closeModal");
  btnCloseModal.addEventListener("click", () => {
    modalbg.style.display = "none";
    modalbg2.style.display = "none";
    setTimeout(() => {
      location.reload();
    }, 1000);
  });
}

function messageOK(nodeElt, message) {
  nodeElt.innerHTML = message;
  nodeElt.style.color = '#70e000';
}
function error(nodeElt, message){
  nodeElt.innerHTML = message;
  nodeElt.style.color = "#fe142f";
  nodeElt.style.border = "2px solid transparent";
}

// Validations du prenom

  function validePrenom() {
    if (prenom.value === "") {
      error(prenomHelp, `Veuillez renseigner votre prénom`)
      return false;
    } else if (/^[a-zA-Zéè ]+$/.test(prenom.value) && prenom.value.length >= 2) {
      messageOK(prenomHelp, `Prénom valide`)
      nom.focus();
      prenom.style.border = "2px solid #16d12f";
      return true;
    } else {
      error(prenomHelp, `Le prénom doit contenir 2 lettres minmum`)
      return false;
    }
  }

  // Validation du nom

function valideNom() {
  if (nom.value === "") {
    error(nomHelp, `Veuillez renseigner votre nom`)
    return false;
  } else if (/^[a-zA-Zéè ]+$/.test(nom.value) && nom.value.length >= 2) {
    messageOK(nomHelp, `Nom valide`)
    mail.focus();
    nom.style.border = "2px solid #16d12f";
    return true;
  } else {
    error(nomHelp, `Le nom ne doit contenir que des lettres et avoir 2 caractères minimum`)
    return false;
  }
}

// Validation du mail

function valideMail() {
  if (mail.value === "") {
    error(mailHelp, `Le mail est obligatoire`)
    return false;
  } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail.value)) {
    messageOK(mailHelp, `Mail valide`)
    birth.focus();
    mail.style.border = "2px solid #16d12f";
    return true;
  } else {
    error(mailHelp, `Mail invalide`)
    return false;
  }
}

// Validation de la date de naissance

function valideBirth() {
  const birthday = new Date(birth.value);
  const todayTime = new Date(); //date du jour
  const dateMin = new Date(1920, 0, 1);
  const ageMax = new Date(todayTime - 378432e6); 

  birthHelp.innerHtml = "champ obligatoire";

  if (birthday > todayTime || birthday >= ageMax || birthday <= dateMin) {
    error(birthHelp, `Date de naissance invalide`)
    return false;
  } else if (
    birthday < todayTime &&
    birthday <= ageMax &&
    birthday >= dateMin
  ) {
    messageOK(birthHelp, "Date de naissance valide");
    quantity.focus();
    birth.style.border = "2px solid #16d12f";
    return true;
  }
}

function valideQuantity() {
  if (quantity.value === "") {
    error(quantityHelp, `Champ obligatoire`);
  } else {
    messageOK(quantityHelp, "Champ valide")
    quantity.style.border = "2px solid #16d12f";
    return true;
  }
}

function valideRadio() {
  let radioChecked = 0;

  for (let i = 0; i < radio.length; i++) {
    if (radio[i].checked) {
      radioChecked++;
      break;
    }
  }

  if (radioChecked) {
    messageOK(radioHelp, "Vous avez choisi")
    return true;
  } else {
    error(radioHelp, `Champ obligatoire`);
    return false;
  }
}

function valideConditions() {
  const checkbox1 = document.querySelector("#checkbox1");
  const obligatoire = document.querySelector(".obligatoire");

  if (checkbox1.checked === true) {
    obligatoire.innerHTML = `Merci !`;
    obligatoire.style.color = "#16d12f";
    return true;
  } else if (checkbox1 === false) {
    error(obligatoire, `Obligatoire`);
    return false;
  }
}

//Validation du formulaire
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    validePrenom() &&
    valideNom() &&
    valideMail() &&
    valideBirth() &&
    valideQuantity() &&
    valideRadio() &&
    valideConditions()
  ) {
    setTimeout(() => {
      formChange();
    }, 1000);
  }else{
    for(let input of inputField){
      if(input.value === ''){
        input.style.border = "2px solid #fe142f";
      } 
    } 
  }

  closeForm();
});

