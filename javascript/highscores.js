const highScoresList = document.querySelector("#highScoresList")
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

highScoresList.innerHTML = highScores.length > 0 ? 
highScores.map(score => {
    return  `<li class="high-score"> ${score.name} - ${score.score}  </li>`
}).join('') :
"No players found";
