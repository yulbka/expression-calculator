function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let exprArr = [];
    let MathSigns = ['+', '-', '*', '/', '(', ')'];
    
  //convert input string to array with numbers and math sings

    let num = '';
    for (let i = 0; i < expr.length; i++) {     
     if (expr[i] == ' ') continue;    
     if (!MathSigns.includes(expr[i])) {
       num += expr[i];
     }
     if (MathSigns.includes(expr[i])) {
       if (num.length > 0) {
         exprArr.push(+num);
         num = '';
       }
       exprArr.push(expr[i]);
     }      
    }
    if (num.length) exprArr.push(+num);

    //check brace balance
    let braceStack = [];
    for (let i = 0; i < exprArr.length; i++) {
      if (exprArr[i] == '(') {
        braceStack.push(exprArr[i]);
      }
      if (exprArr[i] == ')') {
        if (braceStack.length == 0) throw new Error("ExpressionError: Brackets must be paired");    
        braceStack.pop();    
      }
    }
    if (braceStack.length != 0) throw new Error("ExpressionError: Brackets must be paired"); 
  

    let priority = {
      '+': 1,
      '-': 1,
      '*': 2,
      '/': 2
    };
 

   function calc(a, b, operation) {
     if (operation == '+') result = a + b;
     if (operation == '-') result = a - b;
     if (operation == '*') result = (a * b);
     if (operation == '/') result = a / b; 
     if (result === Infinity) throw new Error("TypeError: Division by zero.");   
     return result; 
   }

   //form stack with numbers and stack with operations

   let numStack = [];
   let signStack = [];

   for (let i = 0; i < exprArr.length; i++) {
     if (!MathSigns.includes(exprArr[i])) {      // put numbers into numStack
       numStack.push(exprArr[i]);
     } else {
      if (exprArr[i] in priority) {   // check if current item not number
        if ((signStack.length === 0) || (priority[exprArr[i]] > priority[signStack[signStack.length - 1]]) || (signStack[signStack.length - 1] === '(')) {
          signStack.push(exprArr[i]);   // if stack with signs is empty or current sign has major priority than last sign in stack or last item in stack is opening brace - put sign into signStack
        } else {
          while (priority[exprArr[i]] <= priority[signStack[signStack.length - 1]]) {  // if current sign has equal or less priority than last sign in stack: 
            let b = numStack.pop();           //take two last numbers from numStack
            let a = numStack.pop();
            let operation = signStack.pop();    //take last sign from signStack
            let result = calc(a, b, operation);   
            numStack.push(result);               //put result of math operation in numStack
          }                                      // if current sign still has equal or less priority than last sign in stack repeat;
          signStack.push(exprArr[i]);            //than eventually put current sign in signStack
        }
      }      
      if (exprArr[i] == '(') {              //if we have opening brace just put it in signStack
        signStack.push(exprArr[i]);
      }
      if (exprArr[i] == ')') {                              //if we have closing brace check last sign in stack
        while (signStack[signStack.length - 1] != '(') {    //make math operations with two last numbers of numStack and last sign of signStack until we met opening brace
            let b = numStack.pop();
            let a = numStack.pop();
            let operation = signStack.pop();
            let result = calc(a, b, operation);
            numStack.push(result);
        }
        signStack.pop();
      }
     }
   }

// final calculations 

   while (signStack.length) {             
    let b = numStack.pop();
    let a = numStack.pop();
    let operation = signStack.pop();
    let result = calc(a, b, operation); 
    numStack.push(result);
  }
  let finalResult = numStack.pop();  
  return finalResult;
   
}

module.exports = {
    expressionCalculator
}
