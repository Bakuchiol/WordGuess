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
let standing = false; //status



// event listener for guess button
const guessWord = () => {
    if(standing === false){
        words.unshift(input.value.toLowerCase());
        let spell = "";
        for(let i = 0; i < input.value.length; i++){
            spell += `_ `
        }
        wordSpell.unshift(spell);
        playerSwitch();
        if(words.length === 2){
            currentStatus.textContent = `Guess your opponent's spell!`
            wordClue();
            standing = true;
        }
    }else{
        let letter = input.value.toLowerCase() // letter/word player guessed
        let spell = words[currentPlayer - 1]// spell(word) player entered
        let index = spell.indexOf(letter) // finds letter and stores inside variable index
        if(index !== -1){
            letterFound(letter, index)
        }else{
            playerSwitch()
        }
        wordClue()
    }
}

// swap players
const playerSwitch = () => {
    if(currentPlayer === 1){
        currentPlayer = 2;
    }else{
        currentPlayer = 1; // goes back to player1
    }
    playerNumber.textContent = currentPlayer;
    input.value = "";
}

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
    do {
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
        wordSpell[currentPlayer - 1] = spell;
        words[currentPlayer - 1] = word.replace(letter, '_');
        index = words[currentPlayer - 1].indexOf(letter);

    } while(index !== -1)
}

// RESET/RELOAD
const reloadPage = () => {
    location.reload();
}
const delayReload = (time) => {
    window.setTimeout(reloadPage, time)
}