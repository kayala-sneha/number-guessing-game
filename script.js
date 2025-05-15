// Game variables
let randomNumber = Math.floor(Math.random() * 100) + 1; // Random number between 1 and 100
let attemptsLeft = 10;

// DOM elements
const guessForm = document.getElementById('guess-form');
const guessInput = document.getElementById('guess-input');
const message = document.getElementById('message');
const attemptsDisplay = document.getElementById('attempts');
const restartBtn = document.getElementById('restart-btn');

// Function to display a message
function displayMessage(text, color = 'black') {
  message.textContent = text;
  message.style.color = color;
}

// Function to handle the guess
function handleGuess(event) {
  event.preventDefault(); // Prevent form submission

  const userGuess = parseInt(guessInput.value);

  if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
    displayMessage('Please enter a valid number between 1 and 100.', 'red');
    return;
  }

  if (userGuess === randomNumber) {
    displayMessage('🎉 Congratulations! You guessed the correct number!', 'green');
    endGame();
  } else {
    attemptsLeft--;
    attemptsDisplay.textContent = attemptsLeft;

    if (attemptsLeft === 0) {
      displayMessage(`💔 Game Over! The correct number was ${randomNumber}.`, 'red');
      endGame();
    } else if (userGuess < randomNumber) {
      displayMessage('Too low! Try again.', 'orange');
    } else {
      displayMessage('Too high! Try again.', 'orange');
    }
  }

  guessInput.value = ''; // Clear the input field
}

// Function to end the game
function endGame() {
  guessInput.disabled = true;
  guessForm.querySelector('button').disabled = true;
  restartBtn.style.display = 'block';
}

// Function to restart the game
function restartGame() {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  attemptsLeft = 10;
  attemptsDisplay.textContent = attemptsLeft;
  guessInput.disabled = false;
  guessForm.querySelector('button').disabled = false;
  restartBtn.style.display = 'none';
  displayMessage('Guess a number between 1 and 100.');
  guessInput.value = '';
}

// Event listeners
guessForm.addEventListener('submit', handleGuess);
restartBtn.addEventListener('click', restartGame);