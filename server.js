
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
app.use(express.json());

app.use(cors());

// Override '/' route to serve version1/index.html instead of default public/index.html


function getFormattedDate(){
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // months are zero based
    const day = String(date.getDate()).padStart(2,'0');
    const full_time = date.toLocaleString();

    return {date:`${year}-${month}-${day}`,
            time_all: full_time};
}

app.use(express.static(path.join('public','version1')));
//auth register middleware
app.get('/', (req, res) => {
  try {
    console.log("hello accessing the root file"); //debug
    res.sendFile(path.join(__dirname,'public','version1','index.html'));
  } catch (error) {
    console.log(error)
    
  }
  
})


//function insert user in the database
function insertUser(dataArray){
  return new Promise((resolve, reject)=>{
    const query = 'INSERT INTO users(user_id, firstName, lastName, userName, email, phoneNo, password, dateCreated, modifiedDate) VALUES( ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    DB.run(query, dataArray, function(err){
      if (err) {
        if(err.code === 'SQLITE_CONSTRAINT' && err.message.includes('users.email')){
          resolve({success: false, message: 'Email already in use or phone already in use'});
        } else {
          reject(err);
        }
        
      } else {
        resolve({success: true, userId: this.lastID});        
      }
    });
  });
}


app.post('/signup', async (req, res) => {
  const { rfirst_name, rlast_name, r_email, rPhoneNumber, rPassword, rconfirmPassword } = req.body;

  const errors = [];

  // Check required fields
  if (!rfirst_name || rfirst_name.trim() === '') errors.push('First name is required');
  if (!rlast_name || rlast_name.trim() === '') errors.push('Last name is required');
  if (!r_email || r_email.trim() === '') errors.push('Email is required');
  if (!rPhoneNumber || rPhoneNumber.trim() === '') errors.push('Phone number is required');
  if (!rPassword || rPassword.trim() === '') errors.push('Password is required');
  if(rPassword.trim() !== rconfirmPassword.trim()) errors.push("Passwords Do Not Match");

  // Format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?[0-9]{10,15}$/; // Supports optional +, 10–15 digits
  const passwordMinLength = 6;

  if (r_email && !emailRegex.test(r_email)) {
    errors.push('Email format is invalid');
  }

  if (rPhoneNumber && !phoneRegex.test(rPhoneNumber)) {
    errors.push('Phone number must be 10-15 digits and may start with +');
  }

  if (rPassword && rPassword.length < passwordMinLength) {
    errors.push(`Password must be at least ${passwordMinLength} characters long`);
  }

  if (errors.length > 0) {
    console.log(errors)
    return res.status(400).json({
      status: "error",
      message: "Validation failed",
      errors: errors
    });
  }

  const dateCreated = getFormattedDate().date;
  const modifiedDate = getFormattedDate().time_all;
  const user_id = uuid();
  
  
  console.log(req.body);
  console.log('uuid', uuid());

  res.set('content-type', 'application/json');
  const sql = 'INSERT INTO users(user_id, firstName, lastName, userName, email, phoneNo, password, dateCreated, modifiedDate) VALUES( ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  let newid;

  try {
    /*
      DB.run(sql, [ user_id, rfirst_name, rlast_name, rfirst_name, r_email, rPhoneNumber, rPassword, dateCreated,  modifiedDate], function(err){
          if(err) throw err;
          newid = this.lastID;//provides the auto increment enemy id

          res.status(201);
          let data = {status: 201, message: `User  ${newid} Account Created added`};
          console.log(data);
          let content = JSON.stringify(data);
          res.send(content)

      })*/
     const result = await insertUser([ user_id, rfirst_name, rlast_name, rfirst_name, r_email, rPhoneNumber, rPassword, dateCreated,  modifiedDate]);
     if (!result.success) {
      console.log("Account Creation: ", result);
      return res.status(409).json({success: false, message: 'Email already in use or phone already in use'}); //409 conflict
      
     }

     console.log("Account Creation: ",result)

     res.status(201).json({status: "success", message: "User Account Created Successfully"});
      
  } catch (error) {
      console.log(error.message);
      res.status(500).json({success: "false", message: "Try Creating Account Another Time"})
  }

  console.log("User full name:", rfirst_name, rlast_name);
 //res.status(200).json({ message: "User registration data received successfully" });
});



app.use(express.static(path.join('public')));
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
  console.log("Data Put Status  Cancel requests for Data Id: ",data_id)

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
})

app.put('/update_completed', (req, res) => {
  const data_id = req.query.id;
  const data = 'completed';

  console.log("Data Put Status Completed Request for  Data Id:", data_id);

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
})

app.put('/update_confirmed', (req, res) => {
  const data_id = req.query.id;
  const data = 'confirmed';

  console.log("Data Put Status Confirm Request for  Data Id:", data_id);

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
})

const port = 3000 || process.env.PORT;
app.listen(port,()=>{
    console.log(`server running on http://localhost:${port}`);

})