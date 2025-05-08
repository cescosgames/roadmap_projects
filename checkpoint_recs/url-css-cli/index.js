#!/user/bin/env node
// shebang up top

import { Command } from 'commander'; // switching to es6 modules imports
const program = new Command(); // create a new program instance using commander

import * as cheerio from 'cheerio'; // using cheerio which allows us to parse and manipulate html

// an example 'webpage' to parse
// const $ = cheerio.load('<h2 class="title">Hello world</h2>');


// set up our program
program
    .name('url + css text-content selector')
    .description('NodeJS roadmap checkpoint project')
    .version('0.0.0')


// our main function
program
    .command('find') // define the new command
    .description('This functions finds and prints the text content of an elemnt that matches the selector on a website') // give the new command a description
    .requiredOption('-u, --url <url>', 'target url') // our required option of URL
    .requiredOption('-c, --css <css>', 'target css') // our required option of CSS 
    .action(async (options) => { // needs to be async because fetching website
        const { url, css } = options; // get our url and css target
        
        try {
            // fetch our url
            const res = await fetch(url);
            // check if the response is ok
            if(!res.ok) {
                throw new Error(`Error status: ${res.status}`);
            }
            // get html content
            const html = await res.text(); // .text method retruns a string with the entire body as text

            // load it into cheerio
            const $ = cheerio.load(html);

            // check that it exists
            if($(css).length < 1) {
                console.log('no elements found with that css selector')
            } else {
                // log it!
                console.log($(css).text());
            }

        } catch (error) {
            console.log('Error', error.message);
        };
    });




program.parse(process.argv);