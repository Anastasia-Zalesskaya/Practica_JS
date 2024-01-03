const quizData = [
    {
        question: "How many planets are in the solar system?",
        answers: [
            { text: "8", correct: true },
            { text: "9", correct: false },
            { text: "10", correct: false }
        ]
    },
    {
        question: "What is the freezing point of water?",
        answers: [
            { text: "0", correct: true },
            { text: "-5", correct: false },
            { text: "-6", correct: false }
        ]
    },
    {
        question: "What is the longest river in the world?",
        answers: [
            { text: "Nile", correct: false },
            { text: "Amazon", correct: true },
            { text: "Yangtze", correct: false }
        ]
    },
    {
        question: "How many chromosomes are in the human genome?",
        answers: [
            { text: "42", correct: false },
            { text: "44", correct: false },
            { text: "46", correct: true }
        ]
    },
    {
        question: "Which of these characters are friends with Harry Potter? (Может быть 2 варианта ответа)",
        answers: [
            { text: "Ron Weasley", correct: true },
            { text: "Draco Malfoy", correct: false },
            { text: "Hermione Granger", correct: true }
        ]
    },
    {
        question: "What is the capital of Canada?",
        answers: [
            { text: "Toronto", correct: false },
            { text: "Ottawa", correct: true },
            { text: "Vancouver", correct: false }
        ]
    },
    {
        question: "What is the Jewish New Year called?",
        answers: [
            { text: "Hanukkah", correct: false },
            { text: "Yom Kippur", correct: false },
            { text: "Rosh Hashanah", correct: true }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionContainer = document.getElementById('question-container');
const answerButtonsContainer = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');
const restartButton = document.getElementById('restart-button');
const scoreContainer = document.getElementById('score-container');
const questionCounter = document.getElementById('question-counter');

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.classList.add('hide');
    restartButton.classList.add('hide');
    scoreContainer.innerText = '';
    showQuestion(quizData[currentQuestionIndex]);
    updateQuestionCounter();
}

function showQuestion(questionData) {
    questionContainer.innerText = questionData.question;
    clearAnswerButtons();
    questionData.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer));
        answerButtonsContainer.appendChild(button);
    });
}

function clearAnswerButtons() {
    while (answerButtonsContainer.firstChild) {
        answerButtonsContainer.removeChild(answerButtonsContainer.firstChild);
    }
}

function selectAnswer(answer) {
    const buttons = answerButtonsContainer.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.disabled = true;
    });

    if (answer.correct) {
        buttons.forEach(btn => {
            if (btn.innerText === answer.text) {
                btn.style.backgroundColor = '#3CB371'; 
            }
        });
        score++;
    } else {
        buttons.forEach(btn => {
            if (btn.innerText === answer.text) {
                btn.style.backgroundColor = '#800000'; 
            }
        });
    }

    nextButton.classList.remove('hide');
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        showQuestion(quizData[currentQuestionIndex]);
        nextButton.classList.add('hide');
        const buttons = answerButtonsContainer.querySelectorAll('.btn');
        buttons.forEach(btn => {
            btn.style.backgroundColor = ''; 
            btn.disabled = false; 
        });
        questionCounter.innerText = currentQuestionIndex + 1; 
    } else {
        showResult();
    }
}

function showResult() {
    nextButton.classList.add('hide');
    restartButton.classList.remove('hide');
    scoreContainer.innerText = `Вы ответили на ${score} из ${quizData.length} вопросов правильно`;
}

function restartQuiz() {
    startQuiz();
}

function updateQuestionCounter() {
    questionCounter.innerText = currentQuestionIndex + 1; 
}

startQuiz();