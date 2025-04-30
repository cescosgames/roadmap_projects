// converter.js

// can add more conversions as desired, just keeping it simple for now

// temp conversion functions
function celsiusToFahrenheit(celsius) {
    return (celsius * 9) / 5 + 32;
  }
  
  function fahrenheitToCelsius(fahrenheit) {
    return ((fahrenheit - 32) * 5) / 9;
  }
  
  // length conversion functions
  function kilometersToMiles(kilometers) {
    return kilometers * 0.621371;
  }
  
  function milesToKilometers(miles) {
    return miles / 0.621371;
  }
  
  // weight conversion functions
  function kilogramsToPounds(kilograms) {
    return kilograms * 2.20462;
  }
  
  function poundsToKilograms(pounds) {
    return pounds / 2.20462;
  }
  
  // export em functions
  module.exports = {
    celsiusToFahrenheit,
    fahrenheitToCelsius,
    kilometersToMiles,
    milesToKilometers,
    kilogramsToPounds,
    poundsToKilograms,
  };
  