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
let prenomHelp = document.querySelector('.prenomHelp');
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
  // prenomHelp.innerHTML = `Veuillez renseigner votre prénom`;
  // prenomHelp.style.color = 'white';
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
  
function valideForm(input){ 
  for(let i = 0; i < allInput.length; i++){
  
    const type = allInput[i].getAttribute("id");
    let paragraphe = allInput[i].nextElementSibling;

      switch(type){
          case 'first' :{
          paragraphe = allInput[0].nextElementSibling;
        
              if(allInput[0].value === ''){
                message(paragraphe, `Veuillez renseigner votre prénom`);
                
                allInput[0].style.border = '2px solid ##fe142f';
              }else if(/^[a-zA-Zéè ]+$/.test(allInput[0].value) && allInput[0].value.length >= 2){
                paragraphe.innerHTML = 'Prénom valide';
                paragraphe.style.color = '#70e000';
                nom.focus();
                allInput[0].style.border = '2px solid #70e000';
              }else{
                message(paragraphe, `Le prénom doit contenir 2 lettres minmum`);
                allInput[0].style.border = '2px solid #fe142f';
              }
              console.log(paragraphe);
          }
          
          case 'last' : {
              paragraphe = allInput[1].nextElementSibling;
        
              if(allInput[1].value === ''){
                message(paragraphe, `Veuillez renseigner votre nom`);
                allInput[1].style.border = '2px solid #fe142f';
              }else if(/^[a-zA-Zéè ]+$/.test(allInput[0].value) && allInput[0].value.length >= 2){
                paragraphe.innerHTML = 'Nom valide';
                paragraphe.style.color = '#70e000';
                mail.focus();
                allInput[1].style.border = '2px solid #70e000';
              }else{
                message(paragraphe, `Le nom doit contenir 2 lettres minmum`);
                allInput[1].style.border = '2px solid #fe142f';
              }
              console.log(paragraphe);
              break;
          }

          case 'email' : {
            paragraphe = allInput[2].nextElementSibling;

                if(allInput[2].value === ''){
                  message(paragraphe, `Le mail est obligatoire`);
                  allInput[2].style.border = '2px solid #fe142f';
                  
              }else if((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(allInput[2].value))){
                  paragraphe.innerHTML = 'Mail valide';
                  paragraphe.style.color = '#70e000';
                  birth.focus();
                  allInput[2].style.border = '2px solid #70e000';
                  
                  
              }else{
                message(paragraphe, `Le mail est invalide`);
                allInput[2].style.border = '2px solid #fe142f';  
              }
              break;
          }
      }
  }
}


function message(nodeElt, message){
  nodeElt.innerHTML = message;
  nodeElt.style.color = '#fe142f';
}

  form.addEventListener('submit', (e) => {
  e.preventDefault();
  if(
    valideForm(allInput[0]) &&
    valideForm(allInput[1]) &&
    valideForm(allInput[2])
    
  ){
    
    setTimeout(() => {
    formChange()
    }, 1000);   
  }
  
  closeForm();
})



