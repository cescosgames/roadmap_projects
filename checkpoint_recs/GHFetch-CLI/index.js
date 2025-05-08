#!/user/bin/env node
// shebang up top

import { Command } from 'commander'; // switching to es6 modules imports
const program = new Command(); // create a new program instance using commander

// set up our program
program
    .name('Find popular project in date range')
    .description('This CLI app takes two dates and prints the most starred Github projects in between those dates')
    .version('0.0.0')


// our main function
program
    .command('search') // define the new command
    .description('This functions finds the most starred Github project in a date range') // give the new command a description
    .requiredOption('-s, --start <start>', 'starting date') // our required option of URL
    .requiredOption('-e, --end <end>', 'ending date') // our required option of CSS 
    .action(async (options) => { // needs to be async because fetching GH api
        const { start, end } = options; // get our url and css target
        
        // // test options
        // let testStart = '2021-01-01';
        // let testEnd = '2021-12-31';

        // to compare with our users date input, make sure they input YYYY-MM-DD
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

        // use regex.text (bool) to see if our date format matches 
        if(!dateRegex.test(start) || !dateRegex.test(end)) {
            console.error('invalid date format, please enter as YYYY-MM-DD');
            return;
        }

        try {
            // fetch our api endpoint with start and end date, sorted by stars
            const res = await fetch(`https://api.github.com/search/repositories?q=created:${start}..${end}&sort=stars`);
            // get it in json
            const data = await res.json();

            // check if the response is ok
            if(!res.ok) {
                throw new Error(`Error status: ${res.status}`);
            }

            // check that it exists
            if(res.length < 1) {
                console.log('no elements found with that css selector')
            } else {
                // log it!
                console.log('The most starred project in this date range is:', data.items[0].name);
            }

        } catch (error) {
            console.log('Error', error.message);
        };
    });




program.parse(process.argv);