const fs = require('fs'); // use fs to manage our expenses.json file
const path = require('path') // use path to manage path to our expenses.json
const { normalizeCost, intToMonth } = require('./normalizeFuncs'); // get our normalizing functions (month, cost, etc.)


// set up our expenses.json
const expensesPath = path.join(__dirname, "expenses.json"); // get the path relative to this directory

// need to be able to load our expenses, load these when needed
function loadExpenses() {
    if(fs.existsSync(expensesPath)) {
        const data = fs.readFileSync(expensesPath, 'utf-8'); // if the path exists, read the file 
        return JSON.parse(data); // and return the json file information
    } else {
        console.log('No previous expense history found, instantiating new expense sheet');
        const emptyArray = [] // empty array so we can return it immediately 
        fs.writeFileSync(expensesPath, JSON.stringify(emptyArray)); // write the empty array to our path
        return emptyArray; // return our empty array
    }
}

// need to be able to save our expenses, save when needed (after modifying)
function saveExpenses(expenseArray) {
    // try catch to account for errors like running out of storage
    try {
        fs.writeFileSync(expensesPath, JSON.stringify(expenseArray, null, 2), 'utf-8'); // stringify our expense array default formatting 2 spacing
    } catch (error) {
        console.error('Error saving expenses: ', error.message, ' closing program');
        process.exit(0);
    }
}

// need to be able to add expenses (cost, description, category)
function addExpense(descrip, cost, category) {
    const expenseSheet = loadExpenses(); // return our data to be able to then modify it

    const normalizedCost = normalizeCost(cost);
    const monthInt = new Date(Date.now()).getMonth() // get the month (0 = january 11 = december)
    const normalizedMonth = intToMonth(monthInt);
    
    const newExpense = {
        id: (expenseSheet.length + 1), // id is index +1 i.e. first expense is 1
        cost: normalizedCost,
        description: descrip,
        category: category,
        month: normalizedMonth,
    }

    console.log(`Added ${newExpense.description} to expense sheet`);

    expenseSheet.push(newExpense); // add our new expense

    saveExpenses(expenseSheet); // save our sheet
}

// update a past expense
function updateExpense(id, newCost) {
    const allExpenses = loadExpenses();

    const expenseToUpdate = allExpenses[parseInt(id - 1)]; // our ID is index + 1 

    if(!expenseToUpdate) {
        // if it doesn't exist
        console.log(`Expense Number ${id} doesn't exist`);
        return;
    }

    console.log(`Updated cost of ${allExpenses[parseInt(id-1)].description} to ${newCost}`);

    expenseToUpdate.cost = newCost;

    saveExpenses(allExpenses);
}

// delete an expense, like update 
function deleteExpense(id) {
    const allExpenses = loadExpenses();

    const expenseToDelete = allExpenses[parseInt(id - 1)]; // remember, ID is index + 1

    if(!expenseToDelete) {
        console.log(`Expense Number ${id} doesn't exist`);
        return;
    }

    console.log(`Deleted ${allExpenses[parseInt(id-1)].description} and saved $${allExpenses[parseInt(id-1)].cost}`);

    const updatedExpenses = allExpenses.filter(expense => expense.id !== parseInt(id));

    updatedExpenses.forEach((expense, index) => {
        expense.id = (index + 1); // udpate our index after removing
    });

    saveExpenses(updatedExpenses);
}


// test to view expenses, currently not filtering
function viewExpenses(filter, monthNum, category) {
    const allExpenses = loadExpenses(); // load our expenses

    const normalizedFilter = filter.toLowerCase(); 

    if(normalizedFilter === 'all' || normalizedFilter === 'a' || normalizedFilter === '') {
        // format with dollar sign by creating a new array from our allExpenses
        const formattedCosts = allExpenses.map(item => ({ 
            ...item, cost: `$${item.cost}` // use spread operator to copy all properties, then change cost property by adding $ sign in front
        }));

        console.table(formattedCosts);
        summarizeExpenses();
    } else if (normalizedFilter === 'month' || normalizedFilter === 'm') { // list and summarize by month
        const months = [ // months array to pick from
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        const monthlyCosts = allExpenses.filter(expense => expense.month === months[monthNum-1]);

        const justMonthlyCosts = monthlyCosts.filter(expense => expense.cost);
        const monthlyCostSummary = justMonthlyCosts.reduce((total, expense) => total + Number(expense.cost), 0);

        const formattedCosts = monthlyCosts.map(item => ({ 
            ...item, cost: `$${item.cost}` // use spread operator to copy all properties, then change cost property by adding $ sign in front
        }));

        console.table(formattedCosts);

        console.log(`Total spend in $${months[monthNum-1]} is ${monthlyCostSummary}`);
    } else if (normalizedFilter === 'category' || normalizedFilter === 'c') { // list and summarize by category
        const categories = allExpenses.filter(expense => expense.category === category);
        if(categories.length <= 0) {
            console.log(`No matches for expenses in ${category}.`);
            return;
        }
        const formattedCosts = categories.map(item => ({
            ...item, cost: `$${item.cost}`
        }));
        
        console.table(formattedCosts);
    }
    
}

// summarize expenses 
function summarizeExpenses(monthID) {

    if(!monthID) {
        const allExpenses = loadExpenses();

        const justCosts = allExpenses.filter(expense => expense.cost);

        const costSummary = justCosts.reduce((total, expense) => total + Number(expense.cost), 0); // parse to number so it doesn't confuse for string
        // don't forget how to use reduce! remmeber, array.reduce((accumulator, current value, current index, array) => { logic }, initial value);
        // accumulator = accumulated value returned after each iteration
        // index and arry are optional same as initial value

        console.log(`Total spend so far is $${costSummary}`);
    } else {
        const allExpenses = loadExpenses();
        const months = [ // months array to pick from
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        const monthlyCosts = allExpenses.filter(expense => expense.month === months[monthID-1]);

        const justMonthlyCosts = monthlyCosts.filter(expense => expense.cost);
        const monthlyCostSummary = justMonthlyCosts.reduce((total, expense) => total + Number(expense.cost), 0);

        console.log(`Total spend in $${months[monthID-1]} is ${monthlyCostSummary}`);
    }
}

// clear all 
function clearAll() {
    console.log('Deleted All Expenses');
    const allExpenses = loadExpenses();
    allExpenses.length = 0;
    saveExpenses(allExpenses);
}

// exporting to convert our JSON to csv format
function saveJSONToCSV(data) {
    const headers = Object.keys(data[0]).join(','); // extracting the headers, keys of the first object become the column headers i.e. id, descrip, cost, month
    const rows = data.map(item => Object.values(item).join(',')).join('\n'); // mapping each item to a csv row and joining with a new line
    // this joins each item into a comma separated string using join(',') i.e. ['taco', '4.99','food'] and then line separated using join('\n')

    return `${headers}\n${rows}`; // returns headers then line break -> each row (already line broken from before in our rows array)
}
// function to export our converted JSON as csv file
function writeToCSV() {
    const allExpenses = loadExpenses(); // get our data
    const csvData = saveJSONToCSV(allExpenses); // convert it using the above function
    const filePath = 'expenses.csv'; // declare the filepath, remember defaults to using current working directory if no other is declared
    fs.writeFileSync(filePath, csvData, 'utf-8'); // write our file to our file path with utf8 encoding
    console.log(`saved data as csv in ${filePath}`); // tell 'em we saved it
}


// // example exporting a function to be called in index
// function helloworld(userName) {
//     console.log(`Hello, ${userName}!`);
// };

// export our functions
module.exports = { addExpense, viewExpenses, clearAll, updateExpense, deleteExpense, summarizeExpenses, writeToCSV }