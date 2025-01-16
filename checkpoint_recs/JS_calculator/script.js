const inputBox = document.getElementById("input-box") // another way to find items, by ID
const listContainer = document.getElementById("list-container")

// adding our todos to our list
function addToDo() {
    // catch an empty submission
    if (inputBox.value === '') { // if our input box has an empty string in it
        alert("no task selected") // send an alert
    }
    else { // if our input box has a string in it
        let li = document.createElement("li") // creating a 'li' dynamically
        li.innerHTML = inputBox.value // we can add html directly like this! innerhtml is whats inside li
        listContainer.appendChild(li) // then we can add our li to our ul by appending it as child

        // adding an option to delete dynamically
        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; // this is the cross icon
        li.appendChild(span); // adding our cross to our li
    }

    // clear the input box after adding
    inputBox.value = "";
    saveList() // and save our new list
}

// adding event listener to our clicking
listContainer.addEventListener("click", function(event){ // function that takes our event object in
    if (event.target.tagName === "LI") { // finds our target by tagName
        event.target.classList.toggle("checked"); // toggles the class
        saveList() // save our new list
    }
    else if (event.target.tagName === "SPAN") { // finds our target by tagName
        event.target.parentElement.remove(); // removes the span's parent (list item) when clicked
        saveList() // save our new list
    }
}, false) // manually setting false (to remind me that it's the default)


document.addEventListener('keydown', function(event) { // making enter work to sbumit addToDo
    if(document.activeElement === inputBox && event.key == "Enter") { // check if input box is focused
        addToDo();
    }
});


// saving our information for repeat visits
function saveList() {
    localStorage.setItem("data", listContainer.innerHTML); // save our listContainers html (aka the list)
}

function showList() {
    listContainer.innerHTML = localStorage.getItem("data");
}


// calling it to test on page load
showList()