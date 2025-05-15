let low = 1;
let high = 31;
let guess;
let steps = 0;
let stepHistory = [];

const questionEl = document.getElementById('question');
const resultEl = document.getElementById('result');
const stepsEl = document.getElementById('steps');
const startBtn = document.getElementById('startBtn');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const correctBtn = document.getElementById('correctBtn');

function initGame() {
    low = 1;
    high = 31;
    steps = 0;
    stepHistory = [];
    updateStepsDisplay();

    startBtn.disabled = true;
    yesBtn.disabled = false;
    noBtn.disabled = false;
    correctBtn.disabled = false;

    makeGuess();
}

function makeGuess() {
    guess = Math.floor((low + high) / 2);
    steps++;

    stepHistory.push({
        step: steps,
        low: low,
        high: high,
        guess: guess
    });

    updateStepsDisplay();
    questionEl.textContent = `Is your birthday before the ${guess}${getOrdinalSuffix(guess)} of the month?`;
}

function getOrdinalSuffix(num) {
    const j = num % 10;
    const k = num % 100;
    if (j === 1 && k !== 11) return 'st';
    if (j === 2 && k !== 12) return 'nd';
    if (j === 3 && k !== 13) return 'rd';
    return 'th';
}

function updateStepsDisplay() {
    let html = '<h3>Binary Search Steps</h3>';
    if (stepHistory.length === 0) {
        html += '<p>No steps yet.</p>';
    } else {
        stepHistory.forEach(step => {
            html += `
                <div class="step">
                    Step ${step.step}: Low=${step.low}, High=${step.high} → Guess=${step.guess}
                </div>
            `;
        });
    }
    stepsEl.innerHTML = html;
}

startBtn.addEventListener('click', initGame);

yesBtn.addEventListener('click', () => {
    // Yes = Earlier
    if (guess <= low) {
        resultEl.textContent = "Hmm, that doesn't make sense. Did you answer correctly?";
        endGame();
        return;
    }
    high = guess - 1;
    if (low > high) {
        resultEl.textContent = "I think you might have made a mistake in your answers.";
        endGame();
        return;
    }
    makeGuess();
});

noBtn.addEventListener('click', () => {
    // No = Later
    if (guess >= high) {
        resultEl.textContent = "Hmm, that doesn't make sense. Did you answer correctly?";
        endGame();
        return;
    }
    low = guess + 1;
    if (low > high) {
        resultEl.textContent = "I think you might have made a mistake in your answers.";
        endGame();
        return;
    }
    makeGuess();
});

correctBtn.addEventListener('click', () => {
    resultEl.textContent = `Great! I found your birthday in ${steps} steps. It's the ${guess}${getOrdinalSuffix(guess)}.`;
    endGame();
});

function endGame() {
    yesBtn.disabled = true;
    noBtn.disabled = true;
    correctBtn.disabled = true;
    startBtn.disabled = false;
}

