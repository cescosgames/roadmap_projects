import express from 'express'; // import express
import path from 'path'; // path to connect our dirname
import { fileURLToPath } from 'url'; // import fileURLtoPath to use __dirname in modules
import { rateLimit } from 'express-rate-limit'; // using rate limit to limit amount of rate requests with middleware limiter, from express-rate-limit docs

// import our env variables using dotenv package
import dotenv from 'dotenv';
dotenv.config();

// load our environment variables
const port = process.env.PORT || 5173; // load our port from .env or default to 5173

// import our routes
import fetchWeather from './routes/fetchWeather.js'

// initialize express
const app = express();

// get the directory name to load static folder path
const __filename = fileURLToPath(import.meta.url); // gives ur our file URL, just like filename in commonJS
const __dirname = path.dirname(__filename); // pass in our file name to get our dirname

// our limiter middleware, from the express-rate-limit documentation, 'usage' - this is all you need! super simple
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // disable the `X-RateLimit-*` headers
	message: { error: 'You have exceeded the rate limit. Try again in a minute.' }, // error message
});

// use our middleware just for our weather route
app.use('/api/weather', limiter);

// set up static folder path for frontend
app.use(express.static(path.join(__dirname, 'public'))); // remember, __dirname doesn't work with es modules!

// routes go here
app.use('/api/weather', fetchWeather)

// 404 for undefined routes
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// using vites port, set in the .env 
app.listen(port, () => console.log(`Server started on port ${port}`));
