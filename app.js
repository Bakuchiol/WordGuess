/******************************************** DOM */
let guessButton = document.querySelector('.guessButton');
let input = document.querySelector('input');
let playerNumber = document.querySelector('span');
let currentStatus = document.querySelector('.currentStatus');
let spellCast = document.querySelector('.word')


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
            wordClue();
            standing = true;
        }
    }else{
        // check if letter found in spell(word)
        let letter = input.value // letter/word player guessed
        let spell = words[currentPlayer - 1]// spell(word) player entered
        //checks word if letter is there
        let index = spell.indexOf(letter) // finds letter and stores inside variable index
        //if letter not found
        if(index !== -1){
            letterFound(letter, index)
        }else{
            playerSwitch()
        }
        wordClue()
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

// make spell casted (word) display as clues on screen
// corresponding with word length
const wordClue = () => {
    let spellClue = wordSpell[currentPlayer - 1]; // current player (1)
    let spell = "";
    for(let i = 0; i < spellClue.length; i++){
        spell += `${spellClue[i] }`
    }
    spellCast.textContent = spell;
    console.log(spell)
}

// function to check if letter is found in word
const letterFound = (letter, index) => {
    do{
        let word = words[currentPlayer - 1];
        let spellCast = wordSpell[currentPlayer - 1];

        let spell = "";
        for(let i = 0; i < word.length; i++){
            if(index !== i){
                spell += spellCast[i] // letter that was there
            }else{ // if letter/word input is same
                spell += word[i]; // replaces underscore with letter at that position
            }
        }
        wordSpell[currentPlayer - 1] - spell;
        // replace found letter with _
        words[currentPlayer - 1] - word.replace(letter, '_');
        // console.log(words[currentPlayer - 1])
                // if index -1, letter no longer found (avoid repetition)
        index = words[currentPlayer - 1].indexOf(letter);
    } while(index !== -1) {


    }
}