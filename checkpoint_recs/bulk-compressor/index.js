#!/user/bin/env node
// shebang up top

// commander for parsing
import { Command } from 'commander'; // switching to es6 modules imports
const program = new Command(); // create a new program instance using commander

// fs and path for file navigation
import fs from 'fs';
import path from 'path';

// sharp for image compression
import sharp from 'sharp';

// set up our program
program
    .name('Bulk Img Compressor')
    .description('NodeJS roadmap checkpoint project')
    .version('0.0.0')


// our main function
program
    .command('compress') // define the new command
    .description('Takes in a directory path and compresses the jpg, jpeg, or png images inside') // give the new command a description
    .requiredOption('-i, --inputPath <inputPath>', 'file directory') // our required file directory
    .action((options) => { // this is the first synchronous version, should be improved as async since sharp is async but still works
        const { inputPath } = options; // get our path

        // use readdir to read the files in a directory
        fs.readdir(inputPath, (error, files) => { // this returns an array of the files in the directory
            // if we have an error, i.e. directory doesn't exist
            if(error) {
                console.error('Error scanning directory', error); // throw the error
                return;
            }

            // make sure we are working with images!
            const imageFiles = files.filter((file) => { // filter for images with the correct extension
                const extension = path.extname(file).toLowerCase(); // find the file name extension
                return ['.jpg', '.jpeg', '.png'].includes(extension); // sticking to popular image formats for our 'valid' array, returns true if a match, false if not
            });

            // then check that we have any images at all
            if(imageFiles.length < 1) { 
                console.log('no jpg, jpeg, or png images found in this directory');
                return;
            }

            imageFiles.forEach(image => { // for each image,
                const imagePath = path.join(inputPath, image); // get our full image path

                const { name, ext } = path.parse(image); // get our image name and extension using path.parse on our image

                const newPath = path.join(inputPath, `${name}_compressed${ext}`) // create the new path, using our previously saved oldname and extension

                sharp(imagePath).resize({ quality: 50 }).toFile(newPath); // override our image (actually use a different path for testing lol)
            });

            console.log('Succesfully compressed images!'); // this will call before all images are compressed
        })
    });




program.parse(process.argv);