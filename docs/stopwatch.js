/*
 * Variables
 */
const display = document.querySelector('.clock__display');
const displayHours = document.querySelector('#clock__display--hours');
const displayMinutes = document.querySelector('#clock__display--minutes');
const displaySeconds = document.querySelector('#clock__display--seconds');
const startButton = document.querySelector('#clock__start-button');
const stopButton = document.querySelector('#clock__stop-button');
const resetButton = document.querySelector('#clock__reset-button');

let prevTime;
let time = 0;

let clock;

/*
 * Main
 */
resetTime();

startButton.addEventListener('click', startWatch);
stopButton.addEventListener('click', stopWatch);
resetButton.addEventListener('click', resetTime);

/*
 * Aux Functions
 */
function resetTime() {
    stopWatch();
    clock = null;

    displayHours.textContent = '00';
    displayMinutes.textContent = '00';
    displaySeconds.textContent = '00';
}

function startWatch() {
    if (!clock) time = 0;
    prevTime= new Date();

    clock = setInterval(updateTime, 1000);
    display.setAttribute('data-state', 'active');
}

function stopWatch() {
    clearInterval(clock);
    display.setAttribute('data-state', 'inactive');
}

function updateTime() {
    const currentTime = Date.now()
    time += (currentTime - prevTime);
    prevTime = currentTime;

    const [hours, minutes, seconds] = parseTime(time/1000);

    displayTime(hours, minutes, seconds);
}

function displayTime(hours, minutes, seconds) {
    displayHours.textContent = hours.toString().padStart(2, '0');
    displayMinutes.textContent = minutes.toString().padStart(2, '0');
    displaySeconds.textContent = seconds.toString().padStart(2, '0');
}

function parseTime(secondsTotal) {
    const hours = (secondsTotal / 60 / 60).toFixed(0);
    const minutes = ((secondsTotal - hours * 60 * 60) / 60).toFixed(0);
    const seconds = (secondsTotal % 60).toFixed(0);
    
    return [hours, minutes, seconds]
}