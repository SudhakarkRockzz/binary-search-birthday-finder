// Game elements
const startBtn = document.getElementById('start-btn');
const gameControls = document.getElementById('game-controls');
const questionDiv = document.getElementById('question');
const dateDisplay = document.getElementById('date-display');
const attemptsDiv = document.getElementById('attempts');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const gameContainer = document.getElementById('game-container');
const calendar = document.getElementById('calendar');
const cake = document.getElementById('cake');
const nameInputContainer = document.getElementById('name-input-container');
const nameInput = document.getElementById('name-input');
const nameSubmitBtn = document.getElementById('name-submit-btn');
const birthdayImage = document.getElementById('birthday-image');

// Game variables
let min = 1;
let max = 31;
let currentGuess;
let attempts = 0;
let guessedDates = [];
let userName = "";

// Event listeners
yesBtn.addEventListener('click', () => handleResponse('yes'));
noBtn.addEventListener('click', () => handleResponse('no'));
nameSubmitBtn.addEventListener('click', () => {
    userName = nameInput.value.trim();
    if (userName !== "") {
        nameInputContainer.style.display = 'none';
        startGame();
    } else {
        alert("Please enter your name before starting the game.");
    }
});

// Initialize calendar
function initCalendar() {
    calendar.innerHTML = '';
    for (let i = 1; i <= 31; i++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'day-cell';
        dayCell.textContent = i;
        dayCell.id = `day-${i}`;
        calendar.appendChild(dayCell);
    }
}

function startGame() {
    // Reset game state
    min = 1;
    max = 31;
    attempts = 0;
    guessedDates = [];
    cake.style.display = 'none';
    birthdayImage.style.display = 'none';

    // Initialize calendar
    initCalendar();

    // UI updates
    startBtn.style.display = 'none';
    gameControls.style.display = 'block';
    attemptsDiv.textContent = '';

    // Make first guess
    makeGuess();
}

function makeGuess() {
    // Calculate new guess (middle of current range)
    currentGuess = Math.floor((min + max) / 2);
    attempts++;
    guessedDates.push(currentGuess);

    // Update calendar display
    updateCalendar();

    // Add flip animation
    dateDisplay.classList.add('flip-animation');
    setTimeout(() => {
        dateDisplay.textContent = currentGuess;
        dateDisplay.classList.remove('flip-animation');
    }, 300);

    // Update UI
    attemptsDiv.textContent = `Attempt ${attempts}`;

    // 3D tilt effect
    gameContainer.style.transform = `rotateX(${attempts * 2}deg) rotateY(${attempts * 1}deg)`;

    // Check if we've narrowed it down to one number
    if (min === max) {
        endGame(true);
    }
}

function updateCalendar() {
    // Reset all cells
    document.querySelectorAll('.day-cell').forEach(cell => {
        cell.classList.remove('current', 'guessed');
    });

    // Mark guessed dates
    guessedDates.forEach(date => {
        const cell = document.getElementById(`day-${date}`);
        if (cell) cell.classList.add('guessed');
    });

    // Highlight current guess
    const currentCell = document.getElementById(`day-${currentGuess}`);
    if (currentCell) currentCell.classList.add('current');
}

function handleResponse(response) {
    if (response === 'yes') {
        min = currentGuess + 1;
    } else {
        max = currentGuess - 1;
    }

    // Check for inconsistencies
    if (min > max) {
        endGame(false);
        return;
    }

    makeGuess();
}

function endGame(success) {
    if (success) {
        dateDisplay.classList.add('bounce-animation');
        questionDiv.textContent = `Happy Birthday, ${userName}!`;
        attemptsDiv.textContent = `Found your date in ${attempts} guesses!`;
        showCake();
        createConfetti();
        birthdayImage.style.display = 'block';
    } else {
        questionDiv.textContent = "Wait, that can't be right...";
        attemptsDiv.textContent = "Did you change your number?";
    }

    gameControls.style.display = 'none';
    startBtn.style.display = 'inline-block';
    startBtn.textContent = 'Play Again';

    // Reset 3D tilt
    setTimeout(() => {
        gameContainer.style.transform = 'none';
    }, 1000);
}

function showCake() {
    cake.style.display = 'block';
}

function createConfetti() {
    const colors = ['#e74c3c', '#2ecc71', '#3498db', '#f1c40f', '#9b59b6'];
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = `${Math.random() * 2 + 1}s`;
        document.body.appendChild(confetti);

        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}
