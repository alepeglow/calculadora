const inputNumber = document.getElementById('input-number');
const gridItem = document.querySelectorAll('.grid-item');
const historyBtn = document.getElementById('history');

let currentValue = '';
let storedValue = '';
let currentOperation = '';
let resultHitory = [];


let savedStorageResulthitory = (value) => {
    try {

        resultHitory.push(value)

   

        if (resultHitory.length > 2){
            resultHitory.shift();
        }
    
       
            localStorage.setItem("historyValue", resultHitory[0]);
        
    }catch(error){
        console.log("Erro ao salvar no localStorage:", error)
    }
}



function updateDisplay(value){
    inputNumber.value = value || '0'
}

function clearAll(){
    resultHitory = []
    localStorage.removeItem('historyValue')
    currentValue= ''
    storedValue = ''
    currentOperation = ''
    updateDisplay('0')
}


function calculateResult() {
  
    const num1 = parseFloat(storedValue);
    const num2 = parseFloat(currentValue);


    if (isNaN(num1) || isNaN(num2)) return;

    let result;
    switch (currentOperation) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "×":
            result = num1 * num2;
            break;
        case "÷":
            result = num2 !== 0 ? num1 / num2 : "Erro";
            break;
        default:
            return;
    }


    currentValue = result.toString()

    savedStorageResulthitory(result)
    currentOperation = "";
    storedValue = "";
    updateDisplay(currentValue);
}

function handleButtonClick(event){
    const buttonValue = event.target.id;

    if (buttonValue === "c"){
        clearAll()
        return
    }

    if(["+", "-", "×", "÷"].includes(buttonValue)){
        if (currentValue){
            if (storedValue){
                calculeteResult()
            }

            storedValue = currentValue

           currentValue = '';

           currentOperation = buttonValue;
        }
        return
    }
    // ! = not , || -> or , && => and - e

    if (!isNaN(buttonValue) || buttonValue == ".") {
        if (buttonValue === "." && currentValue.includes('.')) return;
        currentValue += buttonValue
        updateDisplay(currentValue)
    }

    if (buttonValue === "=") {
        calculateResult();
        return;
    }

    if (buttonValue === "%") {
        currentValue = (parseFloat(currentValue) / 100).toString();
        updateDisplay(currentValue);
        return;
    }
}



gridItem.forEach((item) => {
    item.addEventListener('click', handleButtonClick );
});

historyBtn.addEventListener('click', () => {
    
        const saved = localStorage.getItem('historyValue');
        console.log(saved)
        updateDisplay(saved)
});

updateDisplay();