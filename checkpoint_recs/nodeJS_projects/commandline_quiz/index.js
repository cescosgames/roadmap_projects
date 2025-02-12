#!/usr/bin/env node
// our shebang up top, always include these in CLI apps you intend for others to be able to use. It tells the OS to execute the code

// we are using packages as modules, so don't forget to change our package type to module in our package.json!
import chalk from "chalk";
import inquirer from "inquirer";
import gradient, { rainbow } from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

// note! to export this package, all we have to do is add "bin": "./entrypoint" (in this case, ./index.js) under our scripts in our package.json
// then npm login, login, and npm publish to deploy it to the world.
// to run this, you can run locally with node index or can run off the machine by...
// installing globally and typing quiz into your command line. The quiz call was added below our scripts in our package.json and links to this index js file
// or you can run using npx 'nameOfApp' (in this case, secondnodejsapp)

// our playername variable
let playerName;

// helper function that takes a millisecond argument and creates and returns a promise with a timeout
// this is basically a timer that pauses the code and when the ms times out, resolves a promise and allows the code to continue
const sleep = (ms = 1000) => new Promise((resolver) => setTimeout(resolver,ms));

// our async function to 'welcome' the player
async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow (
        'Quiz Game \n'
    );

    // allowing our timer to play for default seconds (2)
    await sleep();

    // using chalkanimation to stop our chalkanimation
    rainbowTitle.stop();

    // using template literal console log to give instructions with player name. Also gives us line breaks without \n
    console.log(`
        ${chalk.bgBlue('RULES')}
        Welcome ${playerName}
        Answer the question correctly
        One mistake and game over
    `)
}

// asking for name first, again using await outside of async function to get information before proceeding. blocking behavior
await askName();
// using await outside of an async function 
await welcome();
// ask the question
await question1();
// ask the second question
await question2();
// if we've made it this far, display the winner
await winFunction();

// using inquirer to give a user options. We can give the data a name, a type (how it's collected), a message and a default input. Lots more can be done here see inquirer
async function askName() {
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'What is your name?',
        default() {
            return 'Player';
        },
    });

    // setting our variable equal to the users answer/input
    playerName = answers.player_name;
}

// using inquirer to make multiple choice questions using type list
async function question1() {
    const answers = await inquirer.prompt({
        name: 'question-1',
        type: 'list',
        message: 'What year is 1990?',
        choices: [
            '1991',
            '1995',
            '1990',
            '2001',
        ],
    });

    // returning a bool, if it equals 1990 return true, else, false
    return handleAnswer(answers["question-1"] == '1990');
}

// using inquirer to make multiple choice questions using type list
async function question2() {
    const answers = await inquirer.prompt({
        name: 'question-2',
        type: 'list',
        message: 'What day is Monday?',
        choices: [
            'Monday',
            'Tuesday',
            'Friday',
            'Sunday',
        ],
    });

    // returning a bool, if it equals 1990 return true, else, false
    return handleAnswer(answers["question-2"] == 'Monday');
}

// creating a loading spinner function that takes a bool as input. Using nanospinner for visual spinner
async function handleAnswer(isCorrect) {
    // using createSpinner from nanoSpinner
    const spinner = createSpinner('Checking Answer...').start();
    // out 2 second pause
    await sleep();

    // if it's true
    if (isCorrect) {
        // success stops the spinning and replaces with a check mark character
        spinner.success({ text: `Correct, good work ${playerName}`});
    } else {
        // error stops spinning and replaces symbol with cross character to indicate error, probably misusing here, but visually fun
        spinner.error({ text: `Game over, try again next time ${playerName}`});
        // process.exit quits the script. It takes 0 or 1 as input with 0 exiting with a success code while 1 exists with a failure code
        process.exit(0);
    }
}

// creating a game over function
function winFunction() {
    // clear the console
    console.clear();
    // write the success message
    const gameoverMessage = `Congrats ${playerName}, you've won!`;

    // using figlet to convert text into ascii art and gradient string package to add gradient color
    figlet(gameoverMessage, (err,data) => {
        console.log(gradient.pastel.multiline(data));
    });
}