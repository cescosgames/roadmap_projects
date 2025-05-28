# Weather API (backend)

This is a weather API backend project from [roadmap.sh Weather API](https://roadmap.sh/projects/weather-api-wrapper-service). This project has a very basic frontend that
uses our backend routes to fetch weather data from visual crossing API. *NOTE* this project was supposed to implement Redis caching, but it is not currently fully implemented.
This is due to issues on installation of Redis locally, but theoretically, the Redis caching should work following my notes in redisCache.js which connects to our
weather controller which handles our backend calls.
<br>
<br>

## How it was made:

**Tech used:** 
- expressJS for framework 
- axios for fetch requests
- dotenv for loading environment variables
- express-rate-limit for limiting amount of requests (1 per minute current testing setup)
- redis for nodejs redis functionality
- HTML, CSS, and JS for frontend functionality

## How To Run The Project

1. Download the files onto your local environment or copy this repo and navigate into the folder you downloaded them into
```
cd weather-api
```
2. Open in your preferred IDE and install dependencies
```
npm install
```
3. In your integrated terminal, call npm run dev
```
npm run dev
```
4. Make sure to connect and have Redis running locally, or just use without Redis caching your call
5. In your browser, navigate to local host 5173 or create a new .env file to store desired port and enter your city in the basic UI

## Features:

Following the project guidelines, this project features...
1. working with third party APIs
2. using environment variables
3. caching (sorta...)
4. rate limiting requests

## Lessons Learned:
Since this project isn't yet fully completed until I install and test Redis, I will replace this section with an outline of my approach instead so a future attempt can
use my approach or a new approach to tackle this project. You can also see various notes throughout the project on my approach and how it was made.

## The rough outline (so far)

1. initialize server.js with express and set up public routes to serve frontend (install express)
2. now that we have a basic UI, set up, set up the routes (api/weather and 404) and environemnt variables (install .env)
3. create an axios fetch request in our router (that we will later move to its own controller) dont forget api key in the env! (install axios)
4. now test the flow from frontend request to backend request to returning the weather (frontend GET to backend route, backend delegate to router, router process request and return to frontend)
5. with the flow set up properly, set up rate limiting using express-rate-limit documentation (intall express rate limit - it's super straightforward!)
6. *NOTE* I am unable to test Redis at the moment but in theory, redisCache.js should fetch and cache information correctly. It is currently not hooked up, but would connect to the weather controller.js following the comments in the files
