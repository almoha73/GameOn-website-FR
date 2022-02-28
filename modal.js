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
          case 'first' :
          paragraphe = allInput[0].nextElementSibling;
        
              if(allInput[0].value === ''){
                message(paragraphe, `Veuillez renseigner votre prénom`);
                allInput[0].style.border = '2px solid #fe142f';
                
              }else if(/^[a-zA-Zéè ]+$/.test(allInput[0].value) && allInput[0].value.length >= 2){
                paragraphe.innerHTML = 'Prénom valide';
                paragraphe.style.color = '#70e000';
                nom.focus();
                allInput[0].style.border = '2px solid #70e000';
               
              }else{
                message(paragraphe, `Le prénom doit contenir 2 lettres minmum`);
                allInput[0].style.border = '2px solid #fe142f';
                  
              }
            break; 
               
      
      
      
          case 'last' :      
         
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
              
            break; 

          case 'email' :         
     
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
                ;
              }
            
          break;

          case 'birthdate' :       
            
            paragraphe = allInput[3].nextElementSibling;
            const birthday = new Date(birth.value);
            const todayTime = new Date()//.toISOString().split('T')[0];
            const dateMin = new Date(1920, 0, 1);    
            const ageMax = new Date(todayTime - 378432000000)//.toISOString().split('T')[0] // 12 ans depuis aujourd'hui
                //birth.style.border = '2px solid blue';
                message(paragraphe, `Le champ est obligatoire`);
                allInput[3].style.border = '2px solid #fe142f';
              if(birthday > todayTime || birthday >= ageMax || birthday <= dateMin){
                message(paragraphe, `Le champ est invalide`);
                allInput[3].style.border = '2px solid #fe142f';
                
              }else if(birthday < todayTime && birthday <= ageMax && birthday >= dateMin){
                paragraphe.innerHTML = 'Date de naissance valide';
                paragraphe.style.color = '#70e000';
                quantity.focus();
                allInput[3].style.border = '2px solid #70e000';
               
              }
              
              break;


          case 'quantity' :      
      
            paragraphe = allInput[4].nextElementSibling;
            if(allInput[4].value === ''){
              message(paragraphe, `Le champ est invalide`); 
              allInput[4].style.border = '2px solid #fe142f';
              
            }else{
              paragraphe.innerHTML = 'champ valide';
              paragraphe.style.color = '#70e000';
              allInput[4].style.border = '2px solid #16d12f';
              
            }

            break;
             
      }
      
  }
  return true;
  
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
      radioHelp.style.color = '#70e000';
      return true;
    }else{
      message(radioHelp, `Vous devez cocher un choix`);
      return false;
    }
     
}

function valideConditions (){
  const checkbox1 = document.querySelector('#checkbox1');
  const obligatoire = document.querySelector('.obligatoire');
    if(checkbox1.checked === true){
      obligatoire.innerHTML = `Merci !`;
      obligatoire.style.color = '#70e000';
      return true;
    }else if(checkbox1.checked === false){
      message(obligatoire, `obligatoire`);
      return false;
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
        valideForm(allInput[2]) &&
        valideForm(allInput[3]) &&
        valideForm(allInput[4]) &&
        valideRadio() &&
        valideConditions()
      ){
        setTimeout(() => {
          formChange();
          }, 1000);     
      }
      closeForm();
       
})



