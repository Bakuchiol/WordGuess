/******************************************** DOM - main gameplay */
let guessButton = document.querySelector('.guessButton');
let input = document.querySelector('input');
let currentUser = document.querySelector('.currentPlayer')
let playerNumber = document.querySelector('.currentPlayer span');
let currentStatus = document.querySelector('.currentStatus');
let spellCast = document.querySelector('.word')
let rulesScreen = document.querySelector('.rulesScreen')
let winScreen = document.querySelector('.winScreen')
let gameScreenBody = document.querySelector('.gameScreenBody')
let gameScreenTop = document.querySelector('.gameScreenTop')
let player = document.querySelector('.victoryPlayer span')
let numdown = document.querySelector('.countdown span') // number countdown

// let wrongGuess = document.querySelector('.wrongGuess span')

/******************************************** VARIABLES */
let words = []; // store words entered here (words to guess)
let wordSpell = []; // show words as clues
let currentPlayer = 1; // initial player one
let standing = false; //status at start phase 1 /phase 2
let count = 60;
let countdown;


/******************************************************* GAME FUNCTIONALITY */
// start game
const startGame = () => {
    rulesScreen.classList.add('hide');
    gameScreenBody.style.display = "block"
    gameScreenTop.classList.add('appear');
}

/******************************* TESTING */
// timer
let popUp = document.querySelector('.popWrapper')
const timer = () => {
    countdown = setInterval(()=> {
        // numdown.style.color = "crimson"
        numdown.textContent = count
        count--;
        if (count === -1){ // show zero on screen
            clearInterval(countdown);
            popUp.style.display = "block"
            wizard.classList.add('wizardShadow')
            wizard2.classList.add('wizardShadow')
            // pop up here w/ try again button (try to cast an easier spell)
            console.log("try to cast an easier spell")
        }
    }, 1000)
};


// try again?
/*  TO DO
1. make lose modal
2. try again button
 */
const tryAgain = () => {

    rulesScreen.classList.add('hide');
    gameScreenBody.style.display = "block"
    gameScreenTop.classList.add('appear');
}

/******************************* TESTING */


// event listener for guess button
const guessWord = () => {
    // console.log(input.value);
    // define game status/standing - players storing words
    /**** 1st phase */
    if(standing === false){
        words.unshift(input.value.toLowerCase()); //stores input value
        

        // words as spells hidden
        let spell = "";
        for(let i = 0; i < input.value.length; i++){
            spell += `_`;            
        }
        wordSpell.unshift(spell);

        console.log(words)
        console.log(`words now show as blanks: ${spell}`)


        playerSwitch();

        /**** 2nd phase */
        if(words.length === 2){ // two words in storage
            timer();

            let reminder = document.querySelector('.statusP')
            reminder.textContent = `Guess your opponent's spell!`
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
            letterFound(letter, index);
            // console.log("correct letter: ",letter)

        }else{

            // if((index === -1)){
                // wrongGuess.textContent = letter // shows wrong guess
            // }

            playerSwitch()
            console.log('switched player wrong guess')
            console.log(`wrong letter: ${letter}`)
        }
        wordClue()
        // console.log("shows up every correct guess")
        // console.log(`correct letter: ${letter}`)

        if(letter === spell){
            spellCast.textContent = spell // full word correctly guessed on screen
            console.log("complete word shows up on screen")
        }
    }
}

let wizard2 = document.querySelector('#wizard2')

// swap players
const playerSwitch = () => {
    if(currentPlayer === 1){
        currentPlayer = 2;
        player.textContent = "2" // win screen

        wizard2.classList.add('wizardShadow')
        wizard.classList.remove('wizardShadow')
        currentStatus.style.transform = "scaleX(-1)"

        // better luck next time, player x
    }else{
        currentPlayer = 1; // goes back to player1
        player.textContent = "1" // win screen

        wizard.classList.add('wizardShadow')
        wizard2.classList.remove('wizardShadow')
        currentStatus.style.transform = "scaleX(1)"
    }
    // update player number
    playerNumber.textContent = currentPlayer;
    // clear input
    input.value = "";

    // wrongGuess.textContent = ""
}

// make spell casted (word) display as clues on screen
// corresponding with word length
const wordClue = () => {
    let spellClue = wordSpell[currentPlayer - 1];
    let spell = "";
    for(let i = 0; i < spellClue.length; i++){
        spell += `${spellClue[i]} `
    }

    guessButton.textContent = "GUESS"
    spellCast.textContent = spell;

    console.log(`opponent word on screen: ${spell}`)

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
        console.log(`takes out correct letter from spell: ${word.replace(letter, '_')}, this: ${letter}`)
        console.log(words[currentPlayer - 1], "rest of the letters to guess")
        // if index -1, letter no longer found (avoid repetition of entering same letter)
        index = words[currentPlayer - 1].indexOf(letter);
        console.log("correct letter in array now on screen", wordSpell[currentPlayer - 1])


        // if win
        let checker = true; // win state
        let sample = words[currentPlayer - 1].split(''); // array of letters from spell casted (word)
        sample.forEach(bet => {
            if (bet != '_') {
                checker = false; // not win, still letters missing
            }
        });
        if (checker == true) { // all letters accounted for

            setTimeout(()=>{ // win screen
                gameScreenBody.style.display = "none"
                winScreen.classList.toggle('appear')
                console.log('did it?');
            }, 2000);
        }
    } while(index !== -1) //get out of loop , still letters in array
}

// RESET/RELOAD
const reloadPage = () => {
    location.reload();
}
const delayReload = (time) => {
    window.setTimeout(reloadPage, time)
}


/******************************************************************************** TESTING */

// TIMER





// if input is empty
// const emptyInput = () => {
//     let empty = document.querySelector('#inputGuess').value
//     if(empty == ""){
//         alert('You forgot to cast a spell!')
//         return false
//     }
// }
/********************************************************************************** TESTING */


/******************************************************************8*** DOM SYLING - variables */
let inputWrapper = document.querySelector('.inputWrapper');
let rulesRecap = document.querySelector('.rulesRecap');
let speechBubble = document.querySelector('.currentStatus')
let wizard = document.querySelector('#wizard')
let scoreBox = document.querySelector('.scoreBox')
let inputBox = document.querySelector('.inputBox')
let selectBtn = document.querySelector('.selectBtn');
let selectBtn2 = document.querySelector('.selectBtn2');
let buttons = document.querySelector('.buttons')
let timeContainer = document.querySelector('.timeContainer')
let inputLabel = document.querySelector('.inputLabel')
/*********************************************************************** DOM STYLING */
// select button
const ruleNotif = () => {
    inputWrapper.style.display = "none"
    wizard.style.display = "none"
    scoreBox.style.height = "0px"
    speechBubble.style.display = "none"
    timeContainer.style.display = "none"
    currentUser.style.display = "none"
    rulesRecap.style.display = "block"
    selectBtn.style.display = "none"
    selectBtn2.style.display = "block"
    buttons.style.marginTop = "77px"
}
const ruleOut = () => {
    rulesRecap.style.display = "none"
    selectBtn2.style.display = "none"
    selectBtn.style.display = "block"
    speechBubble.style.display = "block"
    currentUser.style.display = "block"
    timeContainer.style.display = "block"
    inputLabel.classList.add('inputLabel2')
    scoreBox.style.height = "43%"
    wizard.style.display = "block"
    inputWrapper.style.display = "block"
    buttons.style.marginTop = "1px"
    inputBox.style.marginTop = "5px"
}
