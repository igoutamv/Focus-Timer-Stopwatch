let timer;
let timeLeft = 30;
let isRunning = false;

const hrDisplay = document.getElementById('hr');
const minDisplay = document.getElementById('min');
const secDisplay = document.getElementById('sec');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const setTimeButton = document.getElementById('set_time');
const popup = document.getElementById('popup');
const setButton = document.getElementById('set');
const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        event.preventDefault(); 
        if (isRunning) {
            pauseTimer();
        } else {
            startTimer();
        }
    }
});


function updateDisplay() {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    hrDisplay.textContent = String(hours).padStart(2, '0');
    minDisplay.textContent = String(minutes).padStart(2, '0');
    secDisplay.textContent = String(seconds).padStart(2, '0');
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                clearInterval(timer);
                isRunning = false;
                pauseButton.classList.add('hidden');
                startButton.classList.remove('hidden');
            }
        }, 1000);
        startButton.classList.add('hidden');
        pauseButton.classList.remove('hidden');
    }
}

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
    startButton.classList.remove('hidden');
    pauseButton.classList.add('hidden');
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    timeLeft = 30;
    updateDisplay();
    startButton.classList.remove('hidden');
    pauseButton.classList.add('hidden');
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

setTimeButton.addEventListener('click', () => {
    popup.classList.remove('hidden');
});


setButton.addEventListener('click', () => {
    const hours = parseInt(hoursInput.value, 10) || 0;
    const minutes = parseInt(minutesInput.value, 10) || 0;
    const seconds = parseInt(secondsInput.value, 10) || 0;
    timeLeft = hours * 3600 + minutes * 60 + seconds;
    updateDisplay();
    popup.classList.add('hidden');
});
updateDisplay();

// Function to hide the pop-up div
function hidePopup(event) {
    if (event.key === "Escape") {
        const popup = document.getElementById("popup");
        if (popup) {
            popup.classList.add('hidden');

        }
    }
}
document.addEventListener("keydown", hidePopup);

const svgElement = document.getElementById('fenter');

svgElement.addEventListener('click', () => {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        document.documentElement.requestFullscreen();
    }
});

function updateSvgDisplay() {
    if (document.fullscreenElement) {
        svgElement.style.display = 'none';  
    } else {
        svgElement.style.display = 'block'; 
    }
}

document.addEventListener('fullscreenchange', updateSvgDisplay);

updateSvgDisplay();
