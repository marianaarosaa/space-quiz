const questions = [
    {
        question: "What was the first artificial satellite launched into space?",
        answers: [
            { text: "Sputnik 1", correct: true },
            { text: "Voyager 1", correct: false },
            { text: "Apollo 11", correct: false },
            { text: "Hubble", correct: false },
        ],
    },

    {
        question: "Who was the first person to step on the Moon?",
        answers: [
            { text: "Yuri Gagarin", correct: false },
            { text: "Neil Armstrong", correct: true },
            { text: "Buzz Aldrin", correct: false },
            { text: "John Glenn", correct: false },
        ],
    },

    {
        question: "What's the largest star in our solar system?",
        answers: [
            { text: "Saturn", correct: false },
            { text: "Venus", correct: false },
            { text: "Sun", correct: true },
            { text: "Jupiter", correct: false },
        ],
    },

    {
        question: "What is the name of the galaxy closest to the Milky Way?",
        answers: [
            { text: "Magellanic", correct: false },
            { text: "Triangulum", correct: false },
            { text: "Centaurus", correct: false },
            { text: "Andromeda", correct: true },
        ],
    },

    {
        question: "What is the space probe that sent the first images of Pluto?",
        answers: [
            { text: "Voyager", correct: false },
            { text: "New Horizons", correct: true },
            { text: "Cassini", correct: false },
            { text: "Curiosity", correct: false },
        ],
    },
];

let currentQuestionIndex = 0;
let userScore = 0;

const startButtonEl = document.querySelector(".start-btn");
const welcomeScreenEl = document.querySelector(".welcome-screen");
const quizScreenEl = document.querySelector(".quiz-screen");
const questionEl = document.querySelector(".question");
const answersButtons = document.querySelector(".answers-container");
const nextButtonEl = document.querySelector(".next-btn");

startButtonEl.addEventListener("click", startQuiz);

function startQuiz() {
    welcomeScreenEl.style.display = "none";
    // quizScreenEl.style.display = "block";
    quizScreenEl.style.display = "flex";
    currentQuestionIndex = 0;
    userScore = 0;
    nextButtonEl.innerHTML = "Next";
    nextButtonEl.style.display = "none";
    displayQuestion();
}

function displayQuestion() {
    resetContainer();
    questionEl.textContent = questions[currentQuestionIndex].question;
    questions[currentQuestionIndex].answers.forEach((answer) => {
        const buttonEl = document.createElement("button");
        buttonEl.innerHTML = answer.text;
        buttonEl.classList.add("ans-btn");
        answersButtons.appendChild(buttonEl);

        if (answer.correct) {
            buttonEl.dataset.correctAns = answer.correct;
        }

        // console.log(buttonEl);

        buttonEl.addEventListener("click", checkAnswer);
    });
}

function checkAnswer(e) {
    const selectedButton = e.target;
    if (selectedButton.dataset.correctAns) {
        userScore++;
        console.log(userScore);
        selectedButton.classList.add("correct-ans");
    } else {
        selectedButton.classList.add("wrong-ans");
    }

    Array.from(answersButtons.children).forEach((button) => {
        if (button.dataset.correctAns === "true") {
            button.classList.add("correct-ans");
        }
        button.disabled = "true";
    });

    nextButtonEl.style.display = "block";
}

function displayResult() {
    resetContainer();
    questionEl.innerHTML = `Quiz is Completed! <br> You Scored <span class="score">${userScore}/${questions.length}</span> ☼`;

    nextButtonEl.innerHTML = "Try again";
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
        nextButtonEl.style.display = "none";
    } else {
        displayResult();
    }
}

nextButtonEl.addEventListener("click", function () {
    if (currentQuestionIndex < questions.length) {
        nextQuestion();
    } else {
        startQuiz();
    }
});

function resetContainer() {
    questionEl.textContent = "";
    answersButtons.innerHTML = "";
}