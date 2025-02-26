// Full JavaScript Fix for Cat Timer with Sound 🐾😸
const timeDisplay = document.querySelector("#timeDisplay");
const startBtn = document.querySelector("#startBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const resetBtn = document.querySelector("#resetBtn");
const hoursInput = document.querySelector("#hoursInput");
const minutesInput = document.querySelector("#minutesInput");
const secondsInput = document.querySelector("#secondsInput");
const alarmSound = new Audio('sounds/cat.mp3'); // Ensure this path matches your sound file

let startTime;
let elapsedTime = 0;
let timerDuration = 0;
let intervalId;
let paused = true;

function startTimer() {
    if (paused) {
        const hours = parseInt(hoursInput.value) || 0;
        const minutes = parseInt(minutesInput.value) || 0;
        const seconds = parseInt(secondsInput.value) || 0;
        
        timerDuration = (hours * 3600 + minutes * 60 + seconds) * 1000;
        if (timerDuration <= 0) {
            alert("Please enter a valid time!");
            return;
        }
        paused = false;
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateTime, 100);
    }
}

function pauseTimer() {
    if (!paused) {
        clearInterval(intervalId);
        paused = true;
    }
}

function resetTimer() {
    clearInterval(intervalId);
    elapsedTime = 0;
    paused = true;
    updateTimeDisplay(0);
    hoursInput.value = "";
    minutesInput.value = "";
    secondsInput.value = "";
    alarmSound.pause();
    alarmSound.currentTime = 0;
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(timerDuration - elapsedTime, 0);
    updateTimeDisplay(remainingTime);
    
    if (remainingTime <= 0) {
        clearInterval(intervalId);
        alarmSound.play().catch(e => console.error('Audio playback failed:', e));
        alert("Time's up! 🐾");
    }
}

function updateTimeDisplay(time) {
    const hrs = String(Math.floor(time / 3600000)).padStart(2, '0');
    const mins = String(Math.floor((time % 3600000) / 60000)).padStart(2, '0');
    const secs = String(Math.floor((time % 60000) / 1000)).padStart(2, '0');
    timeDisplay.textContent = `${hrs}:${mins}:${secs}`;
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

updateTimeDisplay(0);
