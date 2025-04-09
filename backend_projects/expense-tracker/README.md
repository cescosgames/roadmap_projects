# Expense Tracker CLI

This is a CLI Expense Tracker based on the [roadmap.sh backend Task Tracker project](https://roadmap.sh/projects/expense-tracker). This small CLI app lets a user
track their expenses in their terminal with actions such as; adding expenses, viewing expenses, sorting expenses and more.
<br>
<br>

## How it was made:

**Tech used:** 
- The only external package used in this project was Commander.js

## Visual Examples
<br> Example demonstrating all functions available (using help command) <br>
<img width="699" alt="help-example" src="https://github.com/user-attachments/assets/94798800-23f9-41e7-a616-c69f002056b6" />
<br> Example in action <br>
<img width="895" alt="in-action" src="https://github.com/user-attachments/assets/763a5eaa-1399-47e9-bd33-619db765ac95" />

## How To Run The Project

1. Download the files onto your local environment, and navigate into the folder you downloaded them into
2. Run in your code editor or run it from your terminal by linking (sudo if you need permission)
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
expense-tracker

// example adding a $4.99 taco to our sheet in the food category
expense-tracker add -d taco -c 4.99 -g food

// example listing all our food items (filter by category, desired category is food)
expense-tracker list -f c -c food
```

## Features:

Following the project guidelines, this project features...
1. Users can add, update, delete, view, summarize, view summary by month their expenses to the sheet from the command line
2. Users can also sort by category and filter by category
3. Users can export their expenses to a CSV file in the working directory

## Lessons Learned:
Similar project to the task tracker but instead of using inquirer or readline, used commander which was probably my favorite tool used
so far in creating command line applications. Very powerful, very legible and comprehendible when looking at the code. Exportint to CSV
was new to me and was more straightforward than I expected! Satisfying project overall, feels like the commandline work is starting to 'click'.
