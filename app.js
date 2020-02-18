const zero_button = document.getElementById("zero");
const one_button = document.getElementById("1");
const two_button = document.getElementById("2");
const three_button = document.getElementById("3");
const four_button = document.getElementById("4");
const five_button = document.getElementById("5");
const six_button = document.getElementById("6");
const seven_button = document.getElementById("7");
const eight_button = document.getElementById("8");
const nine_button = document.getElementById("9");
const dot_button = document.getElementById("dot");

const plus_button = document.getElementById("add");
const minus_button = document.getElementById("substract");
const multiply_button = document.getElementById("multiply");
const divide_button = document.getElementById("divide");
const equal_button = document.getElementById("equal");
const clear_button = document.getElementById("clear");
const delete_button = document.getElementById("delete");
const switchSign_button = document.getElementById("switchSign");

const typingScreen_div = document.getElementById("typingScreen");
const resultScreen_div = document.getElementById("resultScreen");
const historic_div = document.getElementById("historic");

const HISTORIC_CHARSIZE = 21;
const TYPING_CHARSIZE = 14;

let result = 0;
let calculArray = [];
let numberTemp = "";


main();

//--------------------------------------------------
function add(a, b) {
    return a + b;
}
function substract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    return a / b;
}
function operate(operator, a, b) {
    switch (operator) {
        case '+': return add(a, b);
        case '-': return substract(a, b);
        case '*': return multiply(a, b);
        case '/': return divide(a, b);
    }
}

//--------------------------------------------------
function displayResult() {
    if (result < 1000000000000) {
        typingScreen_div.innerHTML = result.toString().substr(0, TYPING_CHARSIZE);
    }
    else {
        typingScreen_div.innerHTML = result.toExponential(3).toString().substr(0, TYPING_CHARSIZE);
    }
}
//--------------------------------------------------
function displayTyping(text) {
    typingScreen_div.innerHTML = text.substr(-TYPING_CHARSIZE);
}
//--------------------------------------------------
function displayHistoric() {
    historic_div.innerHTML = calculArray.join("").substr(-HISTORIC_CHARSIZE);
}
//--------------------------------------------------
function errorMessage() {
    clear();
    typingScreen_div.innerHTML = "ERROR";
}
//--------------------------------------------------
function checkDivisionZero() {
    return (calculArray[calculArray.length - 1] == 0) && (calculArray[calculArray.length - 2] == "/");
}
//--------------------------------------------------
function getNumber(a) {
    numberAfterResult();
    if (a == 0) {
        if (numberTemp != "0") {
            numberTemp = numberTemp + a;
        }
    } else {
        if (numberTemp == "0") {
            numberTemp = a;
        } else {
            numberTemp = numberTemp + a;
        }
    }
    displayTyping(numberTemp);
}
//--------------------------------------------------
function getDot() {
    numberAfterResult();
    if (!numberTemp.includes(".") && numberTemp != "") {
        numberTemp = numberTemp + ".";
    }
    else if (!numberTemp.includes(".") && numberTemp == "") {
        numberTemp = numberTemp + "0.";
    }
    displayTyping(numberTemp);
}

//--------------------------------------------------
function getPlus() {
    if (numberTemp == "" && result == 0) {
        calculArray[calculArray.length - 1] = "+";
    }
    else if (numberTemp == "" && result != 0) {
        operatorAfterResult();
        calculArray.push("+");
    } else {
        calculArray.push(Number(numberTemp));
        if (checkDivisionZero() == true) {
            return errorMessage();
        } else {
            numberTemp = "";
            calculArray.push("+");
        }
    }
    displayTyping("");
    displayHistoric();
}
function getSubstract() {
    if (numberTemp == "" && result == 0) {
        calculArray[calculArray.length - 1] = "-";
    }
    else if (numberTemp == "" && result != 0) {
        operatorAfterResult();
        calculArray.push("-");
    } else {
        calculArray.push(Number(numberTemp));
        if (checkDivisionZero() == true) {
            return errorMessage();
        } else {
            numberTemp = "";
            calculArray.push("-");
        }
    }
    displayTyping("");
    displayHistoric();
}
function getMultiply() {
    if (numberTemp == "" && result == 0) {
        calculArray[calculArray.length - 1] = "*";
    }
    else if (numberTemp == "" && result != 0) {
        operatorAfterResult();
        calculArray.push("*");
    } else {
        calculArray.push(Number(numberTemp));
        if (checkDivisionZero() == true) {
            return errorMessage();
        } else {
            numberTemp = "";
            calculArray.push("*");
        }
    }
    displayTyping("");
    displayHistoric();
}
function getDivide() {
    if (numberTemp == "" && result == 0) {
        calculArray[calculArray.length - 1] = "/";
    }
    else if (numberTemp == "" && result != 0) {
        operatorAfterResult();
        calculArray.push("/");
    } else {
        calculArray.push(Number(numberTemp));
        if (checkDivisionZero() == true) {
            return errorMessage();
        } else {
            numberTemp = "";
            calculArray.push("/");
        }
    }
    displayTyping("");
    displayHistoric();
}
//--------------------------------------------------

function numberAfterResult() {
    if (result != 0) {
        result = 0;
        resultScreen_div.innerHTML = "";
        historic_div.innerHTML = "";
    }
}
function operatorAfterResult() {
    calculArray.push(result);
    typingScreen_div.innerHTML = result;
    result = 0;
    displayTyping("");
    displayHistoric();
}
//--------------------------------------------------
function lastOfArray(array) {
    return array[array.length - 1];
}
//--------------------------------------------------

function equal() {
    if (result != 0) {
        return;
    }

    if (numberTemp != "")
        calculArray.push(Number(numberTemp));
        if (checkDivisionZero() == true) {
            return errorMessage();
        } else {
            displayHistoric();
            checkDivisionZero();
        }

    if (lastOfArray(calculArray) == "+" || lastOfArray(calculArray) == "-" || lastOfArray(calculArray) == "*" || lastOfArray(calculArray) == "/") {
        calculArray.pop();
        displayHistoric();
    }

    while (calculArray.includes('*') || calculArray.includes('/')) {
        const index = calculArray.findIndex(element => element == '*' || element == '/');
        const intermediateResult = operate(calculArray[index], calculArray[index - 1], calculArray[index + 1]);
        calculArray.splice(index - 1, 3, intermediateResult);
    }
    while (calculArray.includes('+') || calculArray.includes('-')) {
        const index = calculArray.findIndex(element => element == '+' || element == '-');
        const intermediateResult = operate(calculArray[index], calculArray[index - 1], calculArray[index + 1]);
        calculArray.splice(index - 1, 3, intermediateResult);
    }
    result = calculArray[0];
    calculArray = [];
    numberTemp = "";
    displayResult();
}
//--------------------------------------------------
function clear() {
    calculArray = [];
    numberTemp = "";
    result = 0;
    typingScreen_div.innerHTML = "";
    historic_div.innerHTML = "Begin your calculation";
}
//--------------------------------------------------
function cancelTyping() {
    numberTemp = numberTemp.slice(0, numberTemp.length - 1);
    displayTyping(numberTemp);
}
//--------------------------------------------------
function switchSign() {
    if (result != 0) {
        result = result * -1;
        displayResult();
    }
    else if (numberTemp != 0) {
        numberTemp = numberTemp * -1;
        displayTyping(numberTemp);
    }
}
//--------------------------------------------------
function main() {
    window.addEventListener("keydown", checkKeyPress, true);
    function checkKeyPress(key) {
        if (key.shiftKey == true) {
            switch (key.keyCode) {
                case 187: getPlus(); break;
                case 51: getMultiply(); break;
                case 191: getDivide(); break;
                case 48: equal(); break;
            }
        }
        else {
            switch (key.keyCode) {
                case 48:
                case 96: getNumber("0"); break;
                case 49:
                case 97: getNumber("1"); break;
                case 50:
                case 98: getNumber("2"); break;
                case 51:
                case 99: getNumber("3"); break;
                case 52:
                case 100: getNumber("4"); break;
                case 53:
                case 101: getNumber("5"); break;
                case 54:
                case 102: getNumber("6"); break;
                case 54:
                case 103: getNumber("7"); break;
                case 55:
                case 104: getNumber("8"); break;
                case 56:
                case 105: getNumber("9"); break;
                case 107: getPlus(); break;
                case 109:
                case 189: getSubstract(); break;
                case 106: getMultiply(); break;
                case 111: getDivide(); break;
                case 13:
                case 187: equal(); break;
                case 46: clear(); break;
                case 8:
                case 12: cancelTyping(); break;
                case 190: getDot(); break;
            }
        }
    }
    zero_button.addEventListener("click", function () {
        getNumber("0");
    })
    one_button.addEventListener("click", function () {
        getNumber("1");
    })
    two_button.addEventListener("click", function () {
        getNumber("2");
    })
    three_button.addEventListener("click", function () {
        getNumber("3");
    })
    four_button.addEventListener("click", function () {
        getNumber("4");
    })
    five_button.addEventListener("click", function () {
        getNumber("5");
    })
    six_button.addEventListener("click", function () {
        getNumber("6");
    })
    seven_button.addEventListener("click", function () {
        getNumber("7");
    })
    eight_button.addEventListener("click", function () {
        getNumber("8");
    })
    nine_button.addEventListener("click", function () {
        getNumber("9");
    })
    dot_button.addEventListener("click", function () {
        getDot();
    })

    plus_button.addEventListener("click", function () {
        getPlus();
    })
    minus_button.addEventListener("click", function () {
        getSubstract();
    })
    multiply_button.addEventListener("click", function () {
        getMultiply();
    })
    divide_button.addEventListener("click", function () {
        getDivide();
    })
    equal_button.addEventListener("click", function () {
        equal();
    })
    clear_button.addEventListener("click", function () {
        clear();
    })
    delete_button.addEventListener("click", function () {
        cancelTyping();
    })
    switchSign_button.addEventListener("click", function () {
        switchSign();
    })
}