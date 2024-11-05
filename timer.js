let timer;
let timeLeft = 00;
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

// Add event listener for keydown event
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        event.preventDefault(); // Prevent scrolling the page
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
    timeLeft = 00;
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
    // Check if the pressed key is the Escape key
    if (event.key === "Escape") {
        const popup = document.getElementById("popup"); // Get the pop-up div
        if (popup) {
            popup.classList.add('hidden');

        }
    }
}
document.addEventListener("keydown", hidePopup);

const svgElement = document.getElementById('fenter');

// Event listener for click on the SVG icon
svgElement.addEventListener('click', () => {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        document.documentElement.requestFullscreen();
    }
});

// Function to update the SVG display based on fullscreen state
function updateSvgDisplay() {
    if (document.fullscreenElement) {
        svgElement.style.display = 'none';  // Hide the icon when in fullscreen
    } else {
        svgElement.style.display = 'block';  // Show the icon when exiting fullscreen
    }
}

// Listen for fullscreen change events
document.addEventListener('fullscreenchange', updateSvgDisplay);

// Initial state check
updateSvgDisplay();
