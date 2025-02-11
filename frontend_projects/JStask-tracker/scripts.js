// the main button
const enterButton = document.getElementById('enterButt');

// the list holder
const taskHolder = document.getElementById('taskHolder');

// the input field
const taskInput = document.getElementById('taskInput');

// the tasks array, storing our objects with 2 properties, description and status
const tasks = [
    // { description: "Test Task 1", status: "checked"},
    // { description: "Test Task 1", status: ""},
];

// our task element interior html, sort of like a component
const exampleTaskHTML = `
    <button class="checkBox"></button>
    <p class="taskText">Example Text</p>
    <button class="trashButt"></button>
    <hr>
`;


// creating our add task function: goal to add our task to our array first, then call renderTasks to add to our task holder
function addTask() {
    // first get the input, and remove all whitespace characters from the input using .trim()
    const taskInputText = taskInput.value.trim();

    // then check that the input has value
    if (taskInputText === '') {
        // if it's empty, set it back to empty and return
        taskInput.value = '';
        return
    } else { // if it does have value, push it to our array
        // new correct approach: push our task description and status to our array using .push
        tasks.push({ description:taskInputText, status:""});
    }

    // lastly, render our tasks and reset our input field
    renderTasks();
    taskInput.value = '';
}


// creating our render tasks function which will visually add the tasks to our task holder
function renderTasks() {
    // first remove all tasks 
    taskHolder.innerHTML = "";

    // then, sort our array to then re-render. sort can take a comparison function to determine how to sort. We can use a 'truthy' check on our status to sort by 'checked'
    tasks.sort((a,b) => {
        // truthy equates to a boolean, in our case the empty string is 'false' and our 'checked' returns true or 'truthy'
        // this comparison function is saying a negative value should come before b while a postiive value should come after b
        // the below ternary is saying if our status is 'checked' (truthy), then the result is 1 and it should come after b. If the result is '' (falsy) then it should before
        return a.status ? 1 : -1;
    });

    // now that we have re-ordered by check, re-render from our array, for each task in our array
    tasks.forEach((task, index) => {
        // first create our holder div (example task + the checked class if checked or nothing if not)
        let exampleTaskDiv = document.createElement("div");
        exampleTaskDiv.className = `exampleTask ${task.status}`; // adding our exampleTask class name and our taskStatus (for checked)

        // set our inner html to our 'component' from the top of the page. this is just our styled checklist item
        exampleTaskDiv.innerHTML = exampleTaskHTML;

        // add the correct text by selecting the 'taskText' class first
        const taskTextClass = exampleTaskDiv.querySelector(".taskText");
        // then set it equal to it's description, assigned in the array earlier from our input field value when we pushed it to our array
        taskTextClass.textContent = task.description;

        // make sure to add the checkbox and delete box functionality by selecting them and adding 'click' event listeners
        const checkButt = exampleTaskDiv.querySelector(".checkBox");
        const deleteButt = exampleTaskDiv.querySelector(".trashButt");
        checkButt.addEventListener("click", () => checkTask(index));
        deleteButt.addEventListener("click", () => deleteTask(index));

        // finally, append all the tasks to our task holder to visually display them to the user
        taskHolder.appendChild(exampleTaskDiv);

        // for testing purposes
        // console.log('rendered tasks');
    })
}


// the functions that add functionality to our check and delete box
// our checkbox, takes the item index as an argument
function checkTask(index) {
    // toggling our status using a ternary, if checked, then none, else checked
    tasks[index].status = tasks[index].status === "checked" ? "" : "checked";
    // then re-render our tasks
    renderTasks();
}
// our delete box, takes the item index as an argument
function deleteTask(index) {
    // use splice function to delete a task
    tasks.splice(index, 1); // splice removes x elements (in this case 1) starting at index
    renderTasks(); // then re-render
}


// the button functions, adding functionality to button clicking and pressing enter while in input field
enterButton.addEventListener('click', addTask); // this allows our enter button to be clicked and add a task
taskInput.addEventListener('keypress', function (event) { // this allows us to listen for the enter key press while interacting with the input field
    // if the event keypress on our taskInput field equals the enter key
    if (event.key === 'Enter') {
        // add our task
        addTask();
    }
});

