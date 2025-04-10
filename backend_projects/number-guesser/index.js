#!/usr/bin/env node

const readline = require('readline'); // using readline for user input
const { getRandomInt, giveGuidance } = require('./gameFuncs.js') // get some basic function from our gameFuncs file

// variables to determine game play
let difficultyString = 'easy'; // default is easy
let randAnswer = 0; // random integer
let minRange = 0; // set minimum range
let maxRange = 100; // set max range
let numGuess = 1; // tracking num of guesses
let guessesAllowed = 10;

const rl = readline.createInterface({ // creating our readline interface for user input
    input: process.stdin, // remember, standard input stream
    output: process.stdout, // and standard output stream
}); // and this object lets us read user input and output

// starting the game
function startGame() {
    rl.question('Please Select A Difficulty Level: \n1. easy \n2. medium \n3. hard\n', (userInput) => {
        let cleanInput = userInput.toLowerCase().trim(); // cleaning up user input to make it easier to handle

        // get our user input and interpret it
        if(cleanInput === '1' || cleanInput === 'easy') {
            difficultyString = 'easy';
            guessesAllowed = 10;
            console.log('Starting on easy! You will have 10 guesses')
        } else if(cleanInput === '2' || cleanInput === 'medium') {
            difficultyString = 'medium';
            guessesAllowed = 5;
            console.log('Starting on medium! You will have 5 guesses')
        } else if(cleanInput === '3' || cleanInput === 'hard') {
            difficultyString = 'hard';
            guessesAllowed = 3;
            console.log('Starting on hard! You will have 3 guesses')
        } else {
            console.log('---');
            console.log('I could not understand your input, please enter a number or the difficulty i.e. "1" or "easy"');
            startGame(); // restart this function if they don't get it
            return; // and return
        }

        numGuess = 1; // reset to first guess
        randAnswer = getRandomInt(minRange,maxRange); // get our answer
        // console.log(randAnswer); // if you want to see the answer beforehand
        console.log(`The number is between ${minRange} and ${maxRange}`);
        makeAGuess();
    });
};

// our guessing function
function makeAGuess() {
    rl.question(`Enter guess number: `, (userInput) => {
        let cleanInput = userInput.trim(); // cleaning up user input to make it easier to handle
    
        if(!Number.isInteger(parseInt(cleanInput))) { // check that they entered an integer
            console.log(`You did not enter an integer, please try again!`);
            makeAGuess();
            return;
        }

        if(parseInt(cleanInput) !== randAnswer) { // if they entered an integer, compare it to the answer
            giveGuidance(cleanInput, randAnswer); // tell them whether it's lower or higher
            numGuess += 1;
            if (numGuess < (guessesAllowed + 1)) { // increase number of guesses and check we still have guesses allowed
                makeAGuess();
            } else {
                console.log(`You used all your guesses! The answer was ${randAnswer}`); // if we run out, quit
                gameOver();
            }
        } else {
            console.log(`You guessed correctly in ${numGuess} guess(es)!`); // if we won start gameover process
            gameOver();
        }
    })
}

// function for handling game over
function gameOver() {
    rl.question('Would you like to play again? (Y/N):', (userInput) => {
        let cleanInput = userInput.toLowerCase().trim(); // cleaning up user input to make it easier to handle

        if(userInput === 'y' || userInput === 'yes') {
            console.log('Great! Restarting game');
            startGame();
        } else {
            console.log('Thanks for playing!');
            process.exit(0);
        }
    })
}

// welcome function explaining the game
function welcome() {
    console.log('Welcome to this CLI Number Guessing game! \nSelect a difficulty, and guess the correct number to win! \n');
    startGame();
}


welcome();