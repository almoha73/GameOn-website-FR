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
const btnSignUp = document.querySelectorAll(".btn-signup");
const btnSubmit = document.querySelector(".btn-submit");
const form = document.querySelector("form");
const closeModal = document.querySelectorAll(".close");
//const prenom = document.querySelector("#first");
//const nom = document.querySelector("#last");
//const mail = document.querySelector("#email");
//const birth = document.querySelector("#birthdate");
const radio = document.querySelectorAll(".checkbox-input");
const radioHelp = document.querySelector(".radioHelp");
//const quantity = document.querySelector("#quantity");
const obligatoire = document.querySelector(".obligatoire");
let inputField = document.querySelectorAll("input.text-control");
let allInput = document.querySelectorAll('input');
let help = document.querySelectorAll(".help");
let radioChecked = 0;


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

function launchModal() {;
  modalbg.style.display = "block";
  //focusBlur();
  closeForm();
}

// Fonction RESET après envoi du formulaire
function resetField (){
  for(let i = 0; i < inputField.length; i++){
    inputField[i].value = "";
    inputField[i].style.border = 'transparent';
    inputField[i].nextElementSibling.innerHTML = "";
  }
  radioHelp.innerHTML = '';
  obligatoire.innerHTML = '';
  for( let oneRadio of radio){
      oneRadio.checked = false;
  }
  checkbox1.checked = false;
  checkbox2.checked = false;
}


 //Close modal formulaire avec la croix
 function closeForm() {
  closeModal.forEach((btn) => btn.addEventListener("click",  () => {
        modalbg.style.display = 'none';
        modalbg2.style.display = 'none';
        setTimeout(() => {
          location.reload();
        }, 1000);  
  })
  )
}

// function focusBlur(){
//   for(let i = 0; i < inputField.length; i++){
//     inputField[i].addEventListener('focus', addColor);
//     inputField[i].addEventListener('blur', removeColor);

//     function addColor(){
//       inputField[i].style.border = '3px solid blue';
//     }

//     function removeColor(){
//       inputField[i].style.border = 'none';
//     }
//   }  
// }

// fonction changement d'apparence du formumaire après validation

function formChange() {
    modalbg.style.display = "none";
    modalbg2.style.display = "block";
}

function valideForm() {
  let error = 0;
  for (let i = 0; i < inputField.length; i++) {
    const type = inputField[i].getAttribute("id");
    let paragraphe = inputField[i].nextElementSibling;

    switch (type) {
      case "first":
        if (inputField[i].value === "" || inputField[i].value === null) {
          error = error + 1;
          errorMessage(paragraphe, `Veuillez inscrire vore prénom`, inputField[i]);
        } else if (
          /^[a-zA-Zéè ]+$/.test(inputField[i].value.trim()) &&
          inputField[i].value.length >= 2
        ) {
          okMessage(paragraphe, `Le prénom est valide`, inputField[i]);
        }else{
          error = error + 1;
          errorMessage(paragraphe, `Le prénom est invalide`, inputField[i]);
        }
        
        break;

      case "last":

        if (inputField[i].value === "" || inputField[i].value === null) {
          errorMessage(paragraphe, `Veuillez renseigner votre nom`, inputField[i]);
          error = error + 1;
        } else if (
          /^[a-zA-Zéè ]+$/.test(inputField[i].value.trim()) &&
          inputField[i].value.length >= 2
        ) {
          okMessage(paragraphe, `Nom valide`, inputField[i]);
          inputField[i + 1].focus();
        }else{
          errorMessage(paragraphe, `Nom invalide`, inputField[i]);
          error = error + 1;
        }

        break;

      case "email":

        if (inputField[i].value === "" || inputField[i].value === null) {
          errorMessage(paragraphe, `Le mail est obligatoire`, inputField[i]);
          error = error + 1;
        } else if (
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
            inputField[i].value.trim())){
              okMessage(paragraphe, `Mail valide`, inputField[i]);
              inputField[i + 1].focus();
        }else{
          errorMessage(paragraphe, `Le mail est invalide`, inputField[i]);
          error = error + 1;
        }
        
        break;

      case "birthdate":
        const birthday = new Date(inputField[i].value);
        const todayTime = new Date(); //.toISOString().split('T')[0];
        const dateMin = new Date(1920, 0, 1);
        const ageMax = new Date(todayTime - 315576e5 * 12); //.toISOString().split('T')[0] // 12 ans depuis aujourd'hui
        errorMessage(paragraphe, `Le champ est obligatoire`, inputField[i]);
        if (birthday > todayTime || birthday >= ageMax || birthday <= dateMin) {
          errorMessage(paragraphe, `Le champ est invalide`, inputField[i]);
          error = error + 1;
        } else if (
          birthday < todayTime &&
          birthday <= ageMax &&
          birthday >= dateMin
        ) {
          okMessage(paragraphe, `Date de naissance valide`, inputField[i]);
          inputField[i + 1].focus();
        }

        break;

      case "quantity":
        if (inputField[i].value === "" || inputField[i].value === null) {
          errorMessage(paragraphe, `Le champ est invalide`, inputField[i]);
          error = error + 1;
        } else {
          okMessage(paragraphe, `Champ valide`, inputField[i])
        }

        break;
    }
  }
  return error <= 0;
  
}

function valideRadio() {  
  for (let i = 0; i < radio.length; i++) {
    if (radio[i].checked) {
      radioChecked++;
      break;
    }
  }
  if (radioChecked) {
    radioHelp.innerHTML =  "Vous avez choisi";
    radioHelp.classList.add('green');
    return true;
  } else {
    radioHelp.innerHTML = `Vous devez cocher un choix`;
    radioHelp.classList.add('red');
    return false;
  }
}

function valideConditions() {
  const checkbox1 = document.querySelector("#checkbox1");
  
  if (checkbox1.checked === true) {
    obligatoire.innerHTML = "Merci !";
    obligatoire.classList.add('green');
    return true;
  } else{
    obligatoire, `obligatoire`;
    obligatoire.classList.add('red');
    return false;
  }
}

function errorMessage(nodeElt, message, input) {
  nodeElt.innerHTML = message;
  nodeElt.classList.add('red');
  input.classList.add('redBorder')
}

function okMessage(nodeElt, message, input){
  nodeElt.innerHTML = message;
  nodeElt.classList.add('green');
  input.classList.add('greenBorder')
}
  


form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    valideForm()&&
    valideRadio() &&
    valideConditions()
  ) {
    setTimeout(() => {
      formChange();
    }, 1000);
    closeForm();
  }
})
