const clickArea = document.getElementById('clickArea');
const selectedOption = document.getElementById('selectedOption');
const dropdownMenu = document.getElementById('dropdownMenu');
const downCaret = document.getElementById('downCaret');
const listOptions = document.querySelectorAll('.listOption');

let isOpen = false


document.addEventListener("DOMContentLoaded", (event) => {
    // adding the functionality here
    addDropDownFunction();
    addListOptionFunction();

    addOutsideClickFunc();
})


// test function below to close the menu if we click anywhere outside the document, I do not think this is the best approach
function addOutsideClickFunc() {
    document.addEventListener('click', (event) => {
        if(!clickArea.contains(event.target)) {
            if(isOpen) {
                closeDropDown();
            }
        }
    })
}


function addListOptionFunction() {
    listOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            selectedOption.innerText = option.innerText;
            removeAllSelected();
            option.classList.add('selectedOption');
            closeDropDown();
        })
    })
}


function removeAllSelected() {
    listOptions.forEach(option => {
        option.classList.remove('selectedOption');
    })
}

function addDropDownFunction() {
    clickArea.addEventListener('click', (event) => {
        toggleDropDown();
    })
}

function toggleDropDown() {
    if(isOpen == true) {
        closeDropDown();
    }
    else {
        openDropDown();
    }
}

function closeDropDown() {
    dropdownMenu.classList.remove('menuOpen');
    downCaret.classList.remove('rotate');
    isOpen = false;
}

function openDropDown() {
    dropdownMenu.classList.add('menuOpen');
    downCaret.classList.add('rotate');
    isOpen = true;
}