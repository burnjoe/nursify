//No randomization 
// Not deducted -2 if the user has score 0 
console.log("hello world");
const question = document.querySelector("#question");
const choices = document.querySelectorAll(".choice-text");
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");
const timerDisplay = document.getElementById("timer"); // Reference to timer element

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let countdown; // Declaring countdown variable

let questions = [
  {
    question:
      " You are assessing Patient's neck : Lymph nodes should not be ______ in a healthy adult patient",
    choice1: "Tender",
    choice2: "Too close together",
    choice3: "Palpable ",
    choice4: "Under muscle masses.",
    answer: 1,
  },
  {
    question:
      "To facilitate palpation of the thyroid gland, you instruct your patient to:",
    choice1: "Rotate the neck.",
    choice2: "Hyperextend the neck.",
    choice3: "Swallow",
    choice4: "Hold your breath",
    answer: 3,
  },
  {
    question:
      "When examining a client's thyroid gland, the nurse ensures this equipment is readily available.",
    choice1: "Penlight",
    choice2: "Tongue depressor ",
    choice3: "Centimeter-scale ruler ",
    choice4: "Cup of water",
    answer: 4,
  },
];

const SCORE_POINTS = 10;
const MAX_QUESTIONS = 4;
const QUESTION_TIME = 10; // Time in seconds for each question

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("/end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  // Select the first question in the availableQuestions array
  currentQuestion = availableQuestions.shift();
  question.innerText = currentQuestion.question;

  choices.forEach((choice, index) => {
    choice.innerText = currentQuestion[`choice${index + 1}`];
  });

  // Reset the timer display
  timerDisplay.textContent = QUESTION_TIME;
  // Start the countdown
  startTimer(QUESTION_TIME);

  acceptingAnswers = true;
};

function startTimer(time) {
  let timer = time;
  countdown = setInterval(() => {
    timer--;
    timerDisplay.textContent = timer; // Update timer in HTML
    if (timer <= 0) {
      clearInterval(countdown);
      getNewQuestion();
    }
  }, 1000);
}

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const isCorrect = selectedAnswer == currentQuestion.answer;

    if (isCorrect) {
      incrementScore(SCORE_POINTS);
      selectedChoice.parentElement.style.backgroundColor = "green"; // Apply green background for correct answer
    } else {
      decrementScore(SCORE_POINTS); // Decrease score, ensuring it doesn't go below 0
      selectedChoice.parentElement.style.backgroundColor = "red"; // Apply red background for incorrect answer
    }

    clearInterval(countdown); // Clear the countdown when an answer is selected
    setTimeout(() => {
      selectedChoice.parentElement.style.backgroundColor = ""; // Reset background color after some time
      getNewQuestion();
    }, 1000);
  });
});

function incrementScore(num) {
  score += num;
  scoreText.innerText = score;
}

function decrementScore(num) {
  if (score > 0) {
    score = Math.max(0, score - 2);
    scoreText.innerText = score;
  }
}

startGame();





// // No randomization 
// console.log("hello world");
// const question = document.querySelector("#question");
// const choices = document.querySelectorAll(".choice-text");
// const progressText = document.querySelector("#progressText");
// const scoreText = document.querySelector("#score");
// const progressBarFull = document.querySelector("#progressBarFull");

// let currentQuestion = {};
// let acceptingAnswers = true;
// let score = 0;
// let questionCounter = 0;
// let availableQuestions = [];

// const questions = [
//   {
//     question:
//       " You are assessing Patient's neck : Lymph nodes should not be ______ in a healthy adult patient",
//     choice1: "Tender",
//     choice2: "Too close together",
//     choice3: "Palpable ",
//     choice4: "Under muscle masses.",
//     answer: 1,
//   },
//   {
//     question:
//       "To facilitate palpation of the thyroid gland, you instruct your patient to:",
//     choice1: "Rotate the neck.",
//     choice2: "Hyperextend the neck.",
//     choice3: "Swallow",
//     choice4: "Hold your breath",
//     answer: 3,
//   },
//   {
//     question:
//       "When examining a client's thyroid gland, the nurse ensures this equipment is readily available.",
//     choice1: "Penlight",
//     choice2: "Tongue depressor ",
//     choice3: "Centimeter-scale ruler ",
//     choice4: "Cup of water",
//     answer: 4,
//   },
  
// ];

// const SCORE_POINTS = 10;
// const MAX_QUESTIONS = 4;

// startGame = () => {
//   questionCounter = 0;
//   score = 0;
//   availableQuestions = [...questions];
//   getNewQuestion();
// };

// getNewQuestion = () => {
//   if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
//     localStorage.setItem("mostRecentScore", score);
//     return window.location.assign("/end.html");
//   }

//   const questionIndex = 0; // No randomization, always pick the first question
//   currentQuestion = availableQuestions[questionIndex];
//   questionCounter++;
//   progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
//   progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

//   question.innerText = currentQuestion.question;

//   choices.forEach((choice, index) => {
//     choice.innerText = currentQuestion[`choice${index + 1}`];
//   });

//   availableQuestions.splice(questionIndex, 1);

//   acceptingAnswers = true;
// };

// choices.forEach((choice) => {
//   choice.addEventListener("click", (e) => {
//     if (!acceptingAnswers) return;
    
//     acceptingAnswers = false;
//     const selectedChoice = e.target;
//     const selectedAnswer = selectedChoice.dataset["number"];

//     const isCorrect = selectedAnswer == currentQuestion.answer;

//     if (isCorrect) {
//       incrementScore(SCORE_POINTS);
//       selectedChoice.parentElement.style.backgroundColor = "green"; // Apply green background for correct answer
//     } else {
//       decrementScore(2);
//       selectedChoice.parentElement.style.backgroundColor = "red"; // Apply red background for incorrect answer
//     }

//     setTimeout(() => {
//       selectedChoice.parentElement.style.backgroundColor = ""; // Reset background color after some time
//       getNewQuestion();
//     }, 1000);
//   });
// });

// function incrementScore(num) {
//   score += num;
//   scoreText.innerText = score;
// }

// function decrementScore(num) {
//   score -= num;
//   scoreText.innerText = score;
// }

// startGame();
