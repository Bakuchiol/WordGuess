/******************************************** DOM */
let guessButton = document.querySelector('.guessButton');
let input = document.querySelector('input');
let playerNumber = document.querySelector('span');


/******************************************** VARIABLES */
let words = []; // store words entered here (words to guess)
let currentPlayer = 1; // initial player one



// event listener for guess button
const guessWord = () => {
    // console.log('button workssss');
    // console.log(input.value);
    words.unshift(input.value);
    // console.log(words);
    playerSwitch()

}

// swap players
const playerSwitch = () => {
    if(currentPlayer === 1){
        currentPlayer = 2;
    }else{
        currentPlayer = 1; // goes back to player1
    }
    // update player number
    playerNumber.textContent = currentPlayer;
    // clear input
    input.value = "";
}