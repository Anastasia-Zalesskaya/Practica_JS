let currentQuestionIndex = 0;
let score = 0;
let timer;

const questionText = document.getElementById('question-text');
const answerCheckboxesContainer = document.getElementById('answer-checkboxes');
const nextButton = document.getElementById('next-button');
const restartButton = document.getElementById('restart-button');
const scoreContainer = document.getElementById('score-container');
const questionCounter = document.getElementById('question-counter');
const timerContainer = document.getElementById('timer');

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.classList.add('hide');
  restartButton.classList.add('hide');
  scoreContainer.innerText = '';
  updateQuestionCounter();
  showQuestion(quizData[currentQuestionIndex]);
}

function showQuestion(questionData) {
  clearInterval(timer); 
  timerContainer.innerText = ''; 

  questionText.innerText = questionData.question;
  clearAnswerCheckboxes();
  questionData.answers.forEach((answer) => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = answer.text;
    checkbox.id = 'check';
    checkbox.dataset.correct = answer.correct;
    checkbox.dataset.score = answer.score;
    checkbox.addEventListener('change', () => toggleCheckbox(checkbox));
    answerCheckboxesContainer.appendChild(checkbox);

    const label = document.createElement('label');
    label.innerText = answer.text;
    answerCheckboxesContainer.appendChild(label);

    answerCheckboxesContainer.appendChild(document.createElement('br'));
  });
  let timeRemaining = timeLimit;
  timerContainer.innerText = `Время: ${timeRemaining} сек.`;
  timer = setInterval(() => {
    timeRemaining--;
    timerContainer.innerText = `Время: ${timeRemaining} сек.`;

    if (timeRemaining <= 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
  nextButton.disabled = true;
}

function clearAnswerCheckboxes() {
  while (answerCheckboxesContainer.firstChild) {
    answerCheckboxesContainer.removeChild(answerCheckboxesContainer.firstChild);
  }
}

function toggleCheckbox() {
  const checkboxes = answerCheckboxesContainer.querySelectorAll('input[type="checkbox"]');
  const atLeastOneChecked = Array.from(checkboxes).some(cb => cb.checked);

  checkboxes.forEach((cb) => {
    cb.disabled = cb.checked;
  });

  nextButton.classList.remove('hide');
  nextButton.disabled = !atLeastOneChecked;
}

function nextQuestion() {
  const checkboxes = answerCheckboxesContainer.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    const label = checkbox.nextElementSibling;

    if (checkbox.checked) {
      label.classList.add(checkbox.dataset.correct === 'true' ? 'correct' : 'incorrect');
      score += parseFloat(checkbox.dataset.score);
    }
  });

  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    showQuestion(quizData[currentQuestionIndex]);
    nextButton.classList.add('hide');
    clearCheckboxStyles();
    questionCounter.innerText = currentQuestionIndex + 1;
  } else {
    showResult();
  }
  saveState();
}

function showResult() {
  nextButton.classList.add('hide');
  restartButton.classList.remove('hide');
  scoreContainer.innerText = `Вы набрали ${score} из ${quizData.length} баллов`;
  clearInterval(timer);
}

function restartQuiz() {
  startQuiz();
  saveState();
}

function updateQuestionCounter() {
  questionCounter.innerText = currentQuestionIndex + 1;
}

function clearCheckboxStyles() {
  const checkboxes = answerCheckboxesContainer.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    checkbox.checked = false;
    checkbox.disabled = false;
    const label = checkbox.nextElementSibling;
    label.classList.remove('correct', 'incorrect');
  });
}

function saveState() {
  localStorage.setItem('quizState', JSON.stringify({
    currentQuestionIndex,
    score
  }));
}

function loadState() {
  const savedState = localStorage.getItem('quizState');
  if (savedState) {
    const { currentQuestionIndex: savedIndex, score: savedScore } = JSON.parse(savedState);
    currentQuestionIndex = savedIndex;
    score = savedScore;
    updateQuestionCounter();
    if (currentQuestionIndex < quizData.length) {
      nextButton.classList.add('hide');
      showQuestion(quizData[currentQuestionIndex]);
    } else {
      showResult();
    }
  } else {
    startQuiz();
  }
}

loadState();