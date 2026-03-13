const loginForm=document.getElementById('login-form');
const registerForm=document.getElementById('register-form');
const showRegister=document.getElementById('show-register');
const showLogin=document.getElementById('show-login');

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
});

password.forEach(input=>{
    input.addEventListener('input', () =>{
        incorrect.style.display='none';
    });
});
