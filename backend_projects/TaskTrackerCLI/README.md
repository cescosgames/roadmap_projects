# Task Tracker CLI

This is a CLI task tracker based on the [roadmap.sh backend Task Tracker project](https://roadmap.sh/projects/task-tracker). This small CLI application provides
functions that allow you to add tasks, remove tasks, display tasks, update tasks, etc. All information on how to use this tracker can be found by running the 
tracker and typing 'help' or 'h'!
<br>
<br>

## How it was made:

**Tech used:** 
- This was all done using Vanilla JS in Node.js environment, no external libraries or packages involved - nothing fancy here

## Visual Examples
<br> Example demonstrating using the task tracker <br>

![usage gif](/taskTrackerCLIdemo.gif)

## How To Run The Project

1. Download the repo onto your local environment, and navigate into the folder you downloaded
2. Run in your code editor or run it from your terminal by calling (sudo if you need permission)
```
npm link 
OR
sudo npm link 
```
3. To remove the link
```
npm unlink -g
OR
sudo npm unlink -g
```
4. run from terminal by calling
```
taskTracker
```

## Features:

Following the project guidelines, this project features...
1. Storing tasks as a JSON file in current directory (created if non-existent)
2. Using fs to interact with the JSON file
3. Ability to add, update, delete tasks, mark a task as in progress or done, list all tasks and filter list all tasks by progress
4. No external libraries or frameworks used
5. Error checking

## Lessons Learned:

It's funny, this is actually the second attempt I think at trying this project. The first time I used external libraries (Luxon for time, inquirer for option selections) before
realizing the project asked for us to not use external libraries. And I'm glad it did, because doing this project twice helped me solidify some fundemental practice points such
as working with the filesystem and handling user inputs. The initial setup probably took the longest part; my approach was to 1. get user input by learning about readline and 2.
create/store/access/modify the JSON file using fs and path. Once that was done, the rest was mostly testing inputs and functions to make sure they accomplished what I intended.
The final hurdle was actually getting it off my ide to run in the 'real world'. I didn't want to publish this package, so I learned about link which allowed me to link this project
to my global node folder and run this project from the terminal. Very neat trick to know to test running programs like this!
<br><br>
Overall, a fun project. This was my first time working in this environment but hopefully everything works well and as intended! As always, thanks for checking this project out and
if you see anything wrong or that could be improved I would love to know so please reach out. You can find my thought process and approach to the project by opening the main
index.js file where I commented out my approach behind all my decisions. Thanks!
