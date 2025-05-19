// this is to connect our database to our index.js, don't forget to have your postgreSQL running!

// this is straight from the PG welcome tutorial
import { Client } from "pg"; // first import the Client class from pg

// import out env variables using dotenv package
import dotenv from 'dotenv';
dotenv.config();

// setup our client using info from our .env
const client = new Client({
    user: process.env.USER, // user
    password: process.env.PW, // password (?)
    host: process.env.HOST, // host// localhost for these practices
    port: process.env.PORT, // default port
    database: process.env.DB, // name of the database we want to use
});

(async () => {
    try {
        await client.connect(); // try to connect to our client
        console.log(`Successfully connected to todo_cli_app database`);
    } catch (error) {
        console.error(`DB connection failed: ${error}`); // if we don't, log it
    };
})(); // using an IIFE here to invoke this function immediately
// remember, IIFE wraps an arrow function in parantheses and calls () after to immediately invoke

export default client;






// -- getting a hang below with some practice queries, but now we want to export to our indexjs to CRUD our DB --

// await client.connect(); // this connects our client to our DB (make sure it's running!)

// // setting up a simple query
// const res = await client.query(` 
//     SELECT * FROM tasks
// `);

// console.table(res.rows);

// // const res = await client.query('SELECT $1::text as message', ['Hello world!']); // this is a super simple query, which returns a message with the value hello world
// // console.log(res.rows[0].message); // then we console log it
// await client.end(); // and close the connection