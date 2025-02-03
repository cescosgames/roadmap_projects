import { DateTime } from '/node_modules/luxon/build/es6/luxon.js';
// remember, if not packaging, use es6 module import

// connecting the button and text to modify
const calcButt = document.getElementById("calcDate");
const inputField = document.getElementById("birthDate");
const resultText = document.getElementById("resultText");
const errorMessage = document.getElementById("errorMessage");
const errorText = document.getElementById("errorText");

// variables to check and change in order to verify dates
let month = '';
// our final date
let inputYear = '';
let inputMonth = '';
let inputDay = '';


// once our document is loaded...
document.addEventListener("DOMContentLoaded", (event) => {
    // add our functions to our input field and button
    addFuncToCalcButton();
    addFuncToInput();
})


// the button functions
function addFuncToCalcButton() {
    // have it disable on start since we don't have a valid date and we don't want to let users input anything
    calcButt.disabled = true;
    // add our event on click
    calcButt.addEventListener('click', () => {
        // get the current date
        const dt = DateTime.now(); 

        // get our bithday for validation by parsing the relevant ints from our text input
        const validObjectDate = DateTime.fromObject({year:parseInt(inputYear), month:parseInt(inputMonth), day:Math.floor(parseInt(inputDay))});

        // if our birthday date is valid...
        if (validObjectDate.isValid) {
            // get our birthday date time
            const birthday = DateTime.local(parseInt(inputYear), parseInt(inputMonth), parseInt(inputDay)); // see luxon documentation for format
            
            // alright good reminder here to THOROUGHLY read the documentation... I was coming up with all sorts of crazy solutions when diff existed the whole time.
            // use diff to get a date object that accounts for the duration between our current time (dt) and our birthday 
            const age = dt.diff(birthday, ['years', 'months', 'days']).toObject();
            // diff returns a duration object, converting it to an object pluralizes the property names

            // now that we have returned our object, display it in the way we want too
            resultText.innerHTML = `You are <b>${age.years} years ${age.months} months & ${Math.floor(age.days)} days </b> old`;
        }
        else {
            // if our birthday date is not valid, add an error and log the explanation
            console.log(validObjectDate.isValid);
            console.log(validObjectDate.invalidExplanation);
            addError(3);
        }
    })
}

// adding our functions to our input field
function addFuncToInput() {
    // 1. make sure our input only takes in numbers and adds dashes at the correct points
    inputField.addEventListener('input', (event) => {
        // get the current value (i.e. how many digits in our input field)
        let inputValue = event.target.value;

        // remove non-digit characters
        let numericValue = inputValue.replace(/\D/g, ''); // this is new to me, did not know that was the notation

        // format our numeric value into mm/dd/yyy now
        // get our formatted value string, empty to start
        let formattedValue = '';

        // now set the breakpoints manually
        if (numericValue.length <= 2) { // if we only have dd
            // no dashes needed
            formattedValue = numericValue;
            // whenever you see this, it's because we want to reset or keep our button unclickable until we have a valid date
            calcButt.disabled = true;
            // remove the error if we are back at the start of entering our date
            removeError();

            // if we have exactly 2 numbers, check if they're valid (between 1-12 inclusive)
            if (numericValue.length === 2) {
                if (checkIfValidMonth(parseInt(numericValue))) {
                    removeError();
                }
                else {
                    addError(0);
                }
            }
            else {
                // removeError();
            }
            
        }
        else if (numericValue.length <= 4) {
            // dash after 0 to 2 (exclusive, so 0 and 1 of the string), add a '/', and get whatever starts at 2 and continues to end of string
            formattedValue = numericValue.slice(0,2) + '/' + numericValue.slice(2,4);

            if (numericValue.length === 4) {
                if (checkIfValidMonthDay(parseInt(numericValue.slice(0,2)), parseInt(numericValue.slice(2,4)))){
                    removeError();
                }
                else {
                    addError(1);
                }
            }
            else {
                // removeError();
            }
        }
        else {
            // else, we have our mmddyyy
            formattedValue = numericValue.slice(0,2) + '/' + numericValue.slice(2,4) + '/' + numericValue.slice(4,8);

            // check if we have our whole date (10 inputs)
            if (formattedValue.length === 10) {
                inputYear = numericValue.slice(4,8);
                inputMonth = numericValue.slice(0,2);
                inputDay = numericValue.slice(2,4);
                calcButt.disabled = false;
            }
            else {
                calcButt.disabled = true;
                // removeError();
            }
        }

        // set the value equal to our replaced value
        event.target.value = formattedValue;
    })
}

// visual feedback to the user on what the error was
function addError(index) {
    if (index === 0) {
        errorText.innerText = "Invalid Month entered. Please confirm correct month.";
        errorMessage.classList.add("errorActive");
        inputField.classList.add("invalid");
    }
    else if (index === 1) {
        errorText.innerText = "Invalid Day entered. Please confirm correct day.";
        errorMessage.classList.add("errorActive");
        inputField.classList.add("invalid");
    }
    else {
        errorText.innerText = "Invalid Format entered. Please confirm correct date.";
        errorMessage.classList.add("errorActive");
        inputField.classList.add("invalid");
    }
}

function removeError() {
    errorText.innerText = "Please enter a valid date";
    errorMessage.classList.remove("errorActive");
    inputField.classList.remove("invalid");
}

// simple if 1 to 12 (inclusive) it it's valid otherwise it's not
function checkIfValidMonth(month) {
    return month >= 1 && month <= 12;
}

// checking month day combo with default year
function checkIfValidMonthDay(month, day) {
    const date = DateTime.fromObject({year:1999, month, day});
    return date.isValid;
}