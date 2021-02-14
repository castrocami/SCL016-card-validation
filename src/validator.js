const validator = {
  //Método que verifica la tc
  isValid(creditCardNumber){
     // Para evitar string vacio algo null
     if (creditCardNumber== "" || creditCardNumber==null){
      return false;
    }
    //Para evitar un string de solo ceros
    if (parseInt(creditCardNumber) == 0){
      return false;
    }
    //Separar el string en un arreglo y que sea un int
    let ccNumberArray = creditCardNumber.split("").map(Number).reverse();

    //Iterar sobre el arreglo para sacar los numeros que esten en los indices par y multiplicarlos
    for (let i=0 ; i < ccNumberArray.length; i++){
        if (i%2 != 0) {
          ccNumberArray[i] = (ccNumberArray[i] * 2)     
        } 
        //Si los elementos del indice son mayores a 9 debo sumar sus digitos
        if (ccNumberArray[i]>9) {
          //Creo una nueva variable que guarde los indices convertidos en string, separados y luego transformados en int
          let newValues= ccNumberArray[i].toString().split("").map(Number);
          //Ese indice sera igual a los indices de las posicion 0 y 2 
          ccNumberArray[i] = newValues[0] + newValues[1];  
        } 
    }
    //Sumar todos los indices y si termina en cero la tarjeta es válida
    let sumNumbersValidCard = 0;
    for (let i=0; i < ccNumberArray.length; i++){
      sumNumbersValidCard = ccNumberArray[i] + sumNumbersValidCard; 
    }
    //console.log(ccNumberArray);
    //console.log(sumNumbersValidCard);

    return sumNumbersValidCard %10 == 0 ? true : false;
    
  },
  //Método que oculta los primeros numeros menos los ultimos 4
  maskify(creditCardNumber){
    //string vacio para poder "meter " los elementos a un solo sring
    let ccStringArrayFinal = "";
    //Separar en string el arreglo
    let ccStringArray = creditCardNumber.split("");
    // Iterar sobre el arreglo para reemplazar todos menos los ultimos 4
    for (let i=0; i < ccStringArray.length; i++){
      if(i<ccStringArray.length-4){
      ccStringArray[i] = "#";
      }
      //Voy sumando a mi arreglo final los string
      ccStringArrayFinal = ccStringArrayFinal + ccStringArray[i];
    }
    return ccStringArrayFinal;

  }
    
};

export default validator;
