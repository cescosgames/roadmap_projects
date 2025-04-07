#!/usr/bin/env node
// Don't forget shebang to make this executable!

// need to get user input, will use readline again
const readline = require('readline');

// create the readline interface using .createInterface
const rl = readline.createInterface({
    input: process.stdin, // don't forget, stdin refers to our standard input stream
    output: process.stdout, // and this refers to our standard output stream
})

// prompt for a username 
async function askForUsername() {
    // ask the question and await for the user input with an async callback
    rl.question('Enter valid GitHub Username: ', async (userInput) => {

        // console.log(`User entered: ${userInput}`); // test if we got correct input
        
        const userActivity = await fetchUserActivity(userInput); // await the data returned from our fetchUserActivity function

        displayInformation(userActivity);  // display after receiving!

        process.exit(0); // exit with success
    })
}


// funtion to fetch the username from github
async function fetchUserActivity(userName) {
    try {
        const response = await fetch(`https://api.github.com/users/${userName}/events`); // fetch from our events link

        if (!response.ok || response.redirected) { // check if the response is NOT ok or redirected
            throw new Error(`Failed to fetch data: ${response.status}`); // if it's a bad response, throw a new error
        }

        const data = await response.json(); // get the response in JSON

        console.log('fetching data...');
        return data;

    } catch (error) {
        console.log(`Error Information: ${error}`); // log the error info
        process.exit(1); // exit with error
    } 
}

// function to display the information we want from our data
function displayInformation(data) {
    // check if we have any data from the user
    if (data.length <= 0) { // if we don't return the function
        console.log('This user has no recent activity!');
        return;
    }

    // if we do, translate the type into human understandable - all types taken from github api docs
    data.forEach((action) => {
        if (action.type  === 'CommitCommentEvent') {
            console.log(`- Commit Comment activity in ${action.repo.name}`);
        } else if (action.type  === 'CreateEvent') {
            console.log(`- Create activity in ${action.repo.name}`);
        } else if (action.type  === 'DeleteEvent') {
            console.log(`- Delete in ${action.repo.name}`);
        } else if (action.type  === 'ForkEvent') {
            console.log(`- Fork activity in ${action.repo.name}`);
        } else if (action.type  === 'GollumEvent') {
            console.log(`- Gollum activity in ${action.repo.name}`);
        } else if (action.type  === 'IssueCommentEvent') {
            console.log(`- Issue Comment activity in ${action.repo.name}`);
        } else if (action.type  === 'IssuesEvent') {
            console.log(`- Issues activity in ${action.repo.name}`);
        } else if (action.type  === 'MemberEvent') {
            console.log(`- Member activity in ${action.repo.name}`);
        } else if (action.type  === 'PublicEvent') {
            console.log(`- Public activity in ${action.repo.name}`);
        } else if (action.type  === 'PullRequestEvent') {
            console.log(`- Pull Request activity in ${action.repo.name}`);
        } else if (action.type  === 'PullRequestReviewEvent') {
            console.log(`- Pull Request Review activity in ${action.repo.name}`);
        } else if (action.type  === 'PullRequestReviewCommentEvent') {
            console.log(`- Pull Request Review Comment activity in ${action.repo.name}`);
        } else if (action.type  === 'PullRequestReviewThreadEvent') {
            console.log(`- Pull Request Review Thread activity in ${action.repo.name}`);
        } else if (action.type  === 'PushEvent') {
            console.log(`- Push activity in ${action.repo.name}`);
        } else if (action.type  === 'ReleaseEvent') {
            console.log(`- Release activity in ${action.repo.name}`);
        } else if (action.type  === 'SponsorshipEvent') {
            console.log(`- Sponsorship activity in ${action.repo.name}`);
        } else if (action.type  === 'WatchEvent') {
            console.log(`- Watch activity in ${action.repo.name}`);
        } else if (action.type  === 'PushEvent') {
            console.log(`- Push activity in ${action.repo.name}`);
        } else {
            console.log(`- Unrecognized activity in ${action.repo.name}`);
        }
    }) 

}



askForUsername();