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
const btnCloseModal = document.querySelector('.btn-closeModal');
const form = document.querySelector("form");
const closeModal = document.querySelectorAll(".close");
const radio = document.getElementsByName('location');
const radioHelp = document.querySelector(".radioHelp");
const obligatoire = document.querySelector(".obligatoire");
let inputField = document.querySelectorAll("input.text-control");
let allInput = document.querySelectorAll('input');
let help = document.querySelectorAll(".help");

console.log(radio);

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

function launchModal() {;
  modalbg.style.display = "block";
  focusBlur();
  closeForm();
}

// Fonction RESET après envoi du formulaire
function resetField (){
  for(let i = 0; i < inputField.length; i++){
    inputField[i].value = "";
    inputField[i].classList.remove('redBorder');
    inputField[i].classList.remove('greenBorder');
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
          resetField()
        }, 1000);  
  }))
 }

 //Close modal formulaire avec le bouton
 function closeFormButton(){
    btnCloseModal.addEventListener('click', () => {
      modalbg.style.display = 'none';
        modalbg2.style.display = 'none';
        setTimeout(() => {
          resetField();
        }, 1000);  
    })
 }

function focusBlur(){
  for(let i = 0; i < inputField.length; i++){
    inputField[i].addEventListener('focus', addColor);
    inputField[i].addEventListener('blur', removeColor);

    function addColor(){
      inputField[i].classList.add('blueBorder');
     
    }

    function removeColor(){
      inputField[i].classList.remove('blueBorder');
     
    }
  }  
}

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
          inputField[i].classList.remove('blueBorder');
          okMessageRemove(paragraphe, inputField[i]);
          errorMessage(paragraphe, `Veuillez inscrire votre prénom`, inputField[i]);
        } else if (
          /^[a-zA-Zéè ]+$/.test(inputField[i].value.trim()) &&
          inputField[i].value.length >= 2
        ) {
          inputField[i].classList.remove('blueBorder');
          errorMessageRemove(paragraphe, inputField[i]);
          okMessage(paragraphe, `Le prénom est valide`, inputField[i]);
          inputField[i + 1].focus();
        }else{
          error = error + 1;
          inputField[i].classList.remove('blueBorder');
          okMessageRemove(paragraphe, inputField[i]);
          errorMessage(paragraphe, `Le prénom est invalide`, inputField[i]);
        }
        
        break;

      case "last":

        if (inputField[i].value === "" || inputField[i].value === null) {
          okMessageRemove(paragraphe, inputField[i]);
          errorMessage(paragraphe, `Veuillez renseigner votre nom`, inputField[i]);
          error = error + 1;
        } else if (
          /^[a-zA-Zéè ]+$/.test(inputField[i].value.trim()) &&
          inputField[i].value.length >= 2
        ) {
          inputField[i].classList.remove('blueBorder');
          errorMessageRemove(paragraphe, inputField[i])
          okMessage(paragraphe, `Nom valide`, inputField[i]);
          inputField[i + 1].focus();
        }else{
          inputField[i].classList.remove('blueBorder');
          okMessageRemove(paragraphe, inputField[i]);
          errorMessage(paragraphe, `Nom invalide`, inputField[i]);
          error = error + 1;
        }

        break;

      case "email":

        if (inputField[i].value === "" || inputField[i].value === null) {
          okMessageRemove(paragraphe, inputField[i]);
          errorMessage(paragraphe, `Le mail est obligatoire`, inputField[i]);
          error = error + 1;
        } else if (
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
            inputField[i].value.trim())){
              inputField[i].classList.remove('blueBorder');
              errorMessageRemove(paragraphe, inputField[i]);
              okMessage(paragraphe, `Mail valide`, inputField[i]);
              inputField[i + 1].focus();
        }else{
          inputField[i].classList.remove('blueBorder');
          okMessageRemove(paragraphe, inputField[i]);
          errorMessage(paragraphe, `Le mail est invalide`, inputField[i]);
          error = error + 1;
        }
        
        break;

      case "birthdate":
        const birthday = new Date(inputField[i].value);
        const todayTime = new Date(); //.toISOString().split('T')[0];
        const dateMin = new Date(1920, 0, 1);
        const ageMax = new Date(todayTime - 315576e5 * 12); //.toISOString().split('T')[0] // 12 ans depuis aujourd'hui
        okMessageRemove(paragraphe, inputField[i]);
        errorMessage(paragraphe, `Le champ est obligatoire`, inputField[i]);
        if (birthday > todayTime || birthday >= ageMax || birthday <= dateMin) {
          inputField[i].classList.remove('blueBorder');
          okMessageRemove(paragraphe, inputField[i]);
          errorMessage(paragraphe, `Le champ est invalide`, inputField[i]);
          error = error + 1;
        } else if (
          birthday < todayTime &&
          birthday <= ageMax &&
          birthday >= dateMin
        ) {
          inputField[i].classList.remove('blueBorder');
          errorMessageRemove(paragraphe, inputField[i]);
          okMessage(paragraphe, `Date de naissance valide`, inputField[i]);
          inputField[i + 1].focus();
        }

        break;

      case "quantity":
        if (inputField[i].value === "" || inputField[i].value === null) {
          inputField[i].classList.remove('blueBorder');
          okMessageRemove(paragraphe, inputField[i]);
          errorMessage(paragraphe, `Le champ est invalide`, inputField[i]);
          error = error + 1;
        } else {
          inputField[i].classList.remove('blueBorder');
          errorMessageRemove(paragraphe, inputField[i]);
          okMessage(paragraphe, `Champ valide`, inputField[i])
        }

        break;
    }
  }
  return error <= 0;
  
}

function valideRadio() {  
  radioHelp.innerHTML = `Vous devez faire un choix`;
  radioHelp.classList.add('red');
    for(let rad of radio) {
      if(rad.checked){
        radioHelp.innerHTML = `Vous avez choisi ${rad.value}`;
        radioHelp.classList.remove('red');
        radioHelp.classList.add('green'); 
        return true;  
      }
    }
  }
 

valideRadio();

function valideConditions() {
  const checkbox1 = document.querySelector("#checkbox1");
  
  if (checkbox1.checked === true) {
    obligatoire.innerHTML = "Merci !";
    obligatoire.classList.add('green');
    return true;
  } else{
    obligatoire.innerHTML = `obligatoire`;
    obligatoire.classList.add('red');
    return false;
  }
}

valideConditions();

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

function okMessageRemove(nodeElt, input){
  nodeElt.classList.remove('green');
  input.classList.remove('greenBorder')
}

function errorMessageRemove(nodeElt, input){
  nodeElt.classList.remove('green');
  input.classList.remove('greenBorder');
  
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
    closeFormButton();
  }
})
