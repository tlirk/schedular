//show the various sections on menu button click

let homeBtn = document.querySelectorAll('#homeBtn');
let taskBtn = document.querySelectorAll('#taskBtn');
let notesBtn = document.querySelectorAll('#noteBtn');

//initializing other section buttons

let homeSec = document.querySelector('.nav_bar');
let taskSec = document.querySelector('.taskSec');
let noteSec = document.querySelector('.noteSec');

//function to display other sections
function show_section(btn,sec, sections){

    btn.forEach(bn => {
        bn.addEventListener('click',()=>{
            sections.forEach(element => {
                element.style.display = 'none';
            });

            sec.style.display ='flex';
       });

    });

}
//sections homeSec , taskSec, noteSec
// buttons homeBtn , taskBtn, notesBtn

//show home section
show_section(homeBtn,homeSec,[taskSec,noteSec]);
//show task section
show_section(taskBtn,taskSec,[homeSec,noteSec]);
//show notes section
show_section(notesBtn,noteSec,[homeSec,taskSec]);



/*popup section function */
const addTaskBtn = document.querySelectorAll('#addTaskBtn');
const popup = document.querySelector('.popup');
const closeBtn = document.querySelector('.close-btn');

addTaskBtn.forEach(element=>{
    element.addEventListener('click', ()=>{
        //alert('hello');
        popup.style.display = 'flex';  // Show the popup
    });

});

// Close popup when clicking the close button
closeBtn.addEventListener('click', function() {
    popup.style.display = 'none';
});

// Close popup when clicking outside the popup
window.addEventListener('click', function(event) {
if (event.target === popup) {
    popup.style.display = 'none';
}
});


//pop_up_message 
const msgPopUp = document.querySelector('.msgPopUp');

function msg_show(status, msg, type){
    
    let msg_status = document.querySelector('.msg_status'); //reminder, success, alert
    let msg_notify = document.querySelector('.msg_notify');
    msgPopUp.style.display = 'flex';

    switch (type) {
        case error:
            msg_status.style.color = 'red';
            break;
        case success:
            msg_status.style.color = 'green';
            break;
        default:
            break;
    }

    msg_status.innerHTML = status;
    msg_notify.innerHTML = msg;

    
    setTimeout(() => {
        msgPopUp.style.display = 'none';
    }, 500);
}
let msgCloseBtn = document.querySelector('.msg_close-btn');

msgCloseBtn.addEventListener('click', ()=>{
    //alert('hello');
    msgPopUp.style.display = 'none';
})

// Close msgpopup when clicking outside the popup
window.addEventListener('click', function(event) {
    if (event.target === msgPopUp) {
        msgPopUp.style.display = 'none';
    }
    });


//msg_show('success!','message sent','success');