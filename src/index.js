//Esto es lo que importa el js donde hago el método que valida la tc
import validator from './validator.js';

//Funcion que tiene todos los listeners de los botones
 const addButtonsListeners = () => {
     //Listener de boton agregar nueva tarjeta
    const firstButtonClick = document.getElementById("newCardButton");
    firstButtonClick.addEventListener("click",formToComplete);
     //Listener de boton guardar
    const saveButtonClick = document.getElementById("saveInformation");
    saveButtonClick.addEventListener("click",backToHomepage);
    //Listener de boton entrar 
    const accessButtonClick = document.getElementById("accessToWallet");
    accessButtonClick.addEventListener("click",home);
    
 }

 //Funcion que va desde login a home
 const home = () =>{
     document.getElementById("login").style.display = "none";
     document.getElementById("home").style.display = "initial";

 }
 //Funcion que me muestra formulario para numeros de tarjetas
 const formToComplete = () =>{
    document.getElementById("home").style.display = "none";
    document.getElementById("newCard").style.display = "initial";
 }

//Funcion que se devuelve al homepage y procesa la funcion valid card
 const backToHomepage = () =>{
     //Valor de cc
    let creditCardNumber = document.getElementById("ccNumber").value;
    if (validator.isValid(creditCardNumber) == true ){ 
        alert("Datos ingresados correctamente");
        document.getElementById("newCard").style.display="none";
        document.getElementById("home").style.display="initial";
    }else {
        alert ("Por favor ingrese un número de tarjeta válido");
        
    }
    //console mientras tanto...
    console.log(validator.maskify(creditCardNumber));
 }

 
 





//Codigo que se llama siempre:

//Llamo a la funcion click
addButtonsListeners()




