/*
Project completed during the JavaScript: The complete JavaScript course
https://www.udemy.com/course/the-complete-javascript-course/
@author StevenStretton

GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/
var scores, roundScore, activePlayer;
init();
/*
initialising the variables that we previously declared
incorporated into a function to be reused in the 'new game' event listener
*/
function init() {
    scores = [0,0];
    roundScore = 0; //current score of the ronud of the active player 
    activePlayer = 0; //Player 0 || Player 1
    //initially removes the dice from view
    document.querySelector('.dice').style.display = 'none'; 
}
//changes the active player in the HTML, by default player 1 is active
function togglePlayer() {
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}
//clears the current round score of the player
function clearCurrentScore() {
    document.getElementById('current-'+activePlayer).textContent = 0;
}
//clears the global score of both players - used when creating a new game
function clearUIScores() {
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
}
/*
The event listener for the 'roll dice' button:
Rolls the dice to randomly generate a number between one and six.
Adds the score to the current round score if the dice roll != one. 
Else, the current round score is lost and the turn is passed to the opponent.
*/
document.querySelector('.btn-roll').addEventListener('click', function() {
    //1. Generate a random number
    var diceNumber = Math.floor((Math.random() * 6) + 1);
    //2. Display the result
    var diceDom = document.querySelector('.dice');
    diceDom.style.display = 'block'; //unhide the dice 
    diceDom.src = 'dice-'+diceNumber+'.png'; //select the dice image depending on roll
    //3. Update the round score, as long as != 1
    currentScoreBox = document.getElementById('current-'+activePlayer);
    if (diceNumber !== 1) {
        roundScore += diceNumber;
        currentScoreBox.textContent = roundScore;
    } else {
        roundScore = 0;
        clearCurrentScore();
        //ternary operator to swap turns of the active player 
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; 
        togglePlayer();
    }
});
/*
The event listener for the 'hold' button: 
Saves the players current (round score) to the global score
Passes the turn to the other player if the active player has not yet achieved a score of 100.
*/
document.querySelector('.btn-hold').addEventListener('click', function() {
    //Add CURRENT score to the GLOBAL score
    scores[activePlayer] += roundScore;
    //Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    //Check 
    if (scores[activePlayer] >= 100) {
        document.getElementById('name-'+activePlayer).textContent = 'WINNER!';
    } else {
        roundScore = 0;
        clearCurrentScore();
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; 
        togglePlayer();
    }
});
/*
The event listener for the 'new game' button:
Resets all of the values
Resets the UI values
*/
document.querySelector('.btn-new').addEventListener('click', function() {
    init();
    clearUIScores();
});