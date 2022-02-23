'use strict';

//Apparition de la navbar type rideau
const mainNavbar = document.querySelector(".main-navbar");
const toggleButton = document.querySelector("#nav-icon");

toggleButton.addEventListener('click', () => {
  mainNavbar.classList.toggle('appear');
});


// DOM Elements
const modalbg = document.querySelector(".bground");
const modal = document.querySelector('.modal-body');
const modalBtn = document.querySelectorAll(".modal-btn");
const btnSubmit = document.querySelector('.btn-submit');
const form = document.querySelector("form");
const closeModal = document.querySelector('.close');
const prenom = document.querySelector('#first');
const prenomHelp = document.querySelector('.prenomHelp');
const nom = document.querySelector('#last');
const nomHelp = document.querySelector('.nomHelp');
const mail = document.querySelector('#email');
const mailHelp = document.querySelector('.mailHelp');
const birth = document.querySelector('#birthdate');
const birthHelp = document.querySelector('.birthHelp');
const radio = document.querySelectorAll(".checkbox-input");
const radioHelp = document.querySelector('.radioHelp');
const quantity = document.querySelector('#quantity');
const quantityHelp = document.querySelector('.quantityHelp');
let allInput = document.querySelectorAll('input.text-control');
let help = document.querySelectorAll('.help');

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

function launchModal() {
  modalbg.style.display = "block";
  prenomHelp.innerHTML = `Veuillez renseigner votre prénom`;
  prenomHelp.style.color = 'white';
  focusBlur();
  closeForm();
}  

//  Close modal formulaire avec la croix
function closeForm() {
  closeModal.addEventListener('click', () => {
  closeModal.style.display = 'none';
  setTimeout(() => {
    location.reload();
  }, 1000);  
 })}


// Focus et Blur des 5 premiers input
function focusBlur(){
  for(let i = 0; i < allInput.length; i++){
    allInput[i].addEventListener('focus', addColor);
    allInput[i].addEventListener('blur', removeColor);

    function addColor(){
      allInput[i].style.border = '3px solid blue';
    }

    function removeColor(){
      allInput[i].style.border = '';
    }
  }  
}

 // fonction changement d'apparence du formumaire après validation
 function formChange(){   
  //close modal après validation
      const btnSubmit = document.querySelector('.btn-submit');
      const formValid = document.querySelector('.formValid');
      const modalbg2 = document.querySelector('.bground-2');

    btnSubmit.addEventListener('click', () => {
    modalbg.style.display = 'none';
    modalbg2.style.display = 'block'; 
    })
    const btnCloseModal = document.querySelector('.btn-closeModal')
    btnCloseModal.addEventListener('click', () => {
      modalbg.style.display = 'none';
      modalbg2.style.display = 'none';
      setTimeout(() => {
        location.reload();
      }, 1000); 
    })
}
  



// Validations des champs prenom et nom
function valideIdentity(nameText, nameValue, nameHelp, nameStyle){
  if(nameValue === ''){
      nameHelp.innerHTML = `Veuillez renseigner votre ${nameText}`;
      errors.errorIdentity(nameHelp, nameStyle);
      // nameHelp.style.color = 'red';
      // nameStyle.border = '2px solid red';
      return false;
  }else if(/^[a-zA-Zéè ]+$/.test(nameValue) && nameValue.length >= 2){
    nameHelp.innerHTML = `${nameText} valide`;
    nameHelp.style.color = '#16d12f';
    nom.focus();
      if(nameValue === nom.value){
        mail.focus();
      }
    nameStyle.border = '2px solid #16d12f';
    return true;
  }else{
    nameHelp.innerHTML = `Le ${nameText} ne doit contenir que des lettres et avoir 2 caractères minimum`;
    errors.errorIdentity();
    // nameHelp.style.color = 'red';
    // nameStyle.border = '2px solid red';
    return false;
  }
}

const errors = {
    errorIdentity(nameHelp, nameStyle){
      nameHelp.style.color = 'red';
      nameStyle.border = '2px solid red';
    },
    errorMail(){
      mailHelp.innerHTML = 'Le mail est invalide';
      mailHelp.style.color = 'red';
      mail.style.border = '2px solid red';
    },
    errorBirth(){
      birth.style.border = '2px solid red';
      birthHelp.innerHTML = 'date de naissance invalide';
      birthHelp.style.color = 'red';
    },
    errorQuantity(){
      quantityHelp.innerHTML = 'champ obligatoire';
      quantityHelp.style.color = 'red';
      quantity.style.border = '2px solid red';
    },
    errorRadio(){
      radioHelp.innerHTML = 'Vous devez cocher un choix';
      radioHelp.style.color = 'red';
    },
    errorConditions(){
      obligatoire.innerHTML = `obligatoire`;
      obligatoire.style.color = 'red';
    }
}
console.log(errors);

function valideMail(){
  if(mail.value === ''){
    mailHelp.innerHTML = `Le mail est obligatoire`;
    mailHelp.style.color = 'red';
    //mail.style.border = '2px solid blue';
    return false
}else if((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail.value))){
    mailHelp.innerHTML = 'Mail valide';
    mailHelp.style.color = '#16d12f';
    birth.focus();
    mail.style.border = '2px solid #16d12f';
    return true;
    
}else{
  errors.errorMail();
  return false;
}

}

function valideBirth(){
const birthday = new Date(birth.value);
const todayTime = new Date()//.toISOString().split('T')[0];
const dateMin = new Date(1920, 0, 1);    
const ageMax = new Date(todayTime - 378432000000)//.toISOString().split('T')[0] // 12 ans depuis aujourd'hui
    //birth.style.border = '2px solid blue';
    birthHelp.innerHtml = 'champ obligatoire';
  
  if(birthday > todayTime || birthday >= ageMax || birthday <= dateMin){
    errors.errorBirth();
    return false;
  }else if(birthday < todayTime && birthday <= ageMax && birthday >= dateMin){
    
    birthHelp.innerHTML = 'Date de naissance valide';
    birthHelp.style.color = '#16d12f';
    quantity.focus();
    birth.style.border = '2px solid #16d12f';
    return true;
  }
}

function valideQuantity(){
  if(quantity.value === ''){
    errors.errorQuantity();
  }else{
    quantityHelp.innerHTML = 'champ valide';
    quantityHelp.style.color = '#16d12f';
    quantity.style.border = '2px solid #16d12f';
    return true;
  }
}

function valideRadio() {
  let radioChecked = 0;

  for(let i = 0; i < radio.length; i++){
    if(radio[i].checked){
      radioChecked++;
      break;
    }
  }

  if(radioChecked){
    radioHelp.innerHTML = 'Vous avez choisi';
    radioHelp.style.color = '#16d12f';
    return true;
  }else{
    errors.errorRadio();
    // radioHelp.innerHTML = 'Vous devez cocher un choix';
    // radioHelp.style.color = 'red';
    return false;
  }
    
} 

function valideConditions (){
  const checkbox1 = document.querySelector('#checkbox1');
  const obligatoire = document.querySelector('.obligatoire');

  if(checkbox1.checked === true){
    obligatoire.innerHTML = `Merci !`;
    obligatoire.style.color = '#16d12f';
    return true;
  }else if(checkbox1 === false){
    errors[5];
    return false;
  }

}


//Validation du formulaire
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if(
    valideIdentity('prenom', prenom.value, prenomHelp, prenom.style) &&
    valideIdentity('nom', nom.value, nomHelp, nom.style) &&
    //validePrenom() &&
    //valideNom() &&
    valideMail() &&
    valideBirth() &&
    valideQuantity() &&
    valideRadio() &&
    valideConditions()
  ){
    
    setTimeout(() => {
    formChange()
    }, 1000);   
  }
  
  closeForm();
})

// function validePrenom(){
//   if(prenom.value === ''){
//     prenomHelp.innerHTML = `Veuillez renseigner votre prénom`;
//     prenomHelp.style.color = 'red';
//     prenom.style.border = '2px solid red';
//     return false;
//   }else if(/^[a-zA-Zéè ]+$/.test(prenom.value) && prenom.value.length >= 2){
//     prenomHelp.innerHTML = `Prénom valide`;
//     prenomHelp.style.color = '#16d12f';
//     nom.focus();
//     prenom.style.border = '2px solid #16d12f';
//     return true;
//   }else{
//     prenomHelp.innerHTML = `Le prénom doit contenir 2 lettres minmum`;
//     prenomHelp.style.color = 'red';
//     prenom.style.border = '2px solid red';
//     return false;
//   }  
// }


// function valideNom(){
//   if(nom.value === ''){
//     nomHelp.innerHTML = `Veuillez renseigner votre nom`;
//    nomHelp.style.color = 'white';
//     nom.style.border = '2px solid blue';
//     return false
//   }else if(/^[a-zA-Zéè ]+$/.test(nom.value) && nom.value.length >= 2){
//         nomHelp.innerHTML = `Nom valide`;
//         nomHelp.style.color = '#16d12f';
//         mail.focus();
//         nom.style.border = '2px solid #16d12f';
//         return true;     
//   }else{
//     nomHelp.innerHTML = `Le nom ne doit contenir que des lettres et avoir 2 caractères minimum`;
//     nomHelp.style.color = 'red';
//     nom.style.border = '2px solid red';
//     return false;
//   }
  
// }