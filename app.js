/******************************************** DOM */
let guessButton = document.querySelector('.guessButton');
let input = document.querySelector('input');
let playerNumber = document.querySelector('.currentPlayer span');
let currentStatus = document.querySelector('.currentStatus');
let spellCast = document.querySelector('.word')

let rulesScreen = document.querySelector('.rulesScreen')
let gameScreenBody = document.querySelector('.gameScreenBody')
let gameScreenTop = document.querySelector('.gameScreenTop')
let player = document.querySelector('.victoryPlayer span')


/******************************************** VARIABLES */
let words = []; // store words entered here (words to guess)
let wordSpell = []; // show words as clues
let currentPlayer = 1; // initial player one
let standing = false; //status at start


// start game
const startGame = () => {
    rulesScreen.classList.add('hide');
    gameScreenBody.style.display = "block"
    gameScreenTop.classList.add('appear');
}

let inputWrapper = document.querySelector('.inputWrapper');
    let rulesRecap = document.querySelector('.rulesRecap');
    let selectBtn = document.querySelector('.selectBtn');
    let selectBtn2 = document.querySelector('.selectBtn2');

// select button
const ruleNotif = () => {
    inputWrapper.style.display = "none"
    rulesRecap.style.display = "block"
    selectBtn.style.display = "none"
    selectBtn2.style.display = "block"
}
const ruleOut = () => {
    rulesRecap.style.display = "none"
    selectBtn2.style.display = "none"
    selectBtn.style.display = "block"
    inputWrapper.style.display = "block"
}

/******************************************************* GAME FUNCTIONALITY */
// event listener for guess button
const guessWord = () => {
    // console.log('button workssss');
    // console.log(input.value);
    // define game status/standing - players storing words
    if(standing === false){
        words.unshift(input.value.toLowerCase());
        // words as spells hidden
        let spell = "";
        for(let i = 0; i < input.value.length; i++){
            spell += `_`;
        }
        wordSpell.unshift(spell);
        console.log(spell)

        playerSwitch();
        // tell if second player turn
        if(words.length === 2){
            currentStatus.textContent = `Guess your opponent's spell!`
            wordClue();
            standing = true; // players already playing game
        }
    }else{
        //make sure wordClue is executed PROGRAM STATUS2
        // check if letter found in spell(word)
        let letter = input.value.toLowerCase() // letter/word player guessed
        let spell = words[currentPlayer - 1]// spell(word) player entered
        //checks word if letter is there
        let index = spell.indexOf(letter) // finds letter and stores inside variable index
        //if letter not found
        if(index !== -1){
            letterFound(letter, index)
        }else{
            playerSwitch()
            console.log('switched player wrong letter')
        }
        wordClue()
        console.log("shows up every correct guess")
    }
}


// swap players
const playerSwitch = () => {
    if(currentPlayer === 1){
        currentPlayer = 2;
        player.textContent = "2" // win screen
        // change img?
    }else{
        currentPlayer = 1; // goes back to player1
        player.textContent = "1" // win screen
        // change img?
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
        spell += `${spellClue[i]} `
    }

    guessButton.textContent = "GUESS"

    spellCast.textContent = spell;
    console.log("shows up every key")
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
        // replace _ with found letter
        words[currentPlayer - 1] = word.replace(letter, '_');
        console.log(words[currentPlayer - 1], "down every correct guess")
        // if index -1, letter no longer found (avoid repetition of entering same letter)
        index = words[currentPlayer - 1].indexOf(letter);
        console.log(wordSpell[currentPlayer - 1])


        // if win
        let checker = true;
        let sample = words[currentPlayer - 1].split('');
        sample.forEach(bet => {
            if (bet != '_') {
                checker = false;
            }
        });
        if (checker == true) {

            let winScreen = document.querySelector('.winScreen')

            setTimeout(()=>{
                gameScreenBody.style.display = "none"
            winScreen.classList.toggle('appear')
            console.log('did it?');
            }, 2000);
            // gameScreenBody.style.display = "none"
            // winScreen.classList.toggle('appear')
            // console.log('did it?');
            // delayReload(5000);

            // TO DO win screen:
            // add button PLAY AGAIN take out all buttons (select and start)
        }

    } while(index !== -1) //get out of loop
}

// RESET/RELOAD
const reloadPage = () => {
    location.reload();
}
const delayReload = (time) => {
    window.setTimeout(reloadPage, time)
}