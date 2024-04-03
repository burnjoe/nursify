const highScoresList = document.querySelector("#highScoresList")
const highScores = JSON.parse(localStorage.getItem('highScores')) || []
console.log(highScores === null)
highScoresList.innerHTML = highScores !== null ? 
highScores.map(score => {
    return  `<li class="high-score"> ${score.name} - ${score.score}  </li>`
}).join('') :
"No players found";
