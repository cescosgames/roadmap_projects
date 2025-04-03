#!/usr/bin/env node
// Don't forget shebang to make this executable

// using require syntax again
const readline = require('readline'); // readline for user input
const fs = require('fs'); // (f)ile(s)ystem for handling files like our JSON task list
const path = require('path'); // path to handle pathing to our JSON task list

// declare our filepath to find out tasks.json if it exists, or create it here if it doesn't
const taskPath = path.join(__dirname, "tasks.json") // looks something like "./current_directory/tasks.json"

// creating our readline interface using built in readline.createInterface()
const rl = readline.createInterface({
    input: process.stdin, // this refers to standard input stream
    output: process.stdout, // this refers to standard output stream
}) // basically, this creates an object that can read user input and write output, see the askForCommand function in section 4!


// -------------------------------------
// Section 1: Loading and saving       |
// - loadTasks and saveTasks functions |
// -------------------------------------

// this handles the loading of our JSON file, either creating if it doesn't exit or reading if it does
function loadTasks() {
    if (fs.existsSync(taskPath)) { // if our file path exists,
        const data = fs.readFileSync(taskPath, 'utf8'); // using sync to block until loaded - remember encoding as second argument
        return JSON.parse(data); // return the json file information
    } else {
        console.log('No previous tasks found, instantiating new task list!')
        const emptyArray = []; // 
        fs.writeFileSync(taskPath, JSON.stringify(emptyArray)); // otherwise, write an empty json file to our path
        return emptyArray; // return our array immediately so our function has an immediate value to work with
    }
}

// this handles saving our tasks to our JSON file, takes our task list as an argument
function saveTasks(taskArray) {
    // wrapping in a try catch in case something goes wrong with the save (i.e. out of storage)
    try {
        fs.writeFileSync(taskPath, JSON.stringify(taskArray, null, 2), 'utf8'); // writing our input to our JSON using stringify
        // remember, stringify takes 3 arguments, what you want to stringify, the formatting you want, and the spacing
    } catch (error) {
        console.error('Error saving: ', error, ' Closing program');
        process.exit(0); // quitting the program
    }
}


// -------------------------------------
// Section 2: Displaying our tasks     |
// - displayTasks function             |
// -------------------------------------

// our function to display our tasks, taking in user filter as argument to display todo, in-progress, done
function displayTasks(userFilter) {
    let allTasks = loadTasks(); // load our array to be modified

    const filter = userFilter.toLowerCase().trim(); // clean up our user filter

    if (allTasks.length <= 0) { // if we have no tasks to display, don't display
        console.log('No tasks to display yet!')
        return;
    }

    if(filter === '' || filter === 'all') { // default, show all
        console.table(allTasks);
    } else if (filter === 'todo') { // filter for todo
        const filteredTasks = allTasks.filter(task => task.status === 'todo'); // filter for each task if the status === 'todo'
        if (filteredTasks.length <= 0) {
            console.log('No tasks marked todo!');
            return;
        }
        console.table(filteredTasks);
    } else if (filter === 'in-progress' || filter === 'in progress') { // filter for in-progress
        const filteredTasks = allTasks.filter(task => task.status === 'in-progress'); // filter for each task if the status === 'in-progress'
        if (filteredTasks.length <= 0) {
            console.log('No tasks marked in-progress!');
            return;
        }
        console.table(filteredTasks);
    } else if (filter === 'done') { // filter for complete
        const filteredTasks = allTasks.filter(task => task.status === 'done'); // filter for each task if the status === 'done'
        if (filteredTasks.length <= 0) {
            console.log('No tasks marked done!');
            return;
        }
        console.table(filteredTasks);
    } else { // in case it didn't work
        console.log('Error listing tasks: Please try again with list all, list todo, list in-progress or list done');
    }
}


// --------------------------------------------------------
// Section 3: Adding, removing, and updating our tasks    |
// - addTask, deleteTask, updateTask functions            |
// --------------------------------------------------------

// function to add a task to our json list
function addTask(description) {
    const allTasks = loadTasks(); // load our tasks
    // create a new task object
    const newTask = {
        id: (allTasks.length + 1), // ID is the index basically + 1
        description: description,
        status: 'todo',
        dateCreated: new Date(Date.now()).toLocaleDateString('en-US'), // update the last updated time using localeDateString - returns mm/dd/yyy
        dateUpdated: new Date(Date.now()).toLocaleDateString('en-US'), // update the last updated time using localeDateString - returns mm/dd/yyy
    }

    console.log(`Added ${newTask.description} to task list!`)

    allTasks.push(newTask); // add our new task to all our tasks

    saveTasks(allTasks); // save our updated array
}

// function to delete a task in our json list
function deleteTask(ID) {
    const allTasks = loadTasks(); // load our tasks

    const taskToDelete = allTasks[parseInt(ID - 1)]; // get our task to delete and check if it exists
    if (!taskToDelete) {
        console.log(`Task number ${ID} doesn't exist!`);
        return;
    }

    console.log(`Deleted ${allTasks[parseInt(ID-1)].description} from task list!`) // use parse int since ID is passed as a string

    const updatedTasks = allTasks.filter(task => task.id !== parseInt(ID)); // filter out our deleted task

    updatedTasks.forEach((task, index) => {
        task.id = (index + 1) // update our ID's to match correctly their order
    });

    saveTasks(updatedTasks); // save our updated array
}

// function to mark in progress
function updateTask(ID) {
    const allTasks = loadTasks(); // load up our tasks

    const taskToUpdate = allTasks[parseInt(ID - 1)]; // get our task to update and check if it exists
    if (!taskToUpdate) {
        console.log(`Task number ${ID} doesn't exist!`);
        return;
    }

    console.log(`Marked ${allTasks[parseInt(ID-1)].description} as in-progress!`) // use parse int since ID is passed as a string

    taskToUpdate.status = 'in-progress'; // update the status
    taskToUpdate.dateUpdated = new Date(Date.now()).toLocaleDateString('en-US'); // update the last updated time using localeDateString - returns mm/dd/yyy

    saveTasks(allTasks); // save our updated array
}

// function to mark complete
function completeTask(ID) {
    const allTasks = loadTasks(); // load up our tasks

    const taskToUpdate = allTasks[parseInt(ID - 1)]; // get our task to update and check if it exists
    if (!taskToUpdate) {
        console.log(`Task number ${ID} doesn't exist!`);
        return;
    }

    console.log(`Marked ${allTasks[parseInt(ID-1)].description} as done!`) // use parse int since ID is passed as a string

    taskToUpdate.status = 'done'; // update the status
    taskToUpdate.dateUpdated = new Date(Date.now()).toLocaleDateString('en-US'); // update the last updated time using localeDateString - returns mm/dd/yyy

    saveTasks(allTasks); // save our updated array
}


// -------------------------------------------------------------------
// Section 4: Utility functions: Clear All, Help, and Run Program!   |
// - askForCommand, askForHelp, clearAll, and start                  |
// -------------------------------------------------------------------

// our main 'loop' function to get user input, runs the whole program basically
function askForCommand() {
    rl.question('Enter a command: ', (userInput) => {
        let cleanInput = userInput.toLowerCase().trim() // clean up the user input for splitting purposes
        let inputArray = cleanInput.split(' '); // split all the words into an array
        let command = inputArray[0]; // get the first word
        let description = inputArray.slice(1).join(' '); // get every word after the first 

        // wait for user input to quit or continue
        if (command === 'exit' || command === 'quit' || command === 'q') {
            // if quit, message and close
            console.log('View this entire project on github @cescosgames/roadmap_projects folder')
            console.log('Closing program, have a good day!')
            rl.close();
            process.exit(0); // quitting the program
        } else if (command === 'list' || command == 'l') {
            displayTasks(description);
            askForCommand();
        } else if (command === 'add' || command === 'a') {
            addTask(description);
            askForCommand();
        } else if (command === 'delete' || command === 'd') {
            deleteTask(description);
            askForCommand();
        } else if (command === 'update' || command === 'u') {
            updateTask(description)
            askForCommand();
        } else if (command === 'complete' || command === 'finish' || command === 'done' || command == 'f') {
            completeTask(description);
            askForCommand();
        } else if (command === 'help' || command === 'h') {
            askForHelp();
            askForCommand();
        } else if (command === 'clear' || command === 'c') {
            clearAll();
            askForCommand();
        } else {
            // otherwise continue looking for user input
            console.log('Sorry I did not understand that command, type help or h for a list of all commands!')
            askForCommand();
        }
    })
}

// our helper function
function askForHelp() {
    // simple, just returns a list of commands
    console.log(`Here is a list of functions you can use:`)
    console.log(`- type 'list' followed by 'all', 'todo', 'in-progress', or 'done' to see sorted tasks`)
    console.log(`- type 'add' followed by your task to add your task to the list`);
    console.log(`- type 'delete' followed by the task ID that you wish to delete to remove your task from the list`);
    console.log(`- type 'update' or 'finish' followed by the task ID to mark that task as in-progress or finished`);
    console.log(`- type 'clear' to delete every task from your list`);
    console.log(`- type exit or quit to exit the program`);
    console.log(`NOTE: check for typos! All commands can also be called with the first letter of said command. Task ID's are assigned on order, they change when a task is removed!`);
}

// our clear all function
function clearAll() {
    console.log('Deleted all tasks'); // user feedback
    const allTasks = loadTasks(); // load up our tasks
    allTasks.length = 0; // clear them all by setting length to 0, I think this is the fasted way in terms of performance of deleting an array?
    saveTasks(allTasks); // save our updated list
}

// our start function, called on start
function start() {
    // simple, just an introduction
    console.log('Welcome to Task-Tracker-CLI by Cesco, project from roadmap.sh');
    console.log('enter help or h for a list of commands!');
}








start();
loadTasks();
askForCommand();