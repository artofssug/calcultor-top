// ********** QUERY SELECTORS AND VARIABLES **********
let display = document.querySelector('#display');
let numBtn = document.querySelectorAll('.numbers');
let opBtn = document.querySelectorAll('.operators');
let equalBtn = document.querySelector('#equal');
let clearBtn = document.querySelector('#clear');
let percentBtn = document.querySelector('#percentage');
let rmvBtn = document.querySelector('#remove');
let decBtn = document.querySelector('#decimal');
let displayValue = display.textContent;
let thereIsAlreadyAnOperator = false;
let operator;
let text;
let num1;
let num2;
let finalResult;
let lastCharacter;
let removedText;

//  For each operator button, a mathematical function (CHECK)
function sum(num1, num2) {
    finalResult = Number(num1) + Number(num2);
    if (!(Number.isInteger(finalResult))) {
        finalResult = finalResult.toFixed(1);
    }
};

function subtr(num1, num2) {
    finalResult = Number(num1) - Number(num2);
    if (!(Number.isInteger(finalResult))) {
        finalResult = finalResult.toFixed(1);
    }
};

function multiply(num1, num2) {
    finalResult = Number(num1) * Number(num2);
    if (!(Number.isInteger(finalResult))) {
        finalResult = finalResult.toFixed(1);
    }
};

function divide(num1, num2) {
    if (num1 === '0' && num2 === '0' || num2 === '0') {
        finalResult = 'I don\'t know';
    } else {
        finalResult = Number(num1) / Number(num2);
        if (!(Number.isInteger(finalResult))) {
            finalResult = finalResult.toFixed(1);
        }
    }
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

function checkIfNum2HaveAlreadyADot(tempText) {
    for (let i = 0; i < tempText.length; i++) {
        if (tempText[i] === decBtn.textContent) {
            return true
        }
        false
    }
}

function putNum2ADot () {
    if (text !== undefined) {
        for (let k = 0; k < display.textContent.length; k++) {
            for (let l = 0; l < opBtn.length; l++) {
                if (text[k] === opBtn[l].textContent) {
                    let tempText = display.textContent.replace(text, '')
                    console.log(tempText)
                    if (tempText[k] === opBtn[l].textContent) {
                        return
                    } else {
                        if (checkIfNum2HaveAlreadyADot(tempText)) {
                            return
                        } else {
                            display.textContent += decBtn.textContent
                            displayValue = display.textContent
                        }
                    }
                }
            }
        }
    }
}

// ********** EVENTS **********
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
            limitTheNumOfOperators(button);
            getOperator();
            text = display.textContent;
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
        display.textContent = num1;
        thereIsAlreadyAnOperator = false;
        text = undefined;
        operator = undefined;
    } else if (finalResult !== undefined && num2 === undefined) {
        getNum2();
        operate(operator, num1, num2);
        operator = undefined;
        num2 = undefined;
        console.log('xiiii');
    } else {
        lastCharacter = display.textContent[(display.textContent.length - 1)]
        if (thereIsAlreadyAnOperator === true) {
            getNum2();
            operate(operator, num1, num2);
            getNum1();
            operator = undefined;
            num2 = undefined;
            console.log('xix');
        }
    }
});

clearBtn.addEventListener('click', () => {
    finalResult = undefined;
    operator = undefined;
    text = undefined;
    num1 = undefined;
    num2 = undefined;
    finalResult = undefined;
    lastCharacter = undefined;
    thereIsAlreadyAnOperator = false;
    display.textContent = '0'
    displayValue = display.textContent;
})

decBtn.addEventListener('click', () => {
    for (let j = 0; j < opBtn.length; j++) {
        if (display.textContent[(display.textContent.length - 1)] === opBtn[j].textContent) {
            return
        }
    }
    putNum2ADot();
    for (let i = 0; i < display.textContent.length; i++) {
        if (display.textContent[i] === decBtn.textContent) {
            return;
        }
    }
    display.textContent += decBtn.textContent
    displayValue = display.textContent
    console.log(display.textContent[0])
})

rmvBtn.addEventListener('click', () => {
    if (display.textContent === '0') {
        return
    } else if (display.textContent.length === 1) {
        display.textContent = '0'
    } else {
        removedText = display.textContent.substring((display.textContent.length - 1), (display.textContent.length))
        display.textContent = display.textContent.replace(removedText, '')
        for (let i = 0; i < opBtn.length; i++) {
            if (removedText === opBtn[i].textContent) {
                operator = undefined
            }
        }
    }
    console.log(removedText)
})