const validator = {
  isValid(creditCardNumber){
     if (creditCardNumber== "" || creditCardNumber==null){
      return false;
    }
    if (parseInt(creditCardNumber) == 0){
      return false;
    }

    let ccNumberArray = creditCardNumber.split("").map(Number).reverse();
    for (let i=0 ; i < ccNumberArray.length; i++){
        if (i%2 != 0) {
          ccNumberArray[i] = (ccNumberArray[i] * 2)     
        } 
        if (ccNumberArray[i]>9) {
          let newValues= ccNumberArray[i].toString().split("").map(Number); 
          ccNumberArray[i] = newValues[0] + newValues[1];  
        } 
    }
    let sumNumbersValidCard = 0;
    for (let i=0; i < ccNumberArray.length; i++){
      sumNumbersValidCard = ccNumberArray[i] + sumNumbersValidCard; 
    }
    return sumNumbersValidCard %10 == 0 ? true : false;
  },
  
  maskify(creditCardNumber){
    let ccStringArrayFinal = "";
    let ccStringArray = creditCardNumber.split("");
    for (let i=0; i < ccStringArray.length; i++){
      if(i<ccStringArray.length-4){
      ccStringArray[i] = "#";
      }
      ccStringArrayFinal = ccStringArrayFinal + ccStringArray[i];
    }
    return ccStringArrayFinal;
  }  
};
export default validator;
