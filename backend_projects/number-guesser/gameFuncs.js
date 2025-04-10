// function to get a random number, range is inclusive!
function getRandomInt(min, max) { 
    min = Math.ceil(min); // returning the smallest integer that is greater than or equal to min i.e. 3.14 returns 4, 5 returns 5
    max = Math.floor(max); // inverse of ciel, returns the largest integer that is less than or equal to max i.e. 5.95 returns 5, 4 returns 4
    return Math.floor(Math.random() * (max - min + 1)) + min; // using floor (see above) on a random float between 0 and 1 that is then...
    // ...multiplied by our range size (max-min+1). This scales our 0-1 to fit our min-max range, then we add our min to shift the range to start at our min
};


// function to guide answer
function giveGuidance(guess, answer) {
    if(guess < answer) {
        console.log(`Incorrect, the answer is greater than ${guess}`);
    } else if (guess > answer) {
        console.log(`Incorrect, the answer is less than ${guess}`);
    }
}


module.exports = { getRandomInt, giveGuidance };