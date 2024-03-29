const username = localStorage.getItem('playerName')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore= localStorage.getItem('mostRecentScore')
const feedback = document.querySelector('#feedback')

const highScores = JSON.parse(localStorage.getItem('highScores')) || []

const MAX_HIGHSCORES = 5
finalScore.innerText = mostRecentScore ?? 0

console.log(mostRecentScore)

if (mostRecentScore == 0) {
    feedback.innerText = `Better luck next time, ${username}!`
} else if (mostRecentScore > 0) {
    feedback.innerText = `Congrats, ${username}!`
}

saveHighScore = e => {
    e.preventDefault()
    const score = {
        score: mostRecentScore,
        name: username
    }

    highScores.push(score)

    highScores.sort((a,b) =>{
        return b.score - a.score
    })

    highScores.splice(5)
    localStorage.setItem('highScores', JSON.stringify(highScores))
    localStorage.removeItem("playerName");
    localStorage.removeItem("mostRecentScore");
    window.location.assign('/')
}