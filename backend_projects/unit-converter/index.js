// the goal is to create a simple web app that can convert between different units of measurement
// each conversion can be its own webpage with forms to input value and units to convert from/to
// submitting the form will submit the data to the current page and display the converted value
// not using express at the moment, doing it the classic way!

const http = require('http'); // get http to create our server
const { readFileSync, read } = require('fs'); // use readfile sync to read our index.html files

// the conversions equations stored in a separate js file
const converterJS = require('./converter');

// get all our pages
const homePage = readFileSync('./html/index.html');
const lengthPage = readFileSync('./html/length.html');
const weightPage = readFileSync('./html/weight.html');
const tempPage = readFileSync('./html/temperature.html');
// and our styles
const styles = readFileSync('./styles/styles.css');

// set up our server
const server = http.createServer((req, res) => {
    const url = req.url; // get the url

    // landing page
    if (url === '/') {
        res.writeHead(200, {'content-type' : 'text/html'}); // send back html for landing page
        res.write(homePage);
        res.end();
    } else if (url === '/length') { // length page
        res.writeHead(200, {'content-type' : 'text/html'}); // send back html for lenght page
        res.write(lengthPage);
        res.end();
    } else if (url === '/weight') { // weight page
        res.writeHead(200, {'content-type' : 'text/html'}); // send back html for weight page
        res.write(weightPage);
        res.end();
    } else if (url === '/temperature') { // temperature page
        res.writeHead(200, {'content-type' : 'text/html'}); // send back html for temp page
        res.write(tempPage);
        res.end();
    } else if (url === '/styles.css') { // our basic styling sheet
        res.writeHead(200, {'content-type' : 'text/css'}); // send back css for basic styling
        res.write(styles);
        res.end();
    } else if (req.method === 'POST' && req.url === '/submit') { // for all post aka form submission requests, call here
        // first we initialize an empty string for the body in order to store the incoming 'chunks' of data from the form submission
        let body = '';
        
        // then we listen for data events which are the pieces of data transferred in the stream
        req.on('data', chunk => {
            body += chunk.toString(); // add our chunks to our body as they come in i.e. the information on the submitted form
        });

        // once the stream is done and we recieved all the data, callback
        req.on('end',() => {
            const parsedData = new URLSearchParams(body); // this converts our data into key-value pairs from our form i.e. value = 'x'
            const amount = parseFloat(parsedData.get('value')); // access the value from our object
            const unitA = parsedData.get('unitA'); // accessing our from unit
            const unitB = parsedData.get('unitB'); // accessing our to unit
            const conversion = parsedData.get('conversionType'); // accessing our type
            let result = amount; // this will store final output

            // below here we find what we are converting and do our conversion logic
            // only having 2 units per conversion, keeping it simple, but can easily expand to more conversion types by altering logic here and adding more equations in converter.js
            if(conversion === 'length') {
                if(unitA === 'Kilometers' && unitA != unitB) {
                    result = converterJS.kilometersToMiles(amount);
                } else if (unitA === 'Miles' && unitA != unitB) {
                    result = converterJS.milesToKilometers(amount);
                } else {
                    result = amount;
                }
            } else if(conversion === 'weight') {
                if(unitA === 'Pounds' && unitA != unitB) {
                    result = converterJS.poundsToKilograms(amount);
                } else if (unitA === 'Kilograms' && unitA != unitB) {
                    result = converterJS.kilogramsToPounds(amount);
                } else {
                    result = amount;
                }
            } else if(conversion === 'temperature') {
                if(unitA === 'Celsius' && unitA != unitB) {
                    result = converterJS.celsiusToFahrenheit(amount);
                } else if (unitA === 'Fahrenheit' && unitA != unitB) {
                    result = converterJS.fahrenheitToCelsius(amount);
                } else {
                    result = amount;
                }
            } else {
                result = 'Error please try again';
            }

            // then write our page, wanted to try template injection but couldn't figure it out
            res.writeHead(200, { 'Content-Type': 'text/html'});
            res.write(`
                <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Conversion Result</title>
                        <link rel="stylesheet" href="styles.css">
                    </head>
                    <body>
                        <div class='wrapper'>
                            <h1>Converting ${conversion}</h1>
                            <div class='horizontal'>
                                <p>${amount} ${unitA} = ${result} ${unitB}</p>
                            </div>
                            <a href="/">Go Back</a>
                        </div>
                    </body>
                </html>
            `)
            res.end();
        })
        
    } else { // 404
        res.writeHead(404, {'content-type' : 'text/html'}); // send back html for landing page
        res.write('<h1>404 Page Not Found</h1>');
        res.end();
    }
});






// this was an earlier iteration, changing now for specific conversion cases
// else if (req.url === '/submit' && req.method === 'POST') { // handling form submissions, check for submit and post method
//     // also quick note: no data is saved even though we are 'submitting' to our 'server' (our computer) - it's transient since we aren't saving anything here
//         let body = ''; // body of the input submission field
//         req.on('data', chunk => { // .on is listening for each 'data' event and calls the callback function for every 'chunk' of data listened
//             body += chunk.toString(); // for each chunk, add it to our body
//             // since http request using streams, we recieve information in chunks and convert it to a string and add it to our body as it comes in
//         });
//         // process the end data, similar to above but listening for the 'end' of the stream before calling the callback
//         req.on('end', () => {
//             const parsedData = new URLSearchParams(body); // urlsearchparams parses query-like format 
//             // its built in and parses the common submission form format (name=john&otherdata=10)
//             const name = parsedData.get('length'); // .get on urlsearch params returns key-value pairs from the submission format

//             // then continue as normal
//             res.writeHead(200, { 'Content-Type' : 'text/html' });
//             res.end(`<h1>Thank you, ${name} for submitting!</h1>`);
//         });





// set up our server to listen below
server.listen(5173); // using vites port (5173)