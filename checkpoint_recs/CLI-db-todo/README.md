# Simple todo CLI app with PostgreSQL database (checkpoint)

This is a simple todo CLI app that connects to a local PostgreSQL database to store todo tasks
<br>
<br>

## How it was made:

**Tech used:** 
- PostgreSQL for database
- node-postgres for connecting our node app to our db
- Commander for command line inputs
- dotenv for using .env variables

## How To Run The Project

1. Download the files onto your local environment or copy this repo and navigate into the folder you downloaded them into
```
cd CLI-db-todo
```
2. Open in your preferred IDE and install dependencies
```
npm install
```
4. Launch local PostgreSQL database
5. Create a .env file and add your information to connect to your local server
```
USER='yourusername'
PW='yourpassword'
HOST='localhost'
PORT=5432
DB='yourdatabase'
```
6. run from your command line! node index.js --help to see all commands
```
node index.js --help
```

## Features:

Following the project guidelines, this project allows users to...
1. add a new todo item to the database
2. list all the items in the database (optionally by status [all, pending, done])
3. update an item from pending to done
4. delete an item
5. check version and see all commands using --version and --help

## Lessons Learned:
One of those projects that feels harder than it is. Haven't really connected a database before so it felt scary but thanks to tools like node-postgres the process is actually
much easier than it looks. My approach was to
1. Set up the PostgreSQL database, which was straightforward using Postgres App
2. Create node project and connect to the database. I did not know how to do this, but the node-postgres documentation made it really clear, especially since the scope of this project was so small
3. Once the database existed and it was connected, just a matter of making the functions. Again thanks to node-postgres you can basically write SQL commands in js! At that point it was just structuring.

Good tiny project to get comfortable connecting to databases. First time doing it and it was a good learning experience!
