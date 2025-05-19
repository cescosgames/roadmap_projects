import client from "./database.js"; // import our client from database.js to connect to our PostgresSQL
import { Command } from "commander"; // use commander for input
const program = new Command(); // creating our new program

// set name and description
program
  .name('CLI-DB-Todo')
  .description('A simple CLI todo application that stores info in a local PostgresSQL database')
  .version('1.0.0');

// create a todo
program
  .command('create')
  .description('Creates a todo and inserts it into our database')
  .requiredOption('-d, --description <description>', 'Name of Task')
  .option('-s, --status [status]', 'Status (default = pending)', 'pending')
  .action((options) => {
    const { description, status } = options;
    Create(description, status);
  });

// read all our todos
program
  .command('read')
  .description('Reads all the todos from our database')
  .option('-s, --status <status>', 'filter by status (all, pending, complete)', 'all')
  .action((options) => {
    const { status } = options;
    CRead(status);
  });

// update a todo by ID
program
  .command('update')
  .description('Updates the status of a task to complete')
  .requiredOption('-i, --id <id>', 'task ID')
  .action((options) => {
    const { id } = options;
    CRUpdate(id);
  });

// delete a todo by ID
program
  .command('delete')
  .description('Removes a task from the database')
  .requiredOption('-i, --id <id>', 'task ID')
  .action((options) => {
    const { id } = options;
    CRUDelete(id);
  });

// listen for input
program.parse(process.argv);




// --- The actual CRUD functions below ---
// everything is async so these db connections don't block since we have to wait for the DB to respond
// CREATE
async function Create(task, status = "pending") {
  try {
    // Example CRUD operation: Write
    // NOTE $1 and $2 are Parameterized Query Placehodlers which means they rep values that will be substituted when query is eecuted, treats input as values only NOT sql code to stop malicious code injection
    const query = `
      INSERT INTO tasks (description, status) 
      VALUES ($1, $2)
      RETURNING *;
    `;
    const values = [task, status]; // our array holding our task and status input
    const res = await client.query(query, values); // calls the query with our values put in place of the $1 $2 etc.
    console.log(res.rows[0]); // res.rows[0] AFTER an inster query gives us the exact row we just added, confirms we did it correctly
  } catch (err) {
    console.error("Error performing query:", err);
  } finally {
    await client.end(); // Close the connection
    console.log("Database connection closed.");
  }
};

// READ
async function CRead(status) {
  try {
    // Example CRUD operation: Read
    if(status === 'all' || status === '') {
      const res = await client.query('SELECT * FROM tasks'); // it's just like writing SQL
      console.table(res.rows);
    } else if (status ==='pending' || status === 'complete') {
      const res = await client.query(`SELECT * FROM tasks WHERE status = $1`, [status]);
      console.table(res.rows);
    } else {
      console.error('Invalid status selected, please select all, pending, or complete');
    }
  } catch (err) {
    console.error("Error performing query:", err);
  } finally {
    await client.end(); // Close the connection
    console.log("Database connection closed."); // not sure if this is necessary, but makes me feel better
  }
};

async function CRUpdate(id) {
  try {
    // Example CRUD operation: Update
    // NOTE $1 and $2 are Parameterized Query Placehodlers which means they rep values that will be substituted when query is eecuted, treats input as values only NOT sql code to stop malicious code injection
    const query = `
      UPDATE tasks 
      SET status = $1
      WHERE id = $2
      RETURNING *
    `; // returning * means the db sends back affected rows after the operation, gives us feedback
    const values = ['complete', id]
    const res = await client.query(query, values);
    console.log(res.rows[0]); // res.rows[0] AFTER an inster query gives us the exact row we just added, confirms we did it correctly
  } catch (err) {
    console.error("Error performing query:", err);
  } finally {
    await client.end(); // Close the connection
    console.log("Database connection closed.");
  }
};

async function CRUDelete(id) {
  try {
    // Example CRUD operation: Delete
    const query = `
      DELETE FROM tasks 
      WHERE id = $1
      RETURNING *
    `; // returning * means the db sends back affected rows after the operation, gives us feedback
    const values = [id]
    const res = await client.query(query, values);
    console.log(res.rows[0]); // res.rows[0] AFTER an inster query gives us the exact row we just added, confirms we did it correctly
  } catch (err) {
    console.error("Error performing query:", err);
  } finally {
    await client.end(); // Close the connection
    console.log("Database connection closed.");
  }
};
