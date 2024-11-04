let timer;
let isRunning = false;
let elapsedTime = 0;

const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');
const stopButton = document.getElementById('stop');
const hrDisplay = document.getElementById('hr');
const minDisplay = document.getElementById('min');
const secDisplay = document.getElementById('sec');

playButton.addEventListener('click', playTimer);
pauseButton.addEventListener('click', pauseTimer);
stopButton.addEventListener('click', stopTimer);

// Add event listener for keydown event
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        event.preventDefault(); // Prevent scrolling the page
        if (isRunning) {
            pauseTimer();
        } else {
            playTimer();
        }
    }
});

function playTimer() {
    if (!isRunning) {
        isRunning = true;
        playButton.style.display = 'none';  // Hide Play button
        pauseButton.style.display = 'inline'; // Show Pause button
        stopButton.style.display = 'inline';  // Show Stop button
        
        timer = setInterval(() => {
            elapsedTime++;
            updateDisplay();
        }, 1000);
    }
}

function pauseTimer() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        playButton.style.display = 'block'; // Show Play button
        pauseButton.style.display = 'none';   // Hide Pause button
    }
}

function stopTimer() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    updateDisplay();
    playButton.style.display = 'inline'; // Show Play button
    pauseButton.style.display = 'none';   // Hide Pause button
    stopButton.style.display = 'none';    // Hide Stop button
}

function updateDisplay() {
    const hours = Math.floor(elapsedTime / 3600);
    const minutes = Math.floor((elapsedTime % 3600) / 60);
    const seconds = elapsedTime % 60;

    hrDisplay.textContent = String(hours).padStart(2, '0');
    minDisplay.textContent = String(minutes).padStart(2, '0');
    secDisplay.textContent = String(seconds).padStart(2, '0');
}

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