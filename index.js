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
    //Listener para volver al home dps de ver detalles de la tarjeta
    const backToHome = document.getElementById("backtoHome");
    backToHome.addEventListener("click", home);  
    //Listener botones para cerrar sesion
    const closeSesion = document.getElementById("closeSesionB");
    closeSesion.addEventListener("click", backLogin); 
    //Listener para volver a home desde el formulario de tc
    const backToHomeTwo = document.getElementById("buttonTwoHome");
    backToHomeTwo.addEventListener("click",home);
 }

 //Funcion que va de home a login
 const backLogin = () =>{
    document.getElementById("login").style.display = "initial";
    document.getElementById("home").style.display = "none";
 }

 //Función que va desde login a home
 const home = () =>{
     document.getElementById("login").style.display = "none";
     document.getElementById("home").style.display = "initial";
     document.getElementById("newCard").style.display = "none";
     document.getElementById("card").style.display = "none"
    let welcomeHello = document.getElementById("welcomeName");
    welcomeHello.innerHTML = ("Hola " + document.getElementById("user").value);

 }
 //Función que me muestra formulario para numeros de tarjetas
 const formToComplete = () =>{
    document.getElementById("home").style.display = "none";
    document.getElementById("newCard").style.display = "initial";
 }

//Función que se devuelve al homepage y crea un objeto con los datos y procesa la funcion valid card
//LLamo a las funciones savetheinformation y showWallet
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

 //Funcion que me muestra los detalles de una tarjeta
 const cardDetails = () => {
    document.getElementById("home").style.display = "none";
    let cardElements = document.getElementById("card");
    cardElements.style.display = "initial"; 
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
    let cardsUl = document.getElementById("cardsContainer");
    cardsUl.innerHTML = "";
    if (getWallet == null){
        return;
    }
    for (let i = 0; i < getWallet.length; i++){
        let cardLi = document.createElement("li");
        cardLi.classList.add("cardSummary"); 
        let two = document.createTextNode(getWallet[i].alias+ ": " + validator.maskify(getWallet[i].number));
        cardLi.appendChild(two);
        cardsUl.appendChild(cardLi); // donde esta el ul le agrego el
        //Funcion que rellena en la otra seccion los detalles, aprovechando la iteracion
        const fillCardDetails = () =>{
            document.getElementById("cardDetailsAlias").innerHTML= getWallet[i].alias;
            document.getElementById("cardDetailsName").innerHTML= getWallet[i].name;
            document.getElementById("cardDetailsNumber").innerHTML= getWallet[i].number;
            document.getElementById("cardDetailsExp").innerHTML= getWallet[i].exp;
            document.getElementById("cardDetailscvv").innerHTML= getWallet[i].cvv;
            cardDetails();
        };

        cardLi.addEventListener("click", fillCardDetails);
    }

    

}
 
 





//Codigo que se llama siempre:
addButtonsListeners();
showWallet();



