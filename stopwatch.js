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

// using 'space' button to start the stopwatch
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        event.preventDefault();
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
        playButton.style.display = 'none';  
        pauseButton.style.display = 'inline';
        stopButton.style.display = 'inline'; 
        
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
        playButton.style.display = 'block'; 
        pauseButton.style.display = 'none'; 
    }
}

function stopTimer() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    updateDisplay();
    playButton.style.display = 'inline';
    pauseButton.style.display = 'none'; 
    stopButton.style.display = 'none';  
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
