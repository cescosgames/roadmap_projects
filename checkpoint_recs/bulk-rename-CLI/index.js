#!/user/bin/env node
// shebang up top

// commander for parsing
import { Command } from 'commander'; // switching to es6 modules imports
const program = new Command(); // create a new program instance using commander

// fs and path for file navigation
import fs from 'fs';
import path from 'path';

// set up our program
program
    .name('Bulk Rename')
    .description('NodeJS roadmap checkpoint project')
    .version('0.0.0')


// our main function
program
    .command('rename') // define the new command
    .description('Takes in a directory path and renames the files inside') // give the new command a description
    .requiredOption('-n, --newname <newname>', 'new file name') // our required new file name
    .requiredOption('-i, --inputPath <inputPath>', 'file directory') // our required file directory
    .action((options) => { 
        const { newname, inputPath } = options; // get our name and our full path

        // use readdir to read the files in a directory
        fs.readdir(inputPath, (error, files) => { // this returns an array of the files in the directory
            // if we have an error, i.e. directory doesn't exist
            if(error) {
                console.error('Error scanning directory', error); // throw the error
                return;
            }

            // otherwise, loop through our files array (returned by readdir)
            files.forEach((file, index) => {
                // need the full file paths in order to rename
                const oldPath = path.join(inputPath,file)
                const newPath = path.join(inputPath, `${newname}${index}${path.extname(file)}`) // don't forget to add the index to ensure files don't get deleted!
                // const newExtPath = path.join(inputPath, `${newname}${index}.css`) // practicing changing extension type
                
                fs.rename(oldPath, newPath, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            })

            console.log('Succesfully renamed files!');
        })
    });




program.parse(process.argv);