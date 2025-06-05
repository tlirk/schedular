
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const {v4: uuid} = require('uuid');
const cors = require('cors');
const {DB} = require("./db/connect.js");



//const ensureFolderMiddleware = require('./middlewares/ensureFolderExists.js');
const { ifError } = require('assert');
const { get } = require('https');

const app = express();
app.use(express.static(path.join('public'),{extended: false}));
app.use(express.json());

app.use(cors());

function getFormattedDate(){
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // months are zero based
    const day = String(date.getDate()).padStart(2,'0');
    const full_time = date.toLocaleString();

    return {date:`${year}-${month}-${day}`,
            time_all: full_time};
}

//Middleware to get all tasks
app.get('/get_allTasks', (req, res)=>{
    res.set('content-type', 'application/json');
    const sql = `SELECT * FROM task`;
    let data = {taskItems: []};
    
    try {
        DB.all(sql, [], (err, rows)=>{
            if (err) {
                throw new Error("Error Getting all data:", err); // let the catch handle it           
    
            }

            rows.forEach(row=>{
                data.taskItems.push({
                    id: row.taskID, 
                    schedule_name: row.taskName,
                    schedule_quote: row.taskDescription,
                    start_time: row.taskStart_time,
                    schedule_date: row.taskDate,
                    schedule_day: row.taskDay,
                    duration: row.taskDuration,
                    status: row.taskStatus,
                    date_created: row.dateCreated,
                    modified_date: row.modifiedDate   
                 })
            });
            console.log(data);
            let content = JSON.stringify(data);
            //console.log(content);
            

            res.send(content);

        })

        
    } catch (error) {
        console.log("Error Getting Data From DB: ",error)
        res.status(467);     
        res.json({code: 467, message: error.message});
    }


})

app.post('/test',(req,res)=>{
    const {message} = req.body;
    console.log("Test data: ", req.body);
    res.json({message:"success" });

    console.log(getFormattedDate().time_all);
})

//Middleware to add tasks
app.post('/add_task', (req,res)=>{
    const data = req.body;
    const {schedule_name, schedule_quote, start_time, schedule_date, duration} = req.body;
    const taskStatus = 'pending';
    const dateCreated = getFormattedDate().date;
    const modifiedDate = getFormattedDate().time_all;
    
    
    console.log(req.body);
    console.log('uuid', uuid());

    res.set('content-type', 'application/json');
    const sql = 'INSERT INTO task(taskName, taskDescription, taskStart_time, taskDate, taskDuration, taskStatus, dateCreated, modifiedDate) VALUES( ?, ?, ?, ?, ?, ?, ?, ?)';
    let newid;

    try {
        DB.run(sql, [schedule_name, schedule_quote, start_time, schedule_date, duration, taskStatus, dateCreated,  modifiedDate], function(err){
            if(err) throw err;
            newid = this.lastID;//provides the auto increment enemy id

            res.status(201);
            let data = {status: 201, message: `Schedule task ${newid} added`};
            let content = JSON.stringify(data);
            res.send(content)

        })
        
    } catch (error) {
        console.log(error.message);
        res.status(468);
    }
    //res.json({message: 'Task Schedule Data Added', data, uuid: uuid()});
})

/*Middleware to delete task*/

app.delete('/delete_task',(req,res)=>{
    let del_item = req.query.id;
    console.log(del_item);

    const sql = "DELETE FROM task WHERE taskID = ?";

    try{
        DB.run(sql, [del_item], function(err){
            if(err) throw err;
            if(this.changes===1){
                //one item deleted
                res.status(200);
                res.json({message:`TaskID ${del_item} Deleted`, status: "success"});

            }
        })

    } catch (error){
        console.log("DELETE ERROR: ", error.message);
        res.status(469);
        res.json({code:469, message:"Error Deleting Task", status: error.message});
    }

})


app.put('/update_cancelled', (req, res) => {
  const data_id = req.query.id;
  const data = 'cancelled';
  console.log("Data Put Cancell requests",data_id)

  if (!data_id) {
    return res.status(400).json({ error: 'Missing id or data in request body' });
  }

  const query = `UPDATE task SET taskStatus = ? WHERE taskID = ?`;
  DB.run(query, [data, data_id], function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Database error', id:data_id });
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: 'No record found to update' });
    }

    res.status(200).json({ message: 'Record updated successfully' });
  });
});

app.put('/update_completed', (req, res) => {
  const data_id = req.query.id;
  const data = 'completed';

  if (!data_id) {
    return res.status(400).json({ error: 'Missing id or data in request body' });
  }

  const query = `UPDATE task SET taskStatus = ? WHERE taskID = ?`;
  DB.run(query, [data, data_id], function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Database error', id:data_id });
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: 'No record found to update' });
    }

    res.status(200).json({ message: 'Record updated successfully' });
  });
});




const port = 3000 || process.env.PORT;
app.listen(port,()=>{
    console.log(`server running on http://localhost:${port}`);

})