// to normalize our cost input to real life numbers
function normalizeCost(input) {
    const num = parseFloat(input);
    
    // check if number works here
    if(num == null || num === '') { // check that something is inputted
        throw new Error('Number is required');
    } else if(Number.isNaN(num)) { // check that it is a number
        throw new Error('Did not enter a valid number');
    } else if(num < 0) { // check that it's not negative
        throw new Error('Number must be positive');
    }

    return num.toFixed(2); // format to 2 decimal places
}
// to normalize our month input
function intToMonth(int) {
    const months = [ // months array to pick from
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return months[int] || "Invalid month"; // Handle invalid inputs gracefully
}

module.exports = { normalizeCost, intToMonth }