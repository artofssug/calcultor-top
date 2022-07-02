//  objetivo final: criar uma calculadora
//  essa calculadora terá as seguintes operações: +, -, * e /
//  o display terá que mostrar num1 operator num2

//  VARIÁVEIS
let display = document.querySelector('#display');
let numBtn = document.querySelectorAll('.numbers');
let opBtn = document.querySelectorAll('.operators');
let equalBtn = document.querySelector('#equal');
let clearBtn = document.querySelector('#clear');
let percentBtn = document.querySelector('#percentage');
let rmvBtn = document.querySelector('#remove');
let decBtn = document.querySelector('#decimal');
//  Essa variável servirá para determinar o número 2 (retiraremos tudo que veio antes do operador e, portanto, o número 2 será o que sobrar)
let toGetNum2;
let displayValue;
let operator;
let num1;
let num2;
let finalResult;
let removedText = '';

//  FUNÇÕES
function sum(num1, num2) {
    finalResult = num1 + num2;
    roundIfNotInterger()
};

function subtr(num1, num2) {
    finalResult = num1 - num2;
    roundIfNotInterger()
};

function multiply(num1, num2) {
    finalResult = num1 * num2;
    roundIfNotInterger()
};

function divide(num1, num2) {
    if (num2 === 0) {
        return finalResult = 'IDK :)';
    }
    finalResult = num1 / num2;
    roundIfNotInterger()
};

function operate(operator, num1, num2) {
    if (num2 === '') {
        return finalResult = num1
    } else {
        num1 = Number(num1);
        num2 = Number(num2);
    }
    if (operator === '+') return sum(num1, num2);
    else if (operator === '-') return subtr(num1, num2);
    else if (operator === '*') return multiply(num1, num2);
    else return divide(num1, num2);
};

function roundIfNotInterger() {
    if (!Number.isInteger(finalResult)) {
        finalResult = finalResult.toFixed(1);
    }
}

function displayNum(button) {
    if (display.textContent === '0') {
        display.textContent = button.textContent;
    } else {
        display.textContent += button.textContent;
    }
    displayValue = display.textContent;
};

function getNum1() {
    num1 = displayValue;
};

function getNum2() {
    num2 = display.textContent.replace(toGetNum2, '');
};

function getTheFinalCharacter() {
    return display.textContent[display.textContent.length - 1]
}

function limitOperator() {
    for (let i = 0; i < opBtn.length; i++) {
        if (getTheFinalCharacter() === opBtn[i].textContent) {
            return true;
        }
    }
}

function afterOperation() {
    num1 = finalResult;
    operator = undefined;
    num2 = undefined;
    toGetNum2 = undefined;
}

function resetIfResultIDK() {
    if (display.textContent === 'IDK :)') {
        toGetNum2 = undefined;
        displayValue = undefined;
        operator = undefined;
        num1 = undefined;
        num2 = undefined;
        finalResult = undefined;
        display.textContent = '0';
    }
}

function checkIfNum2HaveAlreadyADot(tempText) {
    for (let i = 0; i < tempText.length; i++) {
        if (tempText[i] === decBtn.textContent) {
            return true
        }
    }
}

function checkIfNum2IsEmpty(tempText) {
        if (tempText.length = 0) {
            return true
        }
}

function putNum2ADot () {
    if (toGetNum2 !== undefined) {
        for (let k = 0; k < toGetNum2.length; k++) {
            for (let l = 0; l < opBtn.length; l++) {
                if (toGetNum2[k] === opBtn[l].textContent) {
                    let tempText = display.textContent.replace(toGetNum2, '')
                    if (checkIfNum2HaveAlreadyADot(tempText) || checkIfNum2IsEmpty(tempText)) {
                        return
                    } else {
                        display.textContent += decBtn.textContent
                    }
                }
            }
        }
    }
}

//  EVENTOS
equalBtn.addEventListener('click', () => {
    resetIfResultIDK()
    if (display.textContent.length === 2 && display.textContent[0] === '0') {
        display.textContent = 0;
        operator = undefined;
        toGetNum2 = undefined;
    }
    if (num1 === undefined && operator !== undefined) {
        num1 = '0'
    }
    if (display.textContent === '0' || displayValue !== undefined && num1 === undefined || finalResult !== undefined && operator === undefined) {
        return
    }
    getNum2();
    operate(operator, num1, num2);
    display.textContent = finalResult;
    displayValue = finalResult;
    afterOperation();
});

numBtn.forEach(button => {
    button.addEventListener('click', () => {
        resetIfResultIDK();
        displayNum(button);
    })
});

opBtn.forEach(button => {
    button.addEventListener('click', () => {
        resetIfResultIDK()
        if (num1 === undefined) {
            num1 = 0
        }
        if (limitOperator()) {
            if (num1 === 0) {
                operator = button.textContent;
                display.textContent = num1 + operator;
                toGetNum2 = display.textContent;
            } else {
                getNum1();
                operator = button.textContent;
                display.textContent = num1 + operator;
                toGetNum2 = display.textContent;
            }
            return
        // irá ter o mesmo resultado do 'IGUAL'
        } else if (!limitOperator() && operator !== undefined) {
            getNum2();
            operate(operator, num1, num2);
            display.textContent = finalResult;
            displayValue = finalResult;
            afterOperation();
            operator = button.textContent;
            display.textContent += operator;
            toGetNum2 = display.textContent;
        } else {
            getNum1();
            operator = button.textContent;
            display.textContent += operator;
            toGetNum2 = display.textContent;
        }
    })
});

clearBtn.addEventListener('click', () => {
    toGetNum2 = undefined;
    displayValue = undefined;
    operator = undefined;
    num1 = undefined;
    num2 = undefined;
    finalResult = undefined;
    display.textContent = '0';
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
    display.textContent += decBtn.textContent;
    displayValue = display.textContent;
});

rmvBtn.addEventListener('click', () => {
    if (display.textContent === '0') {
        return
    }
    display.textContent = display.textContent.replace(/\.$|\d$/, '');
    displayValue = display.textContent;
})

//  KEYBOARD SUPPORT
window.addEventListener('keydown', (e) => {
    let code = e.key;
    if (e.key === '0') {
        numBtn[9].click();
    } else if (e.key === '1') {
        numBtn[0].click();
    } else if (e.key === '2') {
        numBtn[1].click();
    } else if (e.key === '3') {
        numBtn[2].click();
    } else if (e.key === '4') {
        numBtn[3].click();
    } else if (e.key === '5') {
        numBtn[4].click();
    } else if (e.key === '6') {
        numBtn[5].click();
    } else if (e.key === '7') {
        numBtn[6].click();
    } else if (e.key === '8') {
        numBtn[7].click();
    } else if (e.key === '9') {
        numBtn[8].click();
    } else if (e.key === '+') {
        if (e.shiftKey) {
            opBtn[0].click();
        } else {
            opBtn[0].click();
        }
    } else if (e.key === '-') {
        if (e.shiftKey) {
            opBtn[1].click();
        }
        opBtn[1].click()
    } else if (e.key === '/') {
        if (e.shiftKey) {
            opBtn[2].click();
        }
        opBtn[2].click()
    } else if (e.key === '?') {
        if (e.shiftKey) {
            opBtn[2].click();
        }
    } else if (e.key === '*') {
        if (e.shiftKey) {
            opBtn[3].click();
        }
        opBtn[3].click();
    } else if (e.key === 'Enter') {
        equalBtn.click();
    } else if (e.key === 'Escape') {
        clearBtn.click();
    } else if (e.key === 'Backspace') {
        rmvBtn.click();
    } else if (e.key === '.') {
        decBtn.click();
    }
});