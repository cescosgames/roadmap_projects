const tempInput = document.getElementById('tempInput');
const fromUnit = document.getElementById('fromUnit');
const toUnit = document.getElementById('toUnit');
const convertButt = document.getElementById('convertButton');
const outcomeText = document.getElementById('outcomeText');

// activating or deactivating our button depending on input fields
function checkInputs() {
    // if all our inputs are valid. Note: tempInput.value returns true or false based on the input field input type (in this case, number), so if it's not a number it will return false
    if(tempInput.value && (fromUnit.value != 'none') && (toUnit.value != 'none')) {
        convertButt.classList.remove('deactivated');
    } else {
        // if we don't, add deactivate to our button and hide our outcome text if it's already visible
        convertButt.classList.add('deactivated');
        outcomeText.classList.add('hidden');
    }
}

// our main convert function, attached to the button
function convertTemp() {
    // will return the number in our input field
    let temperature = tempInput.value;
    // will return the selected value from the first slot
    let firstUnit = fromUnit.value;
    // will return the selected value from the second slot
    let secondUnit = toUnit.value;
    // final value
    let finalTemp = '';

    // check if we are converting the same unit and if we are just return the function
    if (firstUnit === secondUnit) {
        finalTemp = temperature;
        outcomeText.textContent = `Please Select Different Units`;
        outcomeText.classList.remove('hidden');
        return;
    }

    // if we aren't, figure out what we are converting from and to and add the appropriate function
    if(firstUnit === 'Celsius') {
        if(secondUnit === 'Fahrenheit') {
            finalTemp = convertCtoF(temperature);
        }
        else if (secondUnit === 'Kelvin') {
            finalTemp = convertCtoK(temperature);
        }
        else {
            console.log('add more conversions later');
        }
    } else if (firstUnit === 'Fahrenheit') {
        if(secondUnit === 'Celsius') {
            finalTemp = convertFtoC(temperature);
        }
        else if(secondUnit === 'Kelvin') {
            finalTemp = convertFtoK(temperature);
        }
        else {
            console.log('add more conversions later');
        }
    } else if (firstUnit === 'Kelvin') {
        if(secondUnit === 'Fahrenheit') {
            finalTemp = convertKtoF(temperature);
        }
        else if (secondUnit === 'Celsius') {
            finalTemp = convertKtoC(temperature);
        }
        else {
            console.log('add more conversions later');
        }
    } else {
        console.log('add more conversions later');
    }

    // finally display the result
    displayResult(temperature, finalTemp, firstUnit, secondUnit);
}

// our mini convert functions
function convertFtoC(input) {
    return ((input - 32) * (5/9));
}
function convertCtoF(input) {
    return ((input * (9/5) + 32));
}
function convertKtoF(input) {
    return ((input - 273.15) * (9/5) + 32);
}
function convertKtoC(input) {
    return (input - 273.15);
}
function convertCtoK(input) {
    return (input + 273.15);
}
function convertFtoK(input) {
    return ((input - 32) * (5/9) + 273.15);
}

// our result function
function displayResult(initTemp, finalTemp, from, to) {
    // round the result
    let roundedResult = (Math.round(finalTemp*100)/100).toFixed(2);

    // if it's kelvin, remove the degree sign
    if (from === 'Kelvin') {
        outcomeText.textContent = `${initTemp} ${from} is equivalent to ${roundedResult}\u00B0 ${to}`;
    }
    else if (to === 'Kelvin') {
        outcomeText.textContent = `${initTemp}\u00B0 ${from} is equivalent to ${roundedResult} ${to}`;
    }
    else {
        outcomeText.textContent = `${initTemp}\u00B0 ${from} is equivalent to ${roundedResult}\u00B0 ${to}`;
    }
    outcomeText.classList.remove('hidden');
}

// add our check input function to our input field
tempInput.addEventListener('input', function(event) {
    // was causing issues with . and .. and other such things, decided to scrap it in favor of just validating if number returns true
    // let tempValue = event.target.value;
    // // event.target.value = tempValue.substr(0,5);
    // event.target.value = tempValue;

    checkInputs();
});