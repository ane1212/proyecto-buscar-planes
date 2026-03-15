import { registerUser, loginUser} from "./storage.js";


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


let passwordInputs= document.querySelectorAll(".password");
let incorrect= document.querySelector("#incorrect");

passwordInputs.forEach(input=>{
    input.addEventListener('input', () =>{
        incorrect.style.display='none';
    });
});

registerForm.addEventListener('submit', (event)=>{
    event.preventDefault();

    const name= document.getElementById('name').value;
    const email= document.getElementById('email').value;
    const pass1= document.getElementById('reg-pass1').value;
    const pass2= document.getElementById('reg-pass2').value;

    if (pass1 !== pass2){
        incorrect.style.display='block';
        return;
    }

    const newUser = {name, email, password: pass1};
    const reponse= registerUser(newUser);

    if (reponse.success){
        alert(reponse.message);
        registerForm.reset();
        showLogin.click();
    }else{
        alert(reponse.message);
    }
});

loginForm.addEventListener('submit', (event)=>{
    event.preventDefault();
     const email = loginForm.querySelector('input[type="email"]').value;
     const password = loginForm.querySelector('input[type="password"]').value;

    const user=loginUser(email,password);

    if(user){
        localStorage.setItem('currentUser', JSON.stringify(user));
        alert(`Bienvenido, ${user.name}!`);
        window.location.href='index.html';
    }else{
        alert("Correo electrónico o contraseña incorrectos");
    }
})