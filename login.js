const loginForm=document.getElementById('loginForm');
const registerForm=document.getElementById('registerForm');
const showRegister=document.getElementById('showRegister');
const showLogin=document.getElementById('showLogin');

showRegister.addEventListener('click', (event)=>{
    event.preventDefault();
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
});

showLogin.addEventListener('click', (event) => {
    event.preventDefault(); 
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
});


let password= document.querySelectorAll(".password");
let incorrect= document.querySelector("#incorrect");


registerForm.addEventListener('submit', (event)=>{
    if(password[0].value !== password[1].value){
        event.preventDefault();
        incorrect.style.display='block'
    }
})

