# Weather API (backend)

This is a weather API backend project from [roadmap.sh Weather API](https://roadmap.sh/projects/weather-api-wrapper-service). This project has a very basic frontend that
uses our backend routes to fetch weather data from visual crossing API. It also uses a local instance of redis for caching information, avoiding unncessary API calls.
<br>
<br>

## How it was made:

**Tech used:** 
- expressJS for framework 
- axios for fetch requests
- dotenv for loading environment variables
- express-rate-limit for limiting amount of requests (1 per minute current testing setup)
- redis npm for nodejs redis functionality
- HTML, CSS, and JS for frontend functionality
- redis cli for running redis

## Demo Images
<br> Basic UI to use the API <br>
<img width="559" alt="Screenshot 2025-05-29 at 11 23 27" src="https://github.com/user-attachments/assets/a474de0a-5ead-4ac4-a83e-7786986eb654" />
<br> Command line demonstrating initial call to API, then second call to Redis cache<br>
<img width="376" alt="Screenshot 2025-05-29 at 11 23 44" src="https://github.com/user-attachments/assets/3a6e0f75-62a2-43f8-8e7d-ebe58e8c023e" />

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
6. to make things quicker you can copy this env file with your information
```
PORT = your-port
VC_WEATHER_KEY = your-key
REDIS_PORT = your-redis-port
```

## Features:

Following the project guidelines, this project features...
1. working with third party APIs
2. using environment variables
3. caching with redis
4. rate limiting requests

## Lessons Learned:
Great introduction to the importance and implementation of caching information using a database like redis. Felt daunting at first but when you get into it it's really 
quite straightforward. The rough outline below and comments throughout the project should cover most questions and the process. 

## The rough outline (so far)

1. initialize server.js with express and set up public routes to serve frontend (install express)
2. now that we have a basic UI, set up, set up the routes (api/weather and 404) and environemnt variables (install .env)
3. create an axios fetch request in our router (that we will later move to its own controller) dont forget api key in the env! (install axios)
4. now test the flow from frontend request to backend request to returning the weather (frontend GET to backend route, backend delegate to router, router process request and return to frontend)
5. with the flow set up properly, set up rate limiting using express-rate-limit documentation (intall express rate limit - it's super straightforward!)
6. Last step was setting up redis locally which is easier than you think. Once redis is set up locally, it's just a matter of connecting to it and acessing/writing your information to your local redis cache
