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

function timeStringMiliseconds(timeStr){
    const [hours, minutes, seconds] = timeStr.split(':').map(Number);
    return ((hours * 60 * 60) + (minutes * 60) + seconds) * 1000;
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
            { value: task_title, name: "task title" },
            { value: task_date, name: "task schedule date" },
            { value: taskDhr, name: "task Duration hour" },
            { value: taskDmin, name: "task Duration minutes" },
            { value: taskDsec, name: "task Duration seconds" },
            { value: taskDes, name: "task Description" },
            { value: taskShr, name: "task Start time hour" },
            { value: taskSmin, name: "taskStart time minutes" },
            { value: taskSsec, name: "task Start time seconds" }
        ];
        
        for (let item of ValidateCheck) {
            if (item.value === "") {
                
                return `Empty Input Field: ${item.name}`;
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
            if( task_title && task_date && taskDhr && taskDmin && taskDsec && taskDes && taskShr && taskSmin && taskSsec !== ''){
                const data = await httpRequest('https://tlirk-schedular.onrender.com/add_task', 'POST', 
                    taskValue
                );
                console.log(JSON.stringify(data, null, 2));
            } else{
                alert("Fill All Fields To Add Tasks");
            }
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    }

    makePostRequest();
    setTimeout(function() {
        //console.log("hello");
        httpRequest('https://tlirk-schedular.onrender.com/get_allTasks', 'GET')
        .then(data => console.log(data))
        .catch(err => console.error(err));

    }    
    ,5000);

    handleUi();

    //alert("Task Addition Success");
    
});

/*
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
*/
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

//Update Ui data on loading the window
window.onload = handleUi();

//update Ui data every five seconds
setInterval(()=>{
    handleUi
}, 5000)




export async function handleUi() {
    //alert("button working");
    try {
        const data = await httpRequest('https://tlirk-schedular.onrender.com/get_allTasks', 'GET');
        
        console.log(data.taskItems);
        ParseUiData(data.taskItems);
    } catch (err) {
        console.log(`Error: ${err.message}`);
    }
}

/*#########Handle Active Task Schedule#########*/
let currentTask;
let confirmationTimeout;

//show popUp function for confirmtask
function showpopUp(task){
    document.getElementById('taskInfo').innerText = `${task.schedule_name}`;
    document.getElementById('popup_active_task_confirm').style.display = 'flex';
    
    currentTask = task;

    //start 30-second confirmation timer
    confirmationTimeout = setTimeout(()=>{
        cancelTask(task);
    }, 30000);

}

//function set up active task Ui
function ActiveTaskUi(activeTask){
    let active_task_section = document.querySelector('.taskSec_active');
    active_task_section.style.display = 'flex';
    active_task_section.innerHTML = `
        <div class="taskSec_active_item">
            <p>${activeTask.schedule_quote}</p>
            <div class="taskSec_active_item_detail">
                <h2>${activeTask.schedule_name}</h2>
                <span>Duration: 1hr 30mins 00sec</span>
                <span>Started@: ${activeTask.start_time}</span>
                <span>Date: Thur, 8 May 2025</span>
            </div>
        </div>
        <div class="taskSec_active_timer">
            <div>
                <!--duration timer to end-->
                <p>Ends In:</p>
                <span id="timerhour"></span>
                <span id="timermin"></span>
                <span id="timersec"></span>
            </div>
            <div>
                <!--Add notes-->
                <button>Note</button>
                <!--cancel task item-->
                <button>Cancel</button>
            </div>
        </div>
    `;

    setTimeout(()=>{
        document.querySelector('.noteSec').style.display = 'none';
        document.querySelector('.nav_bar').style.display = 'none';
        document.querySelector('.taskSec').style.display = 'flex';
    },5000);


}

//function timer ui update
function updateTimerUI(remainingMilliseconds) {
    let totalSeconds = Math.floor(remainingMilliseconds / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    // Pad single digits with a leading zero for cleaner display
    document.getElementById('timerhour').innerText = `Hr: ${String(hours).padStart(2, '0')}`;
    document.getElementById('timermin').innerText = `Min: ${String(minutes).padStart(2, '0')}`;
    document.getElementById('timersec').innerText = `Sec: ${String(seconds).padStart(2, '0')}`;
}


//confirm task function


function confirmTask(){
    if(currentTask && currentTask.status === 'pending'){
        currentTask.status ='confirmed';
        httpRequest(`https://tlirk-schedular.onrender.com/update_confirmed?id=${currentTask.id}`, 'PUT');
        handleUi();

        let timeStampInMiliseconds = `${currentTask.schedule_date}T${currentTask.start_time}`;
        //console.log("timeStamp: ", timeStampInMiliseconds);
        let startTime = new Date(timeStampInMiliseconds).getTime();


        //save endTime as a timestamp in miliseconds
        let duration =  timeStringMiliseconds(currentTask.duration);
        console.log(duration);
        currentTask.endTime = startTime + duration;

        //update active  task ui
        ActiveTaskUi(currentTask);
        console.log("confirmed task: ", [currentTask]);

        let storageTask = [currentTask];
        localStorage.setItem('CurrentTask', JSON.stringify(storageTask));

        clearTimeout(confirmationTimeout);
        hidePopup();

        //start completion timer
        const completionInterval = setInterval(()=>{
            try {
                const now = Date.now(); //get currentTime in miliseconds
                let currentTask = JSON.parse(localStorage.getItem('CurrentTask'))[0];
                //console.log('Ongoing Task: ', currentTask);
                //console.log("Now Time: ", now); // debug
                //console.log("Task end time: ", currentTask.endTime);
                console.log("my current task: ", currentTask);
                console.log("My Current time: ", now);
                let remainingTime = currentTask.endTime - now;

                if (remainingTime > 0) {
                    updateTimerUI(remainingTime);
                }

                if (now >= currentTask.endTime && currentTask.status === 'confirmed') {
                    //let taskid = data.find(data => data.id === currentTask.id);

                    //taskid.status = 'completed';
                    //currentTask.status = 'completed';
                    currentTask.status = 'completed';

                    httpRequest(`https://tlirk-schedular.onrender.com/update_completed?id=${currentTask.id}`, 'PUT');
                    handleUi();
                    document.querySelector('.taskSec_active').style.display = 'none';
                    setTimeout(()=>{
                        document.querySelector('.noteSec').style.display = 'none';
                        document.querySelector('.taskSec').style.display = 'none';
                        document.querySelector('.nav_bar').style.display = 'flex';
                    },5000);


                    console.log(`Task ${currentTask.schedule_name} completed.`);

                    clearInterval(completionInterval);                    
                }

            } catch (error) {
                console.log(error);
                
            }
        }, 1000);
    }
}

document.getElementById('confirmTaskBtn').addEventListener('click', ()=>{
    confirmTask();
})

//cancel task function
function cancelTask(task){
    if(task.status === 'pending'){
        //task.status = 'cancelled';
        httpRequest(`https://tlirk-schedular.onrender.com/update_cancelled?id=${task.id}`, 'PUT');
        //handleUi();
        console.log(`Task ${task.schedule_name} was cancelled.`);
        hidePopup();
    }
}


//Hide confirmation popup function
function hidePopup() {
    document.getElementById('popup_active_task_confirm').style.display = 'none';
    currentTask = null;
    clearTimeout(confirmationTimeout);    
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

    //console.log("Task status summary for today:");

    //console.log(`Pending: ${statusCounts.pending}`);
    //console.log(`Completed: ${statusCounts.completed}`);
    //console.log(`Cancelled: ${statusCounts.cancelled}`);

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
            //alert("Pending Task Length", pendingTasks.length);
            pendingTasks.forEach((task, index) => {
                // Create view item (compact list view)
                const viewItem = `
                    <div class="view_item" data-id="${task.id}" style="animation-delay: ${index * 0.5}s;">
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
        //console.log('pending tasks');
        let pendingTasks = todayTask.filter( task => task.status === 'pending');

        if(pendingTasks.length > 0){
            //alert(pendingTasks.length);
            document.querySelector('.view_content').innerHTML = '';
            pendingTasks.forEach((pendingtask, index)=> {

                let pendingItem = `
                    <div class="view_item" data-id="${pendingtask.id}" style="animation-delay: ${index * 0.5}s;">
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
        //console.log('achieved task');
        let achievedTasks = todayTask.filter( task => task.status === 'completed');
        if(achievedTasks.length > 0){
            document.querySelector('.view_content').innerHTML = '';
            achievedTasks.forEach((achievedtask, index )=> {

                let achievedItem = `
                    <div class="view_item" data-id="${achievedtask.id}" style="animation-delay: ${index * 0.5}s;">
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

        //alert('No Tasks Archieved');
        
    });

    document.querySelector('#cancelledBtn').addEventListener('click',function(e){
        //console.log('cancelled');
        let cancelledTasks = todayTask.filter( task => task.status === 'cancelled');

        if(cancelledTasks.length > 0){
            document.querySelector('.view_content').innerHTML = '';
        
            cancelledTasks.forEach( (cancelledtask, index )=> {

                let cancelledItem = `
                    <div class="view_item" data-id="${cancelledtask.id}" style="animation-delay: ${index * 0.5}s;">
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

        //alert('NO Cancelled Tasks');
    });

    //Main loop to check for task start time
    setInterval(()=>{
        const now = new Date().getTime();

        //console.log("now timestamp: ", now);
        //console.log(todayTask);
        
        todayTask.forEach(task => {
            let timeStampInMiliseconds = `${task.schedule_date}T${task.start_time}`;
            //console.log("timeStamp: ", timeStampInMiliseconds);
            let startTime = new Date(timeStampInMiliseconds).getTime();
            //console.log("final milisecond: ", startTime);
            if(task.status === 'pending' && now >= (startTime)){
                showpopUp(task);
            }
        })
    }, 1000);
}
