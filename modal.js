'use strict';

//Apparition de la navbar type rideau

const toggleButton = document.querySelector(".icon");
const mainNavbar = document.querySelector(".main-navbar");

toggleButton.addEventListener('click', () => {
  mainNavbar.classList.toggle('appear');
})

// function editNav() {
//   var x = document.getElementById("myTopnav");
//   if (x.className === "topnav") {
//     x.className += " responsive";
//   } else {
//     x.className = "topnav";
//   }
// }

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
const quantity = document.querySelector('#quantity');
const quantityHelp = document.querySelector('.quantityHelp');
const allInput = document.querySelectorAll('input.text-control');



// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

function launchModal() {
  modalbg.style.display = "block";
  prenomHelp.innerHTML = `Veuillez renseigner votre prénom`;
  prenomHelp.style.color = 'white';
  focusBlur();
  closeForm();
}  


form.addEventListener('submit', (e) => {
  e.preventDefault();
  if(
    validePrenom() &&
    valideNom() &&
    valideMail() &&
    valideBirth() &&
    valideQuantity() &&
    valideRadio() 
    //valideConditions()
  ){
    
    setTimeout(() => {
    formChange()
      
    }, 1000);
    
    
}
  closeForm();
})
// Focus et Blur des 5 premiers input
function focusBlur(){
  for(let i = 0; i < allInput.length; i++){
    let inputs = allInput[i];
    inputs.addEventListener('focus', addColor);
    inputs.addEventListener('blur', removeColor)
    function addColor(){
      inputs.style.border = '3px solid blue';
    }
    function removeColor(){
      inputs.style.border = '';
    }
  } 
}
  
//  Close modal form avec la croix
 function closeForm() {
  closeModal.addEventListener('click', () => {
  modalbg.style.display = 'none';
  setTimeout(() => {
    location.reload();
  }, 1000);  
 })}


 // fonction changement d'apparence du formumaire après validation
 function formChange(){   
  modal.innerHTML = `<p style="font-size: 36px; margin-top: 300px; text-align: center;">Merci pour <br> votre inscription</p><input class="btn-close modal-btn" type="button" value="Fermer"/> `
  modal.style.width = '500px'
  modal.style.height = '800px'

  //close modal après validation
  function closeAfterValidation(){
    const btnClose = document.querySelector('.btn-close')
  btnClose.addEventListener('click', () => {
   modalbg.style.display = 'none';
   setTimeout(() => {
     location.reload();
   }, 1000);  
  })
}
closeAfterValidation();
} 



// Validations des champs

  function validePrenom(){
    //const prenomHelp = document.querySelector('.prenomHelp')
    
    if(prenom.value === ''){
      prenomHelp.innerHTML = `Veuillez renseigner votre prénom`;
      prenomHelp.style.color = 'white';
      return false;
    }else if(/^[a-zA-Zéè ]+$/.test(prenom.value) && prenom.value.length >= 2){
      prenomHelp.innerHTML = `Prénom valide`;
      prenomHelp.style.color = 'green';
      nom.focus();
      prenom.style.border = '2px solid green';
      return true;
    }else{
      prenomHelp.innerHTML = `Le prénom doit contenir 2 lettres minmum`;
      prenomHelp.style.color = 'red';
      prenom.style.border = '2px solid red';
      return false;
    } 
    
  }
  
  function valideNom(){
  
    if(nom.value === ''){
      nomHelp.innerHTML = `Veuillez renseigner votre nom`;
      nomHelp.style.color = 'white';
      nom.style.border = '2px solid blue';
      return false
    }else if(/^[a-zA-Z ]+$/.test(nom.value) && nom.value.length >= 2){
          nomHelp.innerHTML = `Nom valide`;
          nomHelp.style.color = 'green';
          mail.focus();
          nom.style.border = '2px solid green';
          return true;
          
    }else{
      nomHelp.innerHTML = `Le nom ne doit contenir que des lettres et avoir 2 caractères minimum`;
      nomHelp.style.color = 'red';
      nom.style.border = '2px solid red';
      return false;
    }
    
  }

  function valideMail(){
    if(mail.value === ''){
      mailHelp.innerHTML = `Le mail est obligatoire`;
      mailHelp.style.color = 'white';
      mail.style.border = '2px solid blue';
      return false
  }else if((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail.value))){
      mailHelp.innerHTML = 'Mail valide';
      mailHelp.style.color = 'green';
      birth.focus();
      mail.style.border = '2px solid green';
      return true;
      
  }else{
    mailHelp.innerHTML = 'Le mail est invalide';
    mailHelp.style.color = 'red';
    mail.style.border = '2px solid red';
    return false;
  }
  
}

function valideBirth(){
  const birthday = new Date(birth.value);
  const todayTime = new Date()//.toISOString().split('T')[0];
  const dateMin = new Date(1920, 0, 1);    
  const ageMax = new Date(todayTime - 378432000000)//.toISOString().split('T')[0] // 12 ans depuis aujourd'hui
      birth.style.border = '2px solid blue';
      birthHelp.innerHtml = 'champ obligatoire';
    
   if(birthday > todayTime || birthday >= ageMax || birthday <= dateMin){
      birth.style.border = '2px solid red';
      birthHelp.innerHTML = 'date de naissance invalide';
      birthHelp.style.color = 'red';
      return false;
    }else if(birthday < todayTime && birthday <= ageMax && birthday >= dateMin){
      
      birthHelp.innerHTML = 'Date de naissance valide';
      birthHelp.style.color = 'green';
      quantity.focus();
      birth.style.border = '2px solid green';
      return true;
    }
  }

function valideQuantity(){
  if(quantity.value === ''){
    quantityHelp.innerHTML = 'champ obligatoire';
    quantityHelp.style.color = 'white';
    quantity.style.border = '2px solid blue';
    return false;
  }else{
    quantityHelp.innerHTML = 'champ valide';
    quantityHelp.style.color = 'green';
    quantity.style.border = '2px solid green';
    return true;
  }
}

function valideRadio() {
  const radio = document.querySelectorAll(".checkbox-input[type='radio']");
  console.log(radio);
  let radioChecked = false;

  for(let i = 0; i < radio.length; i++){
    if(radio[i].checked){
      radioChecked = true;
      console.log(radio[i]);
      return true;
    }
  }
       
} 

// function valideConditions (){
//   const checkbox1 = document.querySelector('#checkbox1').checked;
//   const obligatoire = document.querySelector('.obligatoire');

//   if(checkbox1 === true){
//     obligatoire.innerHTML = `obligatoire`;
//     obligatoire.style.color = 'green';
//     obligatoire.style.fontSize = '13px';
//     obligatoire.style.marginLeft = '50px';
    
//   }else if(checkbox1 === false){
//     obligatoire.innerHTML = `obligatoire`;
//     obligatoire.style.color = 'red';
//     obligatoire.style.fontSize = '13px';
//     obligatoire.style.marginLeft = '50px';
    
//   }

// }



