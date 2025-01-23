const dayjs = require('dayjs')
// require can be used through bundling. I used browserify to bundle
var utc = require("dayjs/plugin/utc");
// import utc from 'dayjs/plugin/utc' // ES 2015

var timezone = require("dayjs/plugin/timezone"); // dependent on utc plugin
// import timezone from 'dayjs/plugin/timezone' // ES 2015

// time zone stuff we need
dayjs.extend(utc);
dayjs.extend(timezone);

// stuff we are changing
const clockTime = document.getElementById('clockNum');
const userZone = document.getElementById('userZone')
const dateTxt = document.getElementById('dateTxt')

/// the hour/minute/second variables // THIS WAS ME OVERTHINKING, remember to read documentation better
// let hour = dayjs().hour();
// let minute = dayjs().minute();
// let second = dayjs().second();
// // the week/day/month/year
// let weekday = dayjs().day();
// let day = dayjs().date();
// let month = dayjs().month();
// let year = dayjs().year();
// // the time zone
// let tzone = dayjs.extend(utc)
// let tztwo = dayjs.extend(timezone)
let tzguess = dayjs.tz.guess()

function updateTime() {
    clockTime.innerHTML = dayjs().format('HH:mm:ss')
    setInterval(() => {
        updateTime()
    }, 1000);
}

function updateTimeZone() {
    userZone.innerHTML = tzguess + dayjs().format(' Z');
}

function updateDate() {
    dateTxt.innerHTML = dayjs().format('dddd, DD MMMM, YYYY');
}

document.addEventListener('DOMContentLoaded', () => {
    updateTime();
    updateTimeZone();
    updateDate();
})