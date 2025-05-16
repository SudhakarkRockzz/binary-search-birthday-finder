const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
let currentIndex = Math.floor(Math.random() * days.length);

function displayCurrentDate() {
  const dateDisplay = document.getElementById("date-display");
  const day = days[currentIndex];

  const fixedMonth = 2; // March (0 = Jan, 1 = Feb, 2 = Mar)
  const year = 2025;

  const dateObj = new Date(year, fixedMonth, parseInt(day));
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  dateDisplay.textContent = dateObj.toLocaleDateString(undefined, options);
}

function checkGuess() {
  const guessInput = document.getElementById("guess-input");
  const result = document.getElementById("result");
  const guess = guessInput.value;

  if (guess === days[currentIndex]) {
    result.textContent = "🎉 Correct! Happy Birthday!";
    result.style.color = "green";
  } else {
    result.textContent = "❌ Try again!";
    result.style.color = "red";
  }

  currentIndex = Math.floor(Math.random() * days.length);
  displayCurrentDate();
}

window.onload = () => {
  displayCurrentDate();
};

