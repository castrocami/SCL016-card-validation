//Esto es lo que importa el js donde hago el método que valida la tc
import validator from './validator.js';

//Función que tiene todos los listeners de los botones
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

 //Función que va desde login a home
 const home = () =>{
     document.getElementById("login").style.display = "none";
     document.getElementById("home").style.display = "initial";

 }
 //Función que me muestra formulario para numeros de tarjetas
 const formToComplete = () =>{
    document.getElementById("home").style.display = "none";
    document.getElementById("newCard").style.display = "initial";
 }

//Función que se devuelve al homepage y procesa la funcion valid card
 const backToHomepage = () =>{
     //Valor de cc
    let creditCardNumber = document.getElementById("ccNumber").value;
    if (validator.isValid(creditCardNumber) == true ){ 
        alert("Datos ingresados correctamente");
         // Crear objeto que contiene como propiedad los input
        const walletAcces = {
            alias: document.getElementById("aliasName").value,
            name: document.getElementById("ccName").value,
            number: document.getElementById("ccNumber").value,
            exp: document.getElementById("ccExp").value,
            cvv: document.getElementById("ccCVV").value,
        };
        saveTheinformation(walletAcces); 
        showWallet();
        document.getElementById("newCard").style.display="none";
        document.getElementById("home").style.display="initial";
    }else {
        alert ("Por favor ingrese un número de tarjeta válido");
        
    } 
 }

 //Función que guarda el objeto en el local storage
const saveTheinformation = (walletAcces) => {
    let walletArray = [];
    if (localStorage.getItem("wallet")== null){
        walletArray.push(walletAcces);
        localStorage.setItem("wallet", JSON.stringify(walletArray));
    } else {
        walletArray = JSON.parse(localStorage.getItem("wallet"));  
        walletArray.push(walletAcces);
        localStorage.setItem("wallet", JSON.stringify(walletArray));
        }
}

//Función que toma el arreglo del l.s y lo muestra en home (Acá llamo a la funcion maskify!)
const showWallet = () =>{
    let getWallet = localStorage.getItem("wallet");
    getWallet = JSON.parse(getWallet);
    console.log(getWallet.length);
    let element = document.getElementById("cardsContainer");
    element.innerHTML = "";
    for (let i = 0; i < getWallet.length; i++){
        let one = document.createElement("li");
        one.classList.add("cardSummary");
        let two = document.createTextNode(getWallet[i].alias+ " :" + validator.maskify(getWallet[i].number));
        one.appendChild(two);
        element.appendChild(one);      
    }

    

}
 
 





//Codigo que se llama siempre:
addButtonsListeners();
showWallet();



