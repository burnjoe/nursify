console.log("hello world");
const question = document.querySelector("#question");
const choices = document.querySelectorAll(".choice-text");
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");
const timerDisplay = document.getElementById("timer");
const imgElement = document.getElementById("img");
const choiceImages = document.querySelectorAll("#choice-image");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let correctAnswers = 0; // Number of correct answers of players (apart from score)
let questionCounter = 0;
let availableQuestions = [];
let countdown; // Declaring countdown variable

let questions = [
  //1
  {
    question:
      " You are assessing Patient's neck : Lymph nodes should not be ______ in a healthy adult patient",
    img: "",
    choice1: "Tender",
    choice1_img: "",
    choice2: "Too close together",
    choice2_img: "",
    choice3: "Palpable ",
    choice3_img: "",
    choice4: "Under muscle masses.",
    choice4_img: "",
    answer: 1,
  },
  //2
  {
    question:
      "Now, you will examine Ana's thyroid gland: To facilitate palpation of the thyroid gland, you instruct Ana to:",
    img: "",
    choice1: "Rotate the neck.",
    choice1_img: "",
    choice2: "Hyperextend the neck.",
    choice2_img: "",
    choice3: "Swallow",
    choice3_img: "",
    choice4: "Hold your breath",
    choice4_img: "",
    answer: 3,
  },

  //3
  {
    question:
      "When examining a client's thyroid gland, the nurse ensures this equipment is readily available.",
    img: "",
    choice1: "Penlight",
    choice1_img: "/images/quiz/q3-A.png",
    choice2: "Tongue depressor ",
    choice2_img: "/images/quiz/q3-B.png",
    choice3: "Centimeter-scale ruler ",
    choice3_img: "/images/quiz/q3-C.png",
    choice4: "Cup of water",
    choice4_img: "/images/quiz/q3-D.png",
    answer: 4,
  },
  //4
  {
    question:
      "Ms. May reported a fluid-filled skin lesion on her right arm. Upon inspection, the nurse noticed that the lesion size was </= to 1cm. What type of skin lesion does Ms. May have? ",
    img: "",
    choice1: "papule ",
    choice1_img: "/images/quiz/q4-A.png",
    choice2: "vesicle",
    choice2_img: "/images/quiz/q4-B.png",
    choice3: "pustule ",
    choice3_img: "/images/quiz/q4-C.png",
    choice4: "macule ",
    choice4_img: "/images/quiz/q4-D.png",
    answer: 2,
  },
  //5
  {
    question: "What does the condition in the picture indicate? ",
    img: "/images/quiz/q5-question.png",
    choice1: "not-intact cranial nerve  ",
    choice1_img: "",
    choice2: "damage to the frontal lobe of the brain. ",
    choice2_img: "",
    choice3: "poor oxygenation  ",
    choice3_img: "",
    choice4: "dehydration ",
    choice4_img: "",
    answer: 3,
  },
  //6
  {
    question:
      " You will assess Mark’s cranial nerve. You placed a tongue depressor on her posterior tongue and Mark gags.The gag reflex is controlled by which of the following cranial nerves?  ",
    img: "/images/quiz/q6-question.png",
    choice1: "IX and X  ",
    choice1_img: "",
    choice2: "IV and VI ",
    choice2_img: "",
    choice3: "VIII and IX ",
    choice3_img: "",
    choice4: "I and II  ",
    choice4_img: "",
    answer: 1,
  },
  //7
  {
    question:
      "Nurse Regie when doing his head-to-toe assessment on his client asks him to smile, frown, wrinkle his forehead, puff cheeks, raise eyebrows, and close his eyelids. In doing this the nurse is assessing which cranial nerve? ",
    img: "",
    choice1: "cranial nerve 5  ",
    choice1_img: "",
    choice2: "cranial nerve 7 ",
    choice2_img: "",
    choice3: "cranial nerve 3  ",
    choice3_img: "",
    choice4: "cranial nerve 4  ",
    choice4_img: "",
    answer: 2,
  },
  //8
  {
    question:
      "When a nurse assesses a client's vision using either the Snellen chart or newspaper finger-wiggle test which cranial nerve are they assessing?  ",
    img: "",
    choice1: "cranial nerve 5  ",
    choice1_img: "",
    choice2: "cranial nerve 7 ",
    choice2_img: "",
    choice3: "cranial nerve 3  ",
    choice3_img: "",
    choice4: "cranial nerve 2  ",
    choice4_img: "",
    answer: 2,
    answer: 4,
  },
  //9
  {
    question:
      "Nurse George has just assessed his client's articulation, language, and other aspects of his speech. In doing these which cranial nerves has he just assessed?  ",
    img: "",
    choice1: "cranial nerves 4 and 5  ",
    choice1_img: "",
    choice2: "cranial nerves 6 and 12 ",
    choice2_img: "",
    choice3: "cranial nerves 9 and 11 ",
    choice3_img: "",
    choice4: "cranial nerves 10 and 12 ",
    choice4_img: "",
    answer: 4,
  },
  //10
  {
    question: " A balance dysfunction is probably due to which nerve:  ",
    img: "",
    choice1: "IV",
    choice1_img: "",
    choice2: "V",
    choice2_img: "",
    choice3: "VIII",
    choice3_img: "",
    choice4: " VII ",
    choice4_img: "",
    answer: 3,
  },
  //11
  {
    question:
      " When assessing a client's eyes the very first thing that a nurse should look at is?  ",
    img: "",
    choice1: "eyes internal structures",
    choice1_img: "",
    choice2: "the pupil’s reactivity to light",
    choice2_img: "",
    choice3: "eyes external structures",
    choice3_img: "",
    choice4: "color of the irises of the eye ",
    choice4_img: "",
    answer: 3,
  },
  //12
  {
    question:
      "Three things a nurse needs to check for when doing an examination on the eyes regarding the external structure is? ",
    img: "",
    choice1: "eyelash distribution, coloring, drainage ",
    choice1_img: "",
    choice2: "shape of eyes, pupils reactivity, iris's color ",
    choice2_img: "",
    choice3: "eyeslash texture, coloring, drainage ",
    choice3_img: "",
    choice4: "drainage, possible tumors, irritation  ",
    choice4_img: "",
    answer: 1,
  },
  //13
  {
    question:
      "When performing an assessment on a patient's eyes what might the nurse use the ophthalmoscope for?  ",
    img: "",
    choice1: "PERRLA ",
    choice1_img: "",
    choice2: "corneal reflex test ",
    choice2_img: "",
    choice3: "consensual light reflex test ",
    choice3_img: "",
    choice4: "red light reflex ",
    choice4_img: "",
    answer: 4,
  },
  //14
  {
    question:
      " The clinic nurse notes that the following several eye examinations, the physician has documented a diagnosis of legal blindness in the client's chart. The nurse reviews the results of the Snellen's chart test expecting to note which of the following?  ",
    img: "",
    choice1: "20/20 vision",
    choice1_img: "",
    choice2: "20/40 vision ",
    choice2_img: "",
    choice3: "20/60 vision ",
    choice3_img: "",
    choice4: "20/200 vision ",
    choice4_img: "",
    answer: 4,
  },
  //15
  {
    question: "The red light reflex is caused by the ",
    img: "",
    choice1: "refraction of light off the conjunctiva ",
    choice1_img: "",
    choice2: "reflection of light off the inner retina ",
    choice2_img: "",
    choice3: "reflection of light off the choroids layer ",
    choice3_img: "",
    choice4: "condensation of light as it passess through the aqueous humore ",
    choice4_img: "",
    answer: 2,
  },
  //16
  {
    question:
      "When examining the ear with an otoscope, the nurse notes that the tympanic membrane should appear:  ",
    img: "",
    choice1: "light pink with a slight bulge. ",
    choice1_img: "",
    choice2: "pearly gray and slightly concave. ",
    choice2_img: "",
    choice3: "pulled in at the base of the cone of light.  ",
    choice3_img: "",
    choice4: "whitish with a small fleck of light in the superior portion.  ",
    choice4_img: "",
    answer: 2,
  },
  //17
  {
    question:
      "If sound lateralizes to one ear when performing the Weber test, which of the following is occurring?  ",
    img: "",
    choice1: "sound is heard LONGER in one ear than the other.",
    choice1_img: "",
    choice2: "higher FREQUENCIES of sound are heard better in one ear ",
    choice2_img: "",
    choice3: "sound is heard LOUDER in one ear ",
    choice3_img: "",
    choice4: "electrical impulses are amplified in one ear  ",
    choice4_img: "",
    answer: 3,
  },
  //18
  {
    question:
      "The nurse is performing a voice test to assess hearing. Which of the following describes the accurate procedure for performing this test? ",
    img: "",
    choice1:
      "Stand 4 feet away from the client to ensure that the client can hear at this distance. ",
    choice1_img: "",
    choice2:
      "Whisper a statement and ask the client to repeat it while covering one ear at a time.  ",
    choice2_img: "",
    choice3: "Whisper a statement with the examiner back facing the client  ",
    choice3_img: "",
    choice4: "Whisper a statement while the client blocks both ears. ",
    choice4_img: "",
    answer: 2,
  },
  //19
  {
    question:
      " A nurse has explained her intention to conduct Weber's test and Rinne's test. Which is the following pieces of equipment will the nurse require? ",
    img: "",
    choice1: "Ophthalmoscope  ",
    choice1_img: "",
    choice2: "Otoscope",
    choice2_img: "",
    choice3: "Snellen Chart ",
    choice3_img: "",
    choice4: "Tuning Fork ",
    choice4_img: "",
    answer: 4,
  },
  //20
  {
    question:
      " Nerve deafness would most likely result from an injury or infection that damaged the: ",
    choice1: "Trochlear nerve  ",
    img: "",
    choice2: "Vagus nerve ",
    choice1_img: "",
    choice3: "Trigeminal nerve  ",
    choice3_img: "",
    choice4: "Vestibuloochlear nerve ",
    choice4_img: "",
    answer: 4,
  },
];

const SCORE_POINTS = 10;
const MAX_QUESTIONS = 20;
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
    localStorage.setItem("correctAnswers", correctAnswers);
    localStorage.setItem("totalQuestions", MAX_QUESTIONS);
    return window.location.assign("/end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  // Select the first question in the availableQuestions array
  currentQuestion = availableQuestions.shift();
  question.innerText = currentQuestion.question;

  // Toggle image visibility
  if (currentQuestion.img !== "") {
    imgElement.src = currentQuestion.img;
    imgElement.style.display = "block";
  } else {
    imgElement.style.display = "none";
  }

  choices.forEach((choice, index) => {
    choice.innerText = currentQuestion[`choice${index + 1}`];
    // Set the image source for each choice
    const imgSrc = currentQuestion[`choice${index + 1}_img`];
    choiceImages[index].src = imgSrc;
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
    timerDisplay.textContent = timer;
    if (timer <= 0) {
      clearInterval(countdown);
      getNewQuestion();
    }
  }, 1000);
}

// Add event listeners to both choice text and choice image
choices.forEach((choice, index) => {
  choice.addEventListener("click", (e) => handleChoiceSelection(e, index));
  choiceImages[index].addEventListener("click", (e) =>
    handleChoiceSelection(e, index)
  );
});

// Function to handle choice selection
function handleChoiceSelection(e, index) {
  if (!acceptingAnswers) return;

  acceptingAnswers = false;
  const selectedChoice = e.target;
  const selectedAnswer = selectedChoice.dataset["number"];

  const isCorrect = selectedAnswer == currentQuestion.answer;

  if (isCorrect) {
    incrementScore(SCORE_POINTS);
    showAlert("Correct! +10", "green");
    selectedChoice.parentElement.style.backgroundColor = "green";
  } else {
    decrementScore(SCORE_POINTS);
    showAlert("Incorrect! -2", "red");
    selectedChoice.parentElement.style.backgroundColor = "red";
  }

  clearInterval(countdown);
  setTimeout(() => {
    selectedChoice.parentElement.style.backgroundColor = "";
    getNewQuestion();
  }, 1000);
}

function incrementScore(num) {
  score += num;
  correctAnswers += 1;
  scoreText.innerText = score;
}

function decrementScore(num) {
  if (score > 0) {
    score = Math.max(0, score - 2);
    scoreText.innerText = score;
  }
}

//alertbox
function showAlert(message, backgroundColor) {
  // Create alert box element
  const alertBox = document.createElement("div");
  alertBox.textContent = message;
  alertBox.style.position = "fixed";
  alertBox.style.top = "50%";
  alertBox.style.left = "50%";
  alertBox.style.transform = "translate(-50%, -50%)";
  alertBox.style.padding = "20px";
  alertBox.style.backgroundColor = backgroundColor;
  alertBox.style.color = "white";
  alertBox.style.borderRadius = "10px";
  alertBox.style.textAlign = "center";
  alertBox.style.lineHeight = "150px"; // Center text vertically
  alertBox.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.5)";
  alertBox.style.zIndex = "9999";
  alertBox.style.width = "400px"; // Set width of the alert box
  alertBox.style.height = "200px"; // Set height of the alert box
  alertBox.style.fontSize = "18px"; // Set font size of the alert box

  // Append alert box to the document body
  document.body.appendChild(alertBox);

  // Remove alert box after 2 seconds
  setTimeout(() => {
    alertBox.remove();
  }, 1000);
}

startGame();
