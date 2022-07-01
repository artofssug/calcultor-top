//  Goal: Create a calculator
//  Step by Step
//  Calculator needs to have:
//  Buttons from 0 to 9 (CHECK)
//  Operator buttons (+, -, /, *) (CHECK)
//  More two buttons: Clear and Equal(=) (CHECK)
//  For each of the operator button, a mathematical function (CHECK)
//  A function that takes an operator and two numbers and then calls one of the mathematical functions
//  Create the functions that populate the display when you click the number buttons


// ********** QUERY SELECTORS AND VARIABLES **********
let display = document.querySelector('#display');
let numBtn = document.querySelectorAll('.numbers');
let opBtn = document.querySelectorAll('.operators');
let equalBtn = document.querySelector('#equal');
let displayValue = display.textContent;
let thereIsAlreadyAnOperator = false;
let operator;
let text;
let num1;
let num2;
let finalResult;
let lastCharacter;

//  For each operator button, a mathematical function (CHECK)
function sum(num1, num2) {
    finalResult = Number(num1) + Number(num2);
};

function subtr(num1, num2) {
    finalResult = Number(num1) - Number(num2);
};

function multiply(num1, num2) {
    finalResult = Number(num1) * Number(num2);
};

function divide(num1, num2) {
    finalResult = Number(num1) / Number(num2);
};

//  A function that takes an operator and two numbers and then calls one of the mathematical functions based on the operator
function operate(operator, num1, num2) {
    if (operator === '+') sum(num1, num2);
    if (operator === '-') subtr(num1, num2);
    if (operator === '*') multiply(num1, num2);
    if (operator === '/') divide(num1, num2);
    display.textContent = finalResult;
};

// ********** FUNCTIONS **********
//  Create the functions that populate the display when you click the number buttons

function numShowDisplay(button) {
    if (display.textContent === '0') {
        display.textContent = button.textContent;
    } else {
        display.textContent += button.textContent; 
    }
};

function getOperator() {
    // if the final character in the string(.length - 1)) be equal to any of the the operators, stores it on the operator var
    for (let i = 0; i < opBtn.length; i++) {
        if (display.textContent[(display.textContent.length - 1)] === opBtn[i].innerText) {
            operator = opBtn[i].innerText;
        }
    }
};

function getNum1() {
    // Stores all the numbers besides the operator to num1 var
    if (finalResult !== undefined) {
        num1 = finalResult
    } else {
        num1 = displayValue;
    }
};

function getNum2() {
        num2 = display.textContent.replace(text, '')
};

function limitTheNumOfOperators(button) {
    if (checkIfLastCharacterIsOp()) {
        thereIsAlreadyAnOperator = true;
    } else {
        display.textContent += button.textContent
        thereIsAlreadyAnOperator = true;
    }
}

function checkIfLastCharacterIsOp() {
    lastCharacter = display.textContent[(display.textContent.length - 1)]
    for (let i = 0; i < opBtn.length; i++) {
        if (lastCharacter === opBtn[i].innerText) {
            return true
        } else {
            continue
        }
    }
}

// ********** EVENT **********
//  Create the functions that populate the display when you click the number buttons
numBtn.forEach(button => {
    button.addEventListener('click', () => {
        numShowDisplay(button);
        displayValue = display.textContent;
    })
});

opBtn.forEach(button => {
    button.addEventListener('click', () => {
        // This if will only occour if the user want to display the final result clicking in the operator, not the equal
          if (num1 !== undefined && operator !== undefined && !(checkIfLastCharacterIsOp())) {
            getNum2();
            operate(operator, num1, num2);
            operator = undefined;
            num2 = undefined;
            getNum1();
            console.log(2);
        // This if will only occour to get the first number and operator in the first operation
        } else {
            getNum1();
            limitTheNumOfOperators(button);
            getOperator();
            text = display.textContent;
            console.log(3);
        }
    })
});

equalBtn.addEventListener('click', () => {
    // This if will only occour if the user don't provide a second number, so the result will be just the first number
    if (num1 !== undefined && operator !== undefined && (checkIfLastCharacterIsOp()) && num2 === undefined) {
        display.textContent = num1
        thereIsAlreadyAnOperator = false
    } else if (finalResult !== undefined && num2 === undefined) {
        getNum2();
        operate(operator, num1, num2);
        operator = undefined;
        num2 = undefined;
        console.log('xiiii')
    } else {
        lastCharacter = display.textContent[(display.textContent.length - 1)]
        if (thereIsAlreadyAnOperator === true) {
            getNum2();
            operate(operator, num1, num2);
            getNum1();
            operator = undefined;
            num2 = undefined;
            console.log('xix')
        }
    }
});