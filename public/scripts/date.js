
let GDATE = document.querySelectorAll('#DATE');
let GDAY = document.querySelectorAll('#DAY');
let GMONTH = document.querySelectorAll('#MONTH');
let GTIME = document.querySelectorAll('#GTIME');

let date = document.querySelector('#date');
let day = document.querySelector('#day');
let month = document.querySelector('#month');
let year = document.querySelector('#year');

let today =new Date();


try {
    setInterval(()=>{
        let today =new Date();
        //console.log( "Hours:",today.getHours());
        //console.log("Minutes:",today.getMinutes());
        //console.log("Seconds:",today.getSeconds());

        
        if(today.getMinutes() == 44 && today.getSeconds() == 50){
            alert("Hello its time to sleep")
        }

        GTIME.forEach(e=>{
            e.innerHTML = `${(today.getHours() < 10 ? "0": "") + today.getHours()}:
            ${(today.getMinutes() < 10 ? "0":"") + today.getMinutes()}:
            ${(today.getSeconds() < 10 ? "0": "") + today.getSeconds()}`;//
        })
    },500)
} catch (error) {
    console.log(error)
}

const  weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const AllMonths = ['January', 'February', 'March', 'April', 'May','June', 'July', 'August', 'September', 'October', 'November', 'December'];


date.innerHTML = (today.getDate() < 10 ? "0": "") + today.getDate();
day.innerHTML = weekDays[today.getDay()];
month.innerHTML = AllMonths[today.getMonth()];
year.innerHTML = today.getFullYear();


GDATE.forEach(e=>{
    e.innerHTML = (today.getDate() < 10 ? "0": "") + today.getDate();
})
GDAY.forEach(e=>{
    e.innerHTML = weekDays[today.getDay()];
})
GMONTH.forEach(e=>{
    e.innerHTML = AllMonths[today.getMonth()];
})



