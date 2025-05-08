# CLI Most starred project in date window (backend)

Another quick project from the node js checkpoint where we needed to create an application that takes a start date and an end date to return the most starred 
github project in that timeframe.
<br>
<br>

## How it was made:

**Tech used:** 
- CommanderJS for input

## How To Run The Project

1. Download the files onto your local environment, and navigate into the folder you downloaded them into
2. Open in your preferred IDE and install all necessary packages
3. In your integrated terminal, call node index.js (or if using nodemon, npx nodemon index.js)
```
node index.js -s 'YYYY-MM-DD' -e 'YYYY-MM-DD'
```

## Review
Another small practice project. Similar to many past projects, fetching from a specific API endpoint. Definitely could be improved, I have very limited date validation
(only regex for 'YYYY-MM-DD' check) and did not want to import any date libraries to further enhance date error validation. Solid practice, on to the next CLI checkpoint
