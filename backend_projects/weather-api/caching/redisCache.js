// // moving our fetching requests here so we can load from our api OR our cache, if the data already exists

// // THIS ISN'T IMPLEMENTED, THIS IS THEORETICAL FOR NOW BUT SHOULD WORK
// // the idea is...
// // when you make a fetch request, first check the cache
// // if it's in the cache, deliver that instead
// // if it isn't, load from api but save to cache using SETEX and set expiration time
// // and boom that's it! the hold up is I haven't installed redis yet on my local system lol

// import axios from 'axios';
// import redis from 'redis';

// // load our variables
// const REDIS_PORT = process.env.REDIS_PORT || 6379;

// // create our redis client locally
// const redisClient = redis.createClient({
//     url: `redis://localhost:${REDIS_PORT}` 
// });

// // immediately invoke connecting to our redisClient
// (async () => {
//     try {
//         await redisClient.connect();
//         console.log("redis connected");
//     } catch (error) {
//         console.error("failed to connect to redis:", error);
//     }
// })();

// // function for fetching weather data from the api
// const fetchWeatherAPI = async (city) => {
//     // get api key and URL
//     const apiKey = `api-key-here`; 
//     const apiUrl = `api-url-here`;
//     // try catch to get info from the api
//     try {
//         const response = await axios.get(apiUrl);
//         return response.data;
//     } catch (error) {
//         console.error("error fetching weather data from API:", error);
//     }
// };

// // function for fetching weather data from cache
// const fetchWeatherCache = async (city) => {
//     // like above, but this time we are trying to fetch from our cache
//     try {
//         const cachedData = await redisClient.get(city);
//         return cachedData ? JSON.parse(cachedData) : null; // if cached data exists, return the json parse else return null
//     } catch (error) {
//         console.error("error retrieving data from Redis cache:", error);
//         throw new Error("Weather API fetch failed");
//     }
// };

// // function for saving weather data to cache
// const saveWeatherCache = async (city, weatherData) => {
//     try {
//         await redisClient.set(city, JSON.stringify(weatherData), 'EX', 3600);  // set our key, value, expiration, and time
//     } catch (error) {
//         console.error("Error saving data to Redis cache:", error);
//     }
// };

// // the main function that gets weather either from the cache OR the api
// const getWeatherRedis = async (city) => {
//     try {
//         // first check if it exists
//         const cachedData = await fetchWeatherCache(city);
//         // if it exists
//         if (cachedData) {
//             console.log(`data for ${city} fetched from Redis cache.`);
//             return cachedData.data;
//         };
//         // if the data doesn't exist, call the api
//         const weatherData = await fetchWeatherAPI(city);
//         // save the information to our redis
//         await saveWeatherCache(city, weatherData);
//         console.log(`saved ${city} weather to Redis cache.`);
//         return weatherData;
//     } catch (error) {
//         console.log("Unable to get weather data:", error);
//     }
// };

// export { getWeatherRedis };