/******************************************** DOM */
let guessButton = document.querySelector('.guessButton');
let input = document.querySelector('input');
let playerNumber = document.querySelector('span');
let currentStatus = document.querySelector('.currentStatus')


/******************************************** VARIABLES */
let words = []; // store words entered here (words to guess)
let wordSpell = []; // show words as clues
let currentPlayer = 1; // initial player one
let standing = false;



// event listener for guess button
const guessWord = () => {
    // console.log('button workssss');
    // console.log(input.value);
    // define game status/standing - players storing words
    if(standing === false){
        words.unshift(input.value);
        // words as spells hidden
        let spell = "";
        for(let i = 0; i < input.value.length; i++){
            spell += `_ `
        }
        wordSpell.unshift(spell);
        console.log(spell)

        playerSwitch();
        // tell if second player turn
        if(words.length === 2){
            currentStatus.textContent = `Guess your opponent's spell!`
        }
    }

    console.log(words);

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