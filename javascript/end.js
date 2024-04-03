const username = localStorage.getItem("playerName");
const reviewResultBtn = document.querySelector("#reviewResultBtn");
const saveScoreBtn = document.querySelector("#saveScoreBtn");
const numOfCorrectAnswers = localStorage.getItem("correctAnswers");
const totalQuestions = localStorage.getItem("totalQuestions");
const mostRecentScore = localStorage.getItem("mostRecentScore");
const feedback = document.querySelector("#feedback");
const result = JSON.parse(localStorage.getItem("result")) || [];
const resultList = document.querySelector("#resultList");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const finalScores = document.querySelectorAll("#finalScore");
finalScores.forEach(function (finalScore) {
  finalScore.innerText = mostRecentScore ?? 0;
});

const correctAnswers = document.querySelectorAll("#correctAnswers");
correctAnswers.forEach(function (correctAnswer) {
  correctAnswer.innerText = `${numOfCorrectAnswers} / ${totalQuestions}`;
});

const MAX_HIGHSCORES = 5;

// Message
if (mostRecentScore == 0) {
  feedback.innerHTML = `Better luck next time, <span>${username}</span>!`;
} else if (mostRecentScore > 0) {
  feedback.innerHTML = `Congratulations, <span>${username}</span>!`;
}

let resultSection = document.querySelector("section#result");

// Hide all sections other than the first one initially
const sectionsToHide = document.querySelectorAll("section:not(#result)");
sectionsToHide.forEach(function (section) {
  section.style.display = "none";
});

// Review results button
reviewResultBtn.addEventListener("click", function (event) {
  event.preventDefault();

  loadResult();

  // Show the next section
  const reviewSection = document.querySelector("#review");
  resultSection.style.display = "none"; // Hide the current section
  reviewSection.style.display = "block"; // Show the next section
  reviewSection.scrollIntoView({ behavior: "smooth" });
});

backBtn.addEventListener("click", function (event) {
  event.preventDefault();

  // Show the previous section
  const reviewSection = document.querySelector("#review");
  reviewSection.style.display = "none"; // Hide the current section
  resultSection.style.display = "block"; // Show the next section
  resultSection.scrollIntoView({ behavior: "smooth" });
});

saveHighScore = (e) => {
  e.preventDefault();
  const score = {
    score: mostRecentScore,
    name: username,
  };

  highScores.push(score);

  highScores.sort((a, b) => {
    return b.score - a.score;
  });

  highScores.splice(5);
  localStorage.setItem("highScores", JSON.stringify(highScores));
  localStorage.removeItem("playerName");
  localStorage.removeItem("mostRecentScore");
  localStorage.removeItem("correctAnswers");
  localStorage.removeItem("result");
  window.location.assign("/");
};

loadResult = () => {
  result.forEach((item, index) => {
    console.log(item.status);
    if (item.status) {
      resultList.innerHTML += `
            <li class="item">
                <p class="question">${index + 1}. ${item.question}</p>
                <p class="correct-answer">${
                  item.selected
                }<i class="fa-solid fa-check"></i> Correct</p>
            </li>
            `;
    } else {
      resultList.innerHTML += `
            <li class="item">
                <p class="question">${index + 1}. ${item.question}</p>
                <p class="wrong-answer">${
                  item.selected
                }<i class="fa-solid fa-xmark"></i> Your Answer</p>
                <p class="correct-answer">${
                  item.correct
                }<i class="fa-solid fa-check"></i> Correct Answer</p>
            </li>
            `;
    }
  });
};
