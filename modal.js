"use strict";

//Apparition de la navbar type rideau
const mainNavbar = document.querySelector(".main-navbar");
const toggleButton = document.querySelector("#nav-icon");

toggleButton.addEventListener("click", () => {
  mainNavbar.classList.toggle("appear");
});

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalbg2 = document.querySelector(".bground-2");
const modal = document.querySelector(".modal-body");
const modalBtn = document.querySelectorAll(".modal-btn");
const btnSubmit = document.querySelector(".btn-submit");
const form = document.querySelector("form");
const closeModal = document.querySelector(".close");
const prenom = document.querySelector("#first");
const nom = document.querySelector("#last");
const mail = document.querySelector("#email");
const birth = document.querySelector("#birthdate");
const radio = document.querySelectorAll(".checkbox-input");
const radioHelp = document.querySelector(".radioHelp");
const quantity = document.querySelector("#quantity");
const obligatoire = document.querySelector(".obligatoire");
let inputField = document.querySelectorAll("input.text-control");
let allInput = document.querySelectorAll('input');
let help = document.querySelectorAll(".help");
let radioChecked = 0;
console.log(help);


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

function launchModal() {
  modalbg.style.display = "block";
  focusBlur();
  closeForm();
}

/// Fonction RESET après envoi du formulaire
function reset (){
  for(let i = 0; i < inputField.length; i++){
    inputField[i].value = "";
    inputField[i].style.border = "";
    inputField[i].innerHTML = "";
  }
  radioHelp.innerHTML = '';
  obligatoire.innerHTML = '';
  for( let oneRadio of radio){
      oneRadio.checked = false;
  }
  checkbox1.checked = false;
  checkbox2.checked = false;
}


//  Close modal formulaire avec la croix
function closeForm() {
  closeModal.addEventListener("click", () => {
    modalbg.style.display = "none";
    modalbg2.style.display = "none";
    reset();
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
  btnSubmit.addEventListener("click", () => {
    modalbg.style.display = "none";
    modalbg2.style.display = "block";
  });
  const btnCloseModal = document.querySelector(".btn-closeModal");
  btnCloseModal.addEventListener("click", () => {
    modalbg.style.display = "none";
    modalbg2.style.display = "none";
    setTimeout(() => {
      reset();
    }, 1000);
  });
}




function valideForm(input) {
  for (let i = 0; i < inputField.length; i++) {
    const type = inputField[i].getAttribute("id");
    let paragraphe = inputField[i].nextElementSibling;

    switch (type) {
      case "first":
        paragraphe = inputField[0].nextElementSibling;

        if (inputField[0].value === "") {
          message(paragraphe, `Veuillez renseigner votre prénom`, '#fe142f');
          inputField[0].style.border = "2px solid #fe142f";
        } else if (
          /^[a-zA-Zéè ]+$/.test(inputField[0].value) &&
          inputField[0].value.length >= 2
        ) {
          message(paragraphe, `Prénom valide`, '#70e000');
          nom.focus();
          inputField[0].style.border = "2px solid #70e000";
        } else {
          message(paragraphe, `Le prénom doit contenir 2 lettres minmum`, '#fe142f');
          inputField[0].style.border = "2px solid #fe142f";
        }
        break;

      case "last":
        paragraphe = inputField[1].nextElementSibling;

        if (inputField[1].value === "") {
          message(paragraphe, `Veuillez renseigner votre nom`, '#fe142f');
          inputField[1].style.border = "2px solid #fe142f";
        } else if (
          /^[a-zA-Zéè ]+$/.test(inputField[0].value) &&
          inputField[0].value.length >= 2
        ) {
          message(paragraphe, `Nom valide`, '#70e000');
          mail.focus();
          inputField[1].style.border = "2px solid #70e000";
        } else {
          message(paragraphe, `Le nom doit contenir 2 lettres minmum`, '#fe142f');
          inputField[1].style.border = "2px solid #fe142f";
        }

        break;

      case "email":
        paragraphe = inputField[2].nextElementSibling;

        if (inputField[2].value === "") {
          message(paragraphe, `Le mail est obligatoire`, '#fe142f');
          inputField[2].style.border = "2px solid #fe142f";
        } else if (
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
            inputField[2].value
          )
        ) {
          message(paragraphe, `Mail valide`, '#70e000');
          birth.focus();
          inputField[2].style.border = "2px solid #70e000";
        } else {
          message(paragraphe, `Le mail est invalide`, '#fe142f');
          inputField[2].style.border = "2px solid #fe142f";
        }

        break;

      case "birthdate":
        paragraphe = inputField[3].nextElementSibling;
        const birthday = new Date(birth.value);
        const todayTime = new Date(); //.toISOString().split('T')[0];
        const dateMin = new Date(1920, 0, 1);
        const ageMax = new Date(todayTime - 378432000000); //.toISOString().split('T')[0] // 12 ans depuis aujourd'hui
        //birth.style.border = '2px solid blue';
        message(paragraphe, `Le champ est obligatoire`, '#fe142f');
        inputField[3].style.border = "2px solid #fe142f";
        if (birthday > todayTime || birthday >= ageMax || birthday <= dateMin) {
          message(paragraphe, `Le champ est invalide`, '#fe142f');
          inputField[3].style.border = "2px solid #fe142f";
        } else if (
          birthday < todayTime &&
          birthday <= ageMax &&
          birthday >= dateMin
        ) {
          message(paragraphe, `Date de naissance valide`, '#70e000');
          quantity.focus();
          inputField[3].style.border = "2px solid #70e000";
        }

        break;

      case "quantity":
        paragraphe = inputField[4].nextElementSibling;
        if (inputField[4].value === "") {
          message(paragraphe, `Le champ est invalide`, '#fe142f');
          inputField[4].style.border = "2px solid #fe142f";
        } else {
          message(paragraphe, 'Champ valide', "#70e000");
          inputField[4].style.border = "2px solid #16d12f";
        }

        break;
    }
  }
  return true;
}

function valideRadio() {
  
  for (let i = 0; i < radio.length; i++) {
    if (radio[i].checked) {
      radioChecked++;
      break;
    }
  }

  if (radioChecked) {
    message(radioHelp, "Vous avez choisi", "#70e000");
    return true;
  } else {
    message(radioHelp, `Vous devez cocher un choix`, '#fe142f');
    return false;
  }
}

function valideConditions() {
  const checkbox1 = document.querySelector("#checkbox1");
  
  if (checkbox1.checked === true) {
    message(obligatoire, "Merci !", "#70e000");
    return true;
  } else{
    message(obligatoire, `obligatoire`, '#fe142f');
    return false;
  }
}

function message(nodeElt, message, color) {
  
  nodeElt.innerHTML = message;
  nodeElt.style.color = color;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    valideForm(inputField[0]) &&
    valideForm(inputField[1]) &&
    valideForm(inputField[2]) &&
    valideForm(inputField[3]) &&
    valideForm(inputField[4]) &&
    valideRadio() &&
    valideConditions()
  ) {
    setTimeout(() => {
      formChange();
    }, 1000);
  }
  closeForm();
});
