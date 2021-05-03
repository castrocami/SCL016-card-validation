import validator from './validator.js';

//Listener buttons
 const addButtonsListeners = () => {
    const firstButtonClick = document.getElementById("newCardButton");
    firstButtonClick.addEventListener("click",formToComplete);
  
    const saveButtonClick = document.getElementById("saveInformation");
    saveButtonClick.addEventListener("click",backToHomepage);
    
    const accessButtonClick = document.getElementById("accessToWallet");
    accessButtonClick.addEventListener("click",home);

    const backToHome = document.getElementById("backtoHome");
    backToHome.addEventListener("click", home);  
    
    const closeSesion = document.getElementById("closeSesionB");
    closeSesion.addEventListener("click", backLogin); 
    
    const backToHomeTwo = document.getElementById("buttonTwoHome");
    backToHomeTwo.addEventListener("click",home);
 }

 //Home to login
 const backLogin = () =>{
    document.getElementById("login").style.display = "initial";
    document.getElementById("home").style.display = "none";
 }

 //Login to home + welcome 
 const home = () =>{
     document.getElementById("login").style.display = "none";
     document.getElementById("home").style.display = "grid";
     document.getElementById("newCard").style.display = "none";
     document.getElementById("card").style.display = "none"
    let welcomeHello = document.getElementById("welcomeName");
    welcomeHello.innerHTML = ("Hola " + document.getElementById("user").value);
 }

 // Form for TC 
 const formToComplete = () =>{
    document.getElementById("home").style.display = "none";
    document.getElementById("newCard").style.display = "grid";
 }

//Form with tc data already created
 const backToHomepage = () =>{
    let creditCardNumber = document.getElementById("ccNumber").value;
    if (validator.isValid(creditCardNumber) == true ){ 
        alert("Datos ingresados correctamente");
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
 //Show card details
 const cardDetails = () => {
    document.getElementById("home").style.display = "none";
    let cardElements = document.getElementById("card");
    cardElements.style.display = "initial"; 
 }

 // Save de object (wallet) in local storage 
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

// Funtion that take the array from local storage and show in home (Here is maskify method)
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
        cardsUl.appendChild(cardLi); 
        //Funtion that  fill others details
        const fillCardDetails = () =>{
            document.getElementById("cardDetailsAlias").textContent = getWallet[i].alias;
            document.getElementById("cardDetailsName").textContent =  getWallet[i].name;
            document.getElementById("cardDetailsNumber").textContent = getWallet[i].number;
            document.getElementById("cardDetailsExp").textContent = getWallet[i].exp;
            document.getElementById("cardDetailscvv").textContent = getWallet[i].cvv;
            cardDetails();
        };
        cardLi.addEventListener("click", fillCardDetails);
    }
}
//Codigo que se llama siempre:
addButtonsListeners();
showWallet();



