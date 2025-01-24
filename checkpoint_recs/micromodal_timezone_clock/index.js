// import dayjs from './node_modules/dayjs/dayjs.min.js'; // Adjust path if needed
// import * as utc from './node_modules/dayjs/plugin/utc.js';
// import * as timezone from './node_modules/dayjs/plugin/timezone.js';

dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);


const currentTime = dayjs();
let desiredTZ = "America/New_York";
let newTime = currentTime.tz(desiredTZ);

const openModalButt = document.getElementById("changeButt");
const dropDownMenus = document.querySelectorAll(".dropDown") // this is an example for if we have multiple dropdowns

const clockTime = document.getElementById('clockNum');
const userZone = document.getElementById('userZone')
const dateTxt = document.getElementById('dateTxt')


document.addEventListener("DOMContentLoaded", (event) => {
    openModalButt.addEventListener('click', showModal);

    dropDownMenus.forEach(dropdown => {
      const clickArea = dropdown.querySelector('dropdownClickArea');
      const menu = dropdown.querySelector('.dropdownOptions');
      const dropdownListItem = dropdown.querySelectorAll('.listOption');
      const selectedOp = dropdown.querySelector('.selected');

      selectedOp.addEventListener('click', () => {
        menu.classList.toggle('menu-open');
      });

      // console.log(dropdownListItem)

      dropdownListItem.forEach(option => {
        option.addEventListener('click', () => {
          selectedOp.innerText = option.innerText;

          desiredTZ = option.innerText;
          selectUpdatedZone()

          menu.classList.remove('menu-open');

          dropdownListItem.forEach(option => {
            option.classList.remove('selectedOp');
          });
          option.classList.add('selectedOp');
        });

      });
    });

    setNewZone();
  });


// function testFunc() {
//     console.log("button works")
// }



MicroModal.init()
// showModal()
function showModal() {
    // console.log('called showing modal')
    MicroModal.show('modal-1')
}



// time functions below
function setNewZone() {
  updateTime();
  updateTimeZone();
  updateDate();
}

function updateTime() {
  // had to change so it would update properly, I don't know why but it wouldn't return the current time of the new zone unless formatted like this
  clockTime.innerHTML = dayjs().tz(desiredTZ).format('HH:mm:ss');
}

function updateTimeZone() {
  userZone.innerHTML = desiredTZ + newTime.format(' Z');
}

function updateDate() {
  dateTxt.innerHTML = newTime.format('dddd, DD MMMM, YYYY');
}

function selectUpdatedZone() {
  newTime = currentTime.tz(desiredTZ);
  // console.log(dayjs());
  updateTime();
  updateTimeZone();
  updateDate();
}

const clockInterval = setInterval(updateTime,1000)