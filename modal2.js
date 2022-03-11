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
  focusBlur();
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
      location.reload();
    }, 1000);   
  });
}


function valideForm() {
  let error = 0;
  for (let i = 0; i < inputField.length; i++) {
    const type = inputField[i].getAttribute("id");
    let paragraphe = inputField[i].nextElementSibling;
    switch (type) {
      case "first":
        if (inputField[i].value === "" || inputField[i].value === null) {
          paragraphe.innerHTML = `Veuillez renseigner votre prénom`;
          paragraphe.classList.add('red');
          inputField[i].classList.add('redBorder');
          error = error + 1;
        } else if (
          /^[a-zA-Zéè ]+$/.test(inputField[i].value.trim()) &&
          inputField[i].value.length >= 2
        ) {
          paragraphe.innerHTML = `Prénom valide`;
          paragraphe.classList.add('green');
          inputField[i + 1].focus();
          inputField[i].classList.add('greenBorder');
          
        }
        
        break;

      case "last":

        if (inputField[i].value === "" || inputField[i].value === null) {
          paragraphe.innerHTML = `Veuillez renseigner votre nom`;
          paragraphe.classList.add('red');
          inputField[i].classList.add('redBorder');
          error = error + 1;
        } else if (
          /^[a-zA-Zéè ]+$/.test(inputField[i].value.trim()) &&
          inputField[i].value.length >= 2
        ) {
          paragraphe.innerHTML = `Nom valide`;
          paragraphe.classList.add('green');
          inputField[i + 1].focus();
          inputField[i].classList.add('greenBorder');
          
        }

        break;

      case "email":

        if (inputField[i].value === "" || inputField[i].value === null) {
          paragraphe.innerHTML = `Le mail est obligatoire`;
          paragraphe.classList.add('red');
          inputField[i].classList.add('redBorder');
          error = error + 1;
        } else if (
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
            inputField[i].value.trim())){
              paragraphe.innerHTML = `Mail valide`;
              paragraphe.classList.add('green');
              inputField[i + 1].focus();
              inputField[i].classList.add('greenBorder');
              
        }

        break;

      case "birthdate":
        const birthday = new Date(inputField[i].value);
        const todayTime = new Date(); //.toISOString().split('T')[0];
        const dateMin = new Date(1920, 0, 1);
        const ageMax = new Date(todayTime - 315576e5 * 12); //.toISOString().split('T')[0] // 12 ans depuis aujourd'hui
       
        paragraphe.innerHTML = `Le champ est obligatoire`;
        paragraphe.classList.add('red');
        inputField[i].classList.add('redBorder');
        if (birthday > todayTime || birthday >= ageMax || birthday <= dateMin) {
          paragraphe.innerHTML =  `Le champ est invalide`;
          paragraphe.classList.add('red');
          inputField[i].classList.add('redBorder');
          error = error + 1;
        } else if (
          birthday < todayTime &&
          birthday <= ageMax &&
          birthday >= dateMin
        ) {
          paragraphe.innerHTML = `Date de naissance valide`;
          paragraphe.classList.add('green');
          inputField[i + 1].focus();
          inputField[i].classList.add('greenBorder');
          
        }

        break;

      case "quantity":
        if (inputField[i].value === "" || inputField[i].value === null) {
          paragraphe.innerHTML = `Le champ est invalide`;
          paragraphe.classList.add('red');
          inputField[i].classList.add('redBorder');
          error = error + 1;
        } else {
          paragraphe.innerHTML = 'Champ valide';
          paragraphe.classList.add('green');
          inputField[i].classList.add('greenBorder');
          
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
