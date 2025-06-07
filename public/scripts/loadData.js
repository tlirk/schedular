//const { application } = require("express");


let taskData = [
    {
        date:'2025-05-04',
        day:'Sunday',
        values:[
            {
                id:122,
                schedule_name:"The Theory Of Everything",
                schedule_quote:"Reading a book by Hawkins",
                start_time: {
                    hour:'16',
                    min:'27',
                    sec:'00'
                },
                duration:{
                    hour: 0,
                    min: 2,
                    sec: 30
                },
                schedule_date:"2025-05-04",
                schedule_day:"Sunday",
                date_created:""
            },
            {
                id:123,
                schedule_name:"study",
                schedule_quote:"a healthy brain builds a good path for opportunities",
                start_time: {
                    hour:'16',
                    min:'35',
                    sec:'00'
                },
                duration:{
                    hour: 0,
                    min: 2,
                    sec: 0
                },
                schedule_date:"2025-05-04",
                schedule_day:"Sunday",
                date_created:""
            }
        ]
    },
    {
        date:'2025-05-10',
        day:'Wednesday',
        values:[
            
        ]
    },
    {
        date:'2025-04-33',
        day:'Wednesday',
        values:[
            {
                id:122,
                schedule_name:"fitness",
                schedule_quote:"keep fit, keeping healthy",
                start_time: {
                    hour:9,
                    min:30,
                    sec:0
                },
                duration:{
                    hour: 1,
                    min: 20,
                    sec: 0
                },
                schedule_date:"2025-04-30",
                schedule_day:"Wednesday",
                date_created:""
            },
            {
                id:123,
                schedule_name:"study",
                schedule_quote:"a healthy brain builds a good path for opportunities",
                start_time: {
                    hour:8,
                    min:30,
                    sec:0
                },
                duration:{
                    hour: 1,
                    min: 20,
                    sec: 0
                },
                schedule_date:"2025-04-30",
                schedule_day:"Wednesday",
                date_created:""
            }
        ]
    },
    {
        date:'2025-04-34',
        day:'Wednesday',
        values:[
            {
                id:122,
                schedule_name:"fitness",
                schedule_quote:"keep fit, keeping healthy",
                start_time: {
                    hour:9,
                    min:30,
                    sec:0
                },
                duration:{
                    hour: 1,
                    min: 20,
                    sec: 0
                },
                schedule_date:"2025-04-30",
                schedule_day:"Wednesday",
                date_created:""
            },
            {
                id:123,
                schedule_name:"study",
                schedule_quote:"a healthy brain builds a good path for opportunities",
                start_time: {
                    hour:8,
                    min:30,
                    sec:0
                },
                duration:{
                    hour: 1,
                    min: 20,
                    sec: 0
                },
                schedule_date:"2025-04-30",
                schedule_day:"Wednesday",
                date_created:""
            }
        ]
    }
];

function formatto2Digit(value) {
      return new Intl.NumberFormat('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      }).format(value);
}

/*initializing add task variables 
let task_title = document.querySelector('#task_title').value;
let task_date = document.querySelector('#date_time').value;
let taskDhr = document.querySelector('#duration_hr').value;
let taskDmin = document.querySelector('#duration_min').value;
let taskDsec = document.querySelector('#duration_sec').value;
let taskDes = document.querySelector('#description').value;
let taskShr = document.querySelector('#start_time_hr').value;
let taskSmin = document.querySelector('#start_time_min').value;
let taskSsec = document.querySelector('#start_time_sec').value;
*/

//validate input data is not empty


let submitTaskBtn = document.querySelector('#submit_task');
submitTaskBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    let task_title = document.querySelector('#task_title').value.trim();
    let task_date = document.querySelector('#date_time').value.trim();
    let taskDhr = document.querySelector('#duration_hr').value.trim();
    let taskDmin = document.querySelector('#duration_min').value.trim();
    let taskDsec = document.querySelector('#duration_sec').value.trim();
    let taskDes = document.querySelector('#description').value.trim(); // Not checked per your array
    let taskShr = document.querySelector('#start_time_hr').value.trim();
    let taskSmin = document.querySelector('#start_time_min').value.trim();
    let taskSsec = document.querySelector('#start_time_sec').value.trim();

    
    function validateInputCheck() {
        const ValidateCheck = [
            { value: task_title, name: "task_title" },
            { value: task_date, name: "task_date" },
            { value: taskDhr, name: "taskDhr" },
            { value: taskDmin, name: "taskDmin" },
            { value: taskDsec, name: "taskDsec" },
            { value: taskDes, name: "taskDes" },
            { value: taskShr, name: "taskShr" },
            { value: taskSmin, name: "taskSmin" },
            { value: taskSsec, name: "taskSsec" }
        ];
        
        for (let item of ValidateCheck) {
            if (item.value === "") {
                
                return `empty: ${item.name}`;
            }
        }

        return true;
    }

    if(validateInputCheck() !== 'true'){
        alert(validateInputCheck());
    }
    

    let taskValue = {
        schedule_name: task_title,
        schedule_quote: taskDes,
        start_time: `${taskShr}:${taskSmin}:${taskSsec}`,
        schedule_date: task_date,
        duration:`${taskDhr}:${taskDmin}:${taskDsec}`
    }
    
    //submit_post(taskValue, 'add_task', "POST");
    async function makePostRequest() {
    try {
        const data = await httpRequest('https://tlirk-schedular.onrender.com/add_task', 'POST', 
            taskValue
        );
        console.log(JSON.stringify(data, null, 2));
    } catch (err) {
        console.log(`Error: ${err.message}`);
    }
    }

    makePostRequest();
    setTimeout(function() {
        console.log("hello");
        httpRequest('https://tlirk-schedular.onrender.com/get_allTasks', 'GET')
        .then(data => console.log(data))
        .catch(err => console.error(err));

    }    
    ,5000);

    handleUi();

    alert("Task Addition Success");
    
});


async function submit_post(taskvalue, route, method){
    let url = `https://tlirk-schedular.onrender.com/${route}`;
    try {
        fetch(url,{
            method: `${method}`,
            headers: {
                "content-type": "application/json",
            },            
            body: JSON.stringify(taskValue)
        }).then(res=> res.json())
        .then(res=> console.log(res))
        .catch(err=> console.log(err));
        
    } catch (error) {
        console.log(error);
    }
    
}

/*
 Makes an HTTP request using GET or POST method.
 
 @param {string} url - The endpoint URL.
 @param {string} method - The HTTP method: "GET" or "POST".
 @param {object} [body=null] - The request body for POST method.
 @returns {Promise<object>} - A promise resolving to the response data.
*/
async function httpRequest(url, method = 'GET', body = null) {
    method = method.toUpperCase();

    const options = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (method === 'POST' && body) {
        options.body = JSON.stringify(body);
    }

    if (method === 'GET' && body) {
        // Append query parameters for GET request
        const query = new URLSearchParams(body).toString();
        url += `?${query}`;
    }

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let data = await response.json();
        console.log("Server Data",data);
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

window.onload = handleUi();


export async function handleUi() {
    alert("button working");
    try {
        const data = await httpRequest('https://tlirk-schedular.onrender.com/get_allTasks', 'GET');
        
        console.log(data.taskItems);
        ParseUiData(data.taskItems);
    } catch (err) {
        console.log(`Error: ${err.message}`);
    }
}

async function ParseUiData(data){
    //console.log(data.length);


    //Get todays date in the format yyyy-mm-dd
    const today = new Date().toISOString().split('T')[0];
    
    
    
    const todayTask = []

    //get task for today date
    data.forEach(e => {
         
        if(e.schedule_date === today){
            //console.log(e.schedule_date,today)
            todayTask.push(e);
        }      
    });

    
    
    console.log("Today tasks:"+ today,todayTask);

    //count status Pending, Cancelled Completed
    const statusCounts = {
        pending:0,
        completed:0,
        cancelled:0
    }

    todayTask.forEach(task => {
        const status = task.status.toLowerCase();

        if(statusCounts.hasOwnProperty(status)){
            statusCounts[status]++;
        }
    });

    console.log("Task status summary for today:");

    console.log(`Pending: ${statusCounts.pending}`);
    console.log(`Completed: ${statusCounts.completed}`);
    console.log(`Cancelled: ${statusCounts.cancelled}`);

    //add to the ui pending, completed and cancelled number
    document.querySelector('#tasks_total').innerHTML = `${statusCounts.pending}`;
    document.querySelector('#tasks_completed').innerHTML = `${statusCounts.completed}`;
    document.querySelector('#tasks_cancelled').innerHTML = `${statusCounts.cancelled}`;


    //show tasks data on ui pending

    
    if (todayTask.length !== 0) {
        let pendingTasks = todayTask.filter(task => task.status === 'pending');
        const viewContent = document.querySelector('.view_content');
        const otherTaskContent = document.querySelector('.other_task_content');

        viewContent.innerHTML = '';
        otherTaskContent.innerHTML = '';

        //do a check to see if pending task length if not equal to Zero:0
        if(pendingTasks.length > 0){
            alert("Pending Task Length", pendingTasks.length);
            pendingTasks.forEach((task, index) => {
                // Create view item (compact list view)
                const viewItem = `
                    <div class="view_item" data-id="${task.id}">
                        <p>${task.schedule_name}</p>
                        <div class="view_item_detail">
                            <span>Starts@: ${task.start_time}</span>
                            <span>Duration: ${task.duration}</span>
                        </div>
                        <button>Cancel</button>
                    </div>
                `;
                viewContent.innerHTML += viewItem;

                // Create detailed task card
                const taskCard = `
                    <div class="task-card" data-id="${task.id}" style="animation-delay: ${index * 0.3}s;">
                        <h2>${task.schedule_name}</h2>
                        <div class="task-info">
                            <span class="label">Description: <br></span>
                            <span class="value">${task.schedule_quote}</span>
                        </div>
                        <div class="task-info">
                            <span class="label">Starting Time:</span>
                            <span class="value">${task.start_time}</span>
                        </div>
                        <div class="task-info">
                            <span class="label">Duration:</span>
                            <span class="value">${task.duration}</span>
                        </div>

                        <div class="task-info">
                            <span class="label">Status:</span>
                            <span class="value">${task.status}</span>
                        </div>

                        <div class="task-control">
                            <button class="cancel_task">Cancel</button>
                        </div>
                    </div>
                `;
                otherTaskContent.innerHTML += taskCard;
            });
        }
        //otherTaskContent.style.display = 'none';
        /*retrieve  task id onclick of cancel button */
        function setupCancelButtons() {
            const container = document.querySelector('.other_task_content');

            container.addEventListener('click', function (event) {
                if (event.target && event.target.classList.contains('cancel_task')) {
                    const taskCard = event.target.closest('.task-card');
                    const taskId = taskCard.getAttribute('data-id');
                    showCancelModal(taskId, taskCard);
                }
            });
        };

        function showCancelModal(taskId, taskCard) {
            //create modal elements
            const modal = document.createElement('div');
            modal.className += 'cancel-popupCancel';

            const modalContent = document.createElement('div');
            modalContent.className += 'popup-contentCancel';

            modalContent.innerHTML = `
                <p>Do You Want To Cancel Task?</p>
                <div class="popup-actions">
                    <button class="modal-yes">Yes</button>
                    <button class="modal-no">No</button>
                </div>
                <div class="close-bar" id="longTimerBar"></div>
                <div class="popup-timer-bar"></div>
            `;

            modal.appendChild(modalContent);
            document.body.appendChild(modal);

            const timerBar = modal.querySelector('.popup-timer-bar');
            let timeoutId;

            //start timer bar animation
            requestAnimationFrame(() =>{
                timerBar.style.width = '0%';
            });

            //timer control bar
            const bar = document.getElementById('longTimerBar');
            animateCloseBar(bar, 0.5); // 30-minute countdown

            //Auto-close after 30 seconds
            timeoutId = setTimeout(() =>{
                closeModal();

            }, 30000);

            //YES: Make PUT request and remove task
            modal.querySelector('.modal-yes').onclick = function(){
                clearTimeout(timeoutId);
                fetch(`https://tlirk-schedular.onrender.com/update_cancelled?id=${taskId}`,{
                    'method': 'PUT',
                    'content-type':'application/json'
                })
                .then(response => {
                    if(response.ok){
                        taskCard.remove();
                    } else {
                        alert("Failed to cancel the task.");
                    }
                }).catch(error => {
                    console.error('Error:', error);
                    alert("Error cancelling task.");
                }).finally(()=>{
                    closeModal();
                    handleUi;
                    
                });
            };

            //NO: Just close the cancel task modal
            modal.querySelector('.modal-no').onclick = function(){
                clearTimeout(timeoutId);
                closeModal();
            };

            //clean up cancel task modal
            function closeModal() {
                modal.classList.add('fade-out');
                modal.style.animation = `fadeOut 0.3s forwards`;
                setTimeout(() => {
                    modal.remove();
                }, 300);

            }   

        };

        //long timer bar
        function animateCloseBar(barElement, totalMinutes = 0.5){
            const totalTime = totalMinutes * 60 * 1000; //30 minutes in miliseconds
            const startTime = Date.now();
            const endTime = startTime + totalTime;

            function updateBar(){
                const currentTime = Date.now();
                const remainingTime = Math.max(endTime - currentTime, 0);
                const percentage = (remainingTime / totalTime) * 100;

                barElement.style.width = `${percentage}%`;

                if (remainingTime> 0 ) {
                    requestAnimationFrame(updateBar);                    
                } else {
                    barElement.style.width = '0%';
                    
                }

            }

            updateBar();
        };



        setupCancelButtons();


        // UI adjustments
        document.querySelector('.taskSec_message').style.display = 'none';
        document.querySelector('.other_task').style.display = 'flex';
    }


    //button to show pending, cancelled and completed
    document.querySelector('#pendingBtn').addEventListener('click',function(e){
        console.log('pending tasks');
        let pendingTasks = todayTask.filter( task => task.status === 'pending');

        if(pendingTasks){
            alert(pendingTasks.length);
            document.querySelector('.view_content').innerHTML = '';
            pendingTasks.forEach(pendingtask => {

                let pendingItem = `
                    <div class="view_item" data-id="${pendingtask.id}">
                        <p>${pendingtask.schedule_name}</p>
                        <div class="view_item_detail">
                            <span>Starts@: ${pendingtask.start_time}</span>
                            <span>Duration: 1hr 20mins 40secs</span>
                        </div>
                        <button>Cancel</button>
                    </div>
                `;
                document.querySelector('.view_content').innerHTML += pendingItem;
                
            });
        }
    });

    document.querySelector('#achievedBtn').addEventListener('click',function(e){
        console.log('achieved task');
        let achievedTasks = todayTask.filter( task => task.status === 'completed');
        if(achievedTasks.length > 0){
            document.querySelector('.view_content').innerHTML = '';
            achievedTasks.forEach(achievedtask => {

                let achievedItem = `
                    <div class="view_item" data-id="${achievedtask.id}">
                        <p>${achievedtask.schedule_name}</p>
                        <div class="view_item_detail">
                            <span>Starts@: ${achievedtask.start_time}</span>
                            <span>Duration: 1hr 20mins 40secs</span>
                        </div>
                        <button>Cancel</button>
                    </div>
                `
                document.querySelector('.view_content').innerHTML += achievedItem;
                
            });
        };

        alert('No Tasks Archieved');
        
    });

    document.querySelector('#cancelledBtn').addEventListener('click',function(e){
        console.log('cancelled');
        let cancelledTasks = todayTask.filter( task => task.status === 'cancelled');

        if(cancelledTasks.length > 0){
            document.querySelector('.view_content').innerHTML = '';
        
            cancelledTasks.forEach( cancelledtask => {

                let cancelledItem = `
                    <div class="view_item" data-id="${cancelledtask.id}">
                        <p>${cancelledtask.schedule_name}</p>
                        <p>Cancelled</p>
                        <div class="view_item_detail">
                            <span>Starts@: ${cancelledtask.start_time}</span>
                            <span>Duration: 1hr 20mins 40secs</span>
                        </div>
                        <button>Cancel</button>
                    </div>
                `
                document.querySelector('.view_content').innerHTML += cancelledItem;
                
            });
        };

        alert('NO Cancelled Tasks')
    });


}


//Delete Item function
function delete_item(id){
    
}

//exports[handleUi]



