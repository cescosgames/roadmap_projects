# CLI image file path compressor (backend)

Another project from the node js CLI checkpoint, this time compressing all the images in a directory.
<br>
<br>

## How it was made:

**Tech used:** 
- CommanderJS, fs, path, Sharp

## How To Run The Project

1. Download the files onto your local environment, and navigate into the folder you downloaded them into
2. Open in your preferred IDE 
3. In your integrated terminal, call node index.js (or if using nodemon, npx nodemon index.js)
```
node index.js compress -i /your/filepath/
```

## Review
Another good challenge, I haven't worked with file manipulation before, but Sharp made the process
incredibly simple. Usual setup using commander with one main program that takes a directory as an argument.
Then we scan the directory, ensure there are images we can compress (stuck to jpg, jpeg, and png for now),
and then we compress them using Sharp.resize({ quality : x }). 
<br>
<br>
After finishing this project using a foreach loop, I realized that sharp and image compression use async
processes which makes sense since I should 'wait' for compression to be done before moving on. This sync version
does work however which is the reason I didn't change the program to async before uploading. I did experiment
a bit and might upload that version later.
<br>
<br>
Like the other checkpoint projects, these are more bite-sized and have lots of room for improvement. Like I 
stated above, converting the main program to be async would be a good idea since this version is prone to
errors. Overall though another fun checkpoint challenge to get some reps in CLI tools.
