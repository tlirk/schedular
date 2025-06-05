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
)`;





DB.run(sql, [], (error)=>{
    //callback function
    if(error) {
        console.log("Error creating table", error);
        return;
    }

    console.log('Table created');
});

module.exports = {DB};

