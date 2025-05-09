# CLI bulk rename (backend)

Simple CLI app that takes in  a filepath and renames all the files inside that filepath with the new name. Can
also easily be modified to change file extension.
<br>
<br>

## How it was made:

**Tech used:** 
- CommanderJS, fs, path

## How To Run The Project

1. Download the files onto your local environment, and navigate into the folder you downloaded them into
2. Open in your preferred IDE 
3. In your integrated terminal, call node index.js (or if using nodemon, npx nodemon index.js)
```
node index.js rename -n 'new name' -i /your/filepath/
```

## Review
Similar setup to my other Commander CLI apps. Really feels like Commander is the best option with these projects.
Good practice using fs and path to read files in a directory and create/modify their paths to be able to 
use and modify them. Overall, a very simple program not much to elaborate on!
