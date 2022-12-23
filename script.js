const number = document.querySelector(".calculator-input");
const container = document.querySelector(".calculator-bottom-container");

let numberValue = "0";
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;
updateNumberValue();
function updateNumberValue() {
    number.value = numberValue;
}
function changebtn(){
    console.log("text");
    numberValue = numberValue * (-1);
}

container.addEventListener('click', function (e) {
    const element = e.target;
    if (!element.matches('button')) return;
    if (element.classList.contains('operator')) {
        // console.log('operator', element.value);
        handleOperator(element.value);
        updateNumberValue();

        return;
    }
    if (element.classList.contains('decimal')) {
        //console.log('decimal', element.value);
        inputDecimal();
        updateNumberValue();
        return;
    }
    if (element.classList.contains('clear')) {
        // console.log('clear', element.value);
        clear();
        updateNumberValue();
        return;
    }
    if(element.classList.contains('change')){
        changebtn();
        updateNumberValue();
        return;
    }
    inputNumber(element.value);
    updateNumberValue();
});

function handleOperator(nextoperator) {
    const value = parseFloat(numberValue);
    if(operator && waitingForSecondValue){
        operator = nextoperator;
        return;
    }
    if (firstValue == null) {
        firstValue = value;
    }else if(operator){
        const result = calculate(firstValue, value, operator);

        numberValue = `${parseFloat(result.toFixed(6))}`; 
        firstValue = result;
    }

    waitingForSecondValue = true;
    operator = nextoperator;
    console.log(numberValue, firstValue, operator, waitingForSecondValue);
}

function inputNumber(num) {
    if (waitingForSecondValue) {
        numberValue = num;
        waitingForSecondValue = false;
    } else {
        numberValue = numberValue === '0' ? num : numberValue + num;
    }
    console.log(numberValue, firstValue, operator, waitingForSecondValue);
}
function inputDecimal() {
    if (!numberValue.includes(',')) {
        numberValue += ',';
    }
}
function clear() {
    numberValue = '0';
}
function calculate (first, second, operator){
    if(operator == '+'){
        return first + second;
    }else if(operator == '-'){
        return first - second;
    }else if(operator == '*'){
        return first * second;
    }else if(operator == '/'){
        return first / second;
    }
    return second;
}


// ÇARŞAMBA GECESİ CHANGE  BUTONU İLE SAYIYI POZİTİF YA DA NEGATİF YAPMAYI ÖĞRENCEKSİN