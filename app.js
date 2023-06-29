/******************************************** DOM */
let guessButton = document.querySelector('.guessButton');
let input = document.querySelector('input');


/******************************************** VARIABLES */
let words = []; // store words entered here (words to guess)
let currentPlayer = false; // initial player one



// event listener for guess button
const guessWord = () => {
    // console.log('button workssss');
    // console.log(input.value);
    words.unshift(input.value);
    // console.log(words);

}

// swap players
const playerSwitch = () => {
    if(currentPlayer === false){
        currentPlayer = true;
    }
}