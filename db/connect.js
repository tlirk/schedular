const sqlite3 = require("sqlite3");
const sql3 = sqlite3.verbose();
const path = require('path');
const fs = require('fs');
const {createfolder, createfile} = require("../setup.js");

//createfolder('./media');


const dbPath = path.join(__dirname, 'db','database.db');

if (!fs.existsSync(dbPath)) {
    createfile('db','database.db');    
}

console.log("My DB Path:", dbPath);

const DB = new sql3.Database( './origin.db', sqlite3.OPEN_READWRITE, connected);

function connected(error) {
    if (error) {
        console.log("Error creating a database: ", error.message);
        return
    }
    console.log('Created the DB or SQlite DB already exists');    
}

let sql = `CREATE TABLE IF NOT EXISTS task(
taskID INTEGER PRIMARY KEY,
taskName TEXT NOT NULL,
taskDescription TEXT NOT NULL,
taskStart_time TEXT NOT NULL,
taskDate TEXT NOT NULL,
taskDuration TEXT NOT NULL,
taskStatus TEXT,
dateCreated  TEXT NOT NULL,
modifiedDate TEXT
);`;

let sql_user_table = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT "user",
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  userName TEXT,
  email TEXT NOT NULL UNIQUE,
  phoneNo TEXT NOT NULL,
  password TEXT NOT NULL,
  dateCreated TEXT NOT NULL DEFAULT (datetime('now')),
  modifiedDate TEXT NOT NULL DEFAULT (datetime('now'))
);`;

DB.run(sql_user_table, [], (error)=>{
    //callback function
    if(error) {
        console.log("Error creating  Users table", error);
        return;
    }

    console.log('Users Table Created');
})

DB.run(sql, [], (error)=>{
    //callback function
    if(error) {
        console.log("Error creating table", error);
        return;
    }

    console.log('Table created');
});

module.exports = {DB};

