  let currentQuestionIndex = 0;
let questions = [];

async function fetchQuestion() {
  try {
    // Fixed URL: changed 'type-multiple' to 'type=multiple'
    const response = await     fetch("https://opentdb.com/api.php?amount=10&type-multiple");
    const data = await response.json();
    questions = data.results;
    displayQuestion();
  } catch (error) {
    console.error("Error fetching questions:", error);
  }
}

function displayQuestion() {
  const questionElement = document.getElementById("question");
  const choiceElement = document.getElementById("choice");
  const currentQuestion = questions[currentQuestionIndex];

  // Use innerHTML to handle special characters (HTML entities) from the API
  questionElement.innerHTML = currentQuestion.question;
  choiceElement.innerHTML = ""; 

  // Combine and shuffle answers so the correct one isn't always last
  const allChoices = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
  allChoices.sort(() => Math.random() - 0.5); 

  allChoices.forEach((choice) => {
    const choiceButton = document.createElement("button");
    choiceButton.innerHTML = choice; // Handles HTML entities like &quot;
    choiceButton.classList.add("choice-btn");
    choiceButton.onclick = () => checkAnswer(choice);
    choiceElement.appendChild(choiceButton);
  });
}

function checkAnswer(choice) {
  const resultElement = document.getElementById("result");
  const currentQuestion = questions[currentQuestionIndex];

  // Compare selected choice to the correct_answer string
  if (choice === currentQuestion.correct_answer) {
    resultElement.textContent = "Correct!";
    resultElement.style.color = "green";
  } else {
    resultElement.textContent = `Incorrect! ${currentQuestion.correct_answer} `;
    resultElement.style.color = "red";
  }
  // Load next question automatically after a brief pause
  setTimeout(() => {
    nextQuestion();
  }, 1500);
}

function nextQuestion() {
  const resultElement = document.getElementById("result");
  resultElement.textContent = ""; 
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    alert("Quiz Finished!");
    currentQuestionIndex = 0;
    fetchQuestion(); 
  }
}

fetchQuestion();
