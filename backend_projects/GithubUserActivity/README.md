# GitHub User Activity CLI

This is a CLI GitHub Activity Fetcher based on the [roadmap.sh backend Task Tracker project](https://roadmap.sh/projects/github-user-activity). This small CLI app allows
you to input someones GitHub username and receive back their 30 most recent activities.
<br>
<br>

## How it was made:

**Tech used:** 
- This was all done using Vanilla JS in the Node.js environment + the GitHub API for fetching users information.

## Visual Examples
<br> Example demonstrating using the activity fetcher <br>

![ghFetch](https://github.com/user-attachments/assets/37d3fa51-f833-469c-bc3e-e651ae3890c0)

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
ghFetch
```

## Features:

Following the project guidelines, this project features...
1. Accept github username as argument
2. Fetch the users recent activity using the github API and display the information in the terminal
3. Handle errors gracefully using try catch and other error checks
4. No external libraries or frameworks used

## Lessons Learned:


