#!/usr/bin/env node
// shebang up top 
const { Command } = require('commander'); // require Commander to start using it
const program = new Command(); // create a new program instance
const { addExpense, viewExpenses, clearAll, updateExpense, deleteExpense, summarizeExpenses, writeToCSV } = require('./expenseFuncs'); // get our expense functions

// set name description and version of program
program
  .name('expense-tracker') // set the name
  .description('A simple CLI expense tracker, outline from roadmap.sh, made by Cesco') // add a quick description
  .version('1.0.0'); // set the version


// this was the Example function to demonstrate general setup and ensure everything was working, no longer being used
// program
//   .command('hello') // define the new command
//   .description('This function prints hello name') // give the new command a description
//   .argument('[userName]', 'Name of the user', 'world') // need to set up the argument like '<arg>' or '[arg]' if you want default and define it. add a default if desired
//   .action((userName) => { // give the new command an action and handle the argument in the callback
//     helloworld(userName);
//     });
  

// function add an expense
program
.command('add') // define the new command
.description('This function adds an expense. Takes cost, title, and category as arguments') // give the new command a description
.requiredOption('-d, --description <description>', 'Name of Expense') // required option! takes in --commmand <input> and no defeault since it's required
.requiredOption('-c, --cost <cost>', 'Cost Amount') // same as above
.option('-g, --category [category]', 'Expense Category', 'general') // general option, defaults to general if not entered
.action((options) => { 
    const { description, cost, category} = options; // set our options equal to what we need in order
    addExpense(description, cost, category); // then add in our expense
  });
// function to update an expense
program
.command('update') // define the new command
.description('This function updates an expense. Takes ID and new cost') // give the new command a description
.requiredOption('-i, --id <id>', 'Expense ID') // required option! takes in --commmand <input> and no defeault since it's required
.requiredOption('-c, --cost <cost>', 'Cost Amount') // same as above
.action((options) => { 
    const { id, cost} = options; // set our options equal to what we need in order
    updateExpense(id, cost); // then update in our expense
  });
// function to delete an expense
program
.command('delete') // define the new command
.description('This function deletes an expense. Takes ID') // give the new command a description
.requiredOption('-i, --id <id>', 'Expense ID') // required option! takes in --commmand <input> and no defeault since it's required
.action((options) => { 
    const { id } = options; // set our options equal to what we need in order
    deleteExpense(id); // then delete in our expense
  });
// function to summarize expenses
program
.command('summary') // define the new command
.description('This function returns the total cost of all expenses') // give the new command a description
.option('-m, --monthID [monthID]', 'Month to filter by', null) // default to null
.action((options) => { // give the new command an action and handle the argument in the callback
  const { monthID } = options;
  summarizeExpenses(monthID);
  });
// function to list expenses
program
.command('list') // define the new command
.description('This function lists the current expense sheet') // give the new command a description
.option('-f, --filter [filter]', 'Filter list by', 'all') // need to set up the argument like '<arg>' or '[arg]' if you want default and define it. add a default if desired
.option('-m, --monthNum [monthNum]', 'Month to filter by')
.option('-c, --category [category]', 'Category to filter by')
.action((options) => { // give the new command an action and handle the argument in the callback
  const { filter, monthNum, category } = options
  viewExpenses(filter, monthNum, category);
  });
// function to clear out entire expense json file
program
.command('clear') // define the new command
.description('This function clears all expenses') // give the new command a description
.action(() => { // give the new command an action and handle the argument in the callback
  clearAll();
  });
// function to export our expenses as CSV
program
.command('export') // define the new command
.description('This function exports data as a CSV') // give the new command a description
.action(() => { // give the new command an action and handle the argument in the callback
  writeToCSV();
  });
  


program.parse(process.argv); // Parse the arguments passed to the CLI
