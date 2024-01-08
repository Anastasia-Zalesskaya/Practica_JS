const quizData = [
    {
        question: "How many planets are in the solar system?",
        answers: [
            { text: "8", correct: true, score: 1 },
            { text: "9", correct: false, score: 0 },
            { text: "10", correct: false, score: 0 }
        ]
    },
    {
        question: "What is the freezing point of water?",
        answers: [
            { text: "0", correct: true, score: 1 },
            { text: "-5", correct: false, score: 0 },
            { text: "-6", correct: false, score: 0 }
        ]
    },
    {
        question: "What is the longest river in the world?",
        answers: [
            { text: "Nile", correct: false, score: 0 },
            { text: "Amazon", correct: true, score: 1 },
            { text: "Yangtze", correct: false, score: 0 }
        ]
    },
    {
        question: "How many chromosomes are in the human genome?",
        answers: [
            { text: "42", correct: false, score: 0 },
            { text: "44", correct: false, score: 0 },
            { text: "46", correct: true, score: 1 }
        ]
    },
    {
        question: "Which of these characters are friends with Harry Potter? (Может быть 2 варианта ответа)",
        answers: [
            { text: "Ron Weasley", correct: true, score: 0.5 },
            { text: "Draco Malfoy", correct: false, score: 0 },
            { text: "Hermione Granger", correct: true, score: 0.5 }
        ]
    },
    {
        question: "What is the capital of Canada?",
        answers: [
            { text: "Toronto", correct: false, score: 0 },
            { text: "Ottawa", correct: true, score: 1 },
            { text: "Vancouver", correct: false, score: 0 }
        ]
    },
    {
        question: "What is the Jewish New Year called?",
        answers: [
            { text: "Hanukkah", correct: false, score: 0 },
            { text: "Yom Kippur", correct: false, score: 0 },
            { text: "Rosh Hashanah", correct: true, score: 1 }
        ]
    }
];

const timeLimit = 10; 