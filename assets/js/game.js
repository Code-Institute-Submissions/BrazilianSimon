const tr1 = document.querySelector('#track1')
const tr2 = document.querySelector('#track2')
const tr3 = document.querySelector('#track3')
const tr4 = document.querySelector('#track4')

const error = document.querySelector('#error')
const wins = document.querySelector('#wins')

const green = document.querySelector('#green')
const yellow = document.querySelector('#yellow')
const blue = document.querySelector('#blue')
const white = document.querySelector('#white')

let startBtn = document.querySelector('#start')
let onBtn = document.querySelector('#on')
let strictBtn = document.querySelector('#strict')
let start = false
let on = false
let strict = false

let randomOrder = []
let playerArray = []
let counter = document.querySelector('#turn')
let interval
let turn
let lightUp
let gameTurn = true
let won = false

startBtn.addEventListener('click', (event) => {
    if (on || won) {
        start = true
        play()
    }
})

onBtn.addEventListener('click', (event) => {
    if (onBtn.checked) {
        on = true
        counter.innerHTML = '0'
    } else {
        on = false
        counter.innerHTML = ''
        resetColor()
        clearInterval(interval)
    }
})

strictBtn.addEventListener('click', (event) => {
    if (strictBtn.checked) {
        strict = true
    }else{
        strict = false
    }
})

/**
 * Sets variables, pushes ramdon numbers to the Array,
 * assigns to interval setInteval and call game.
 */
function play() {
    turn = 1
    lightUp = 0
    playerArray = []
    randomOrder = []
    counter.innerHTML = 1
    won = false
    interval = 0
    for (var i = 0; i < 20; i++) {
        randomOrder.push(Math.floor(Math.random() * 4) + 1)
    }
    gameTurn = true
    interval = setInterval(game, 1000)
}

/** Switches between player and computer turn
* if gameTurn is true, it reads the array and light up it.
*/
function game() {
   on = false
   if (lightUp == turn) {
       clearInterval(interval)
       resetColor()
       on = true
       gameTurn = false
   }
   if (gameTurn) {
       resetColor()
       for(var i = -1; i < lightUp; i++){
           if (randomOrder[lightUp] == 1) {
               greenlight()
           }
           if (randomOrder[lightUp] == 2) {
               yellowlight()
           }
           if (randomOrder[lightUp] == 3) {
               bluelight()
           }
           if (randomOrder[lightUp] == 4) {
               whitelight()
           }
           setTimeout(resetColor, 400)
       }lightUp++
   }
}

/**
 * plays a musical note and flashes the light
 */
function greenlight() {
    tr1.play()
    green.style.backgroundColor = '#01ff1b'
}
/**
 * plays a musical note and flashes the light
 */
function yellowlight() {
    tr2.play()
    yellow.style.backgroundColor = '#ff9400'
}
/**
 * plays a musical note and flashes the light
 */
function bluelight() {
    tr3.play()
    blue.style.backgroundColor = '#40abff'
}
/**
 * plays a musical note and flashes the light
 */
function whitelight() {
    tr4.play()
    white.style.backgroundColor = '#fff'
}

/**
 * Return all colours to original form
 */
function resetColor() {
    green.style.backgroundColor = '#00A859'
    yellow.style.backgroundColor = '#ffdf00'
    blue.style.backgroundColor = '#3E4095'
    white.style.backgroundColor = '#adb5bd'
}

/**
 * lightup all colours
 */
function lightUpColor() {
    green.style.backgroundColor = '#01ff1b'
    yellow.style.backgroundColor = '#ff9400'
    blue.style.backgroundColor = '#40abff'
    white.style.backgroundColor = '#fff'
}


/**When green is clicked
 * feeds the array, call the functions check, one 
 * and resetColor 
 */
/**When green is clicked
 * feeds the array, call the functions check, greenligh 
 * and resetColor 
 */
green.addEventListener('click', (event) => {
    if (on && start) {
        playerArray.push(1)
        check()
        greenlight()
        if (!won) {
            setTimeout(resetColor, 200)
        }
    }
})

/**When yellow is clicked
 * feeds the array, call the functions check, two 
 * and resetColor 
 */
yellow.addEventListener('click', (event) => {
    if (on && start) {
        playerArray.push(2)
        check()
        yellowlight()
        if (!won) {
            setTimeout(resetColor, 200)
        }
    }
})

/**When blue is clicked
 * feeds the array, call the functions check, three 
 * and resetColor 
 */
blue.addEventListener('click', (event) => {
    if (on && start) {
        playerArray.push(3)
        check()
        bluelight()
        if (!won) {
            setTimeout(resetColor, 200)
        }
    }
})

/**When white is clicked
 * feeds the array, call the functions check, four 
 * and resetColor 
 */
white.addEventListener('click', (event) => {
    if (on && start) {
        playerArray.push(4)
        check()
        whitelight()
        if (!won) {
            setTimeout(resetColor, 200)
        }
    }
})


/**
 * Checks if player has been doing the same sequence as the game and 
 * if player has won the game.
 * Calls the function game to repeat the process
 */
function check() {
    if (playerArray[playerArray.length - 1] !== randomOrder[playerArray.length - 1]) {
        lightUpColor()
        error.play()
        counter.innerHTML = "###"
        setTimeout(() => {
            counter.innerHTML = turn
            resetColor()
            console.log(strict)
            if (strict) {
                play()
            } else {
                gameTurn = true
                lightUp = 0
                playerArray = []
                interval = setInterval(game, 1000)
            }
        }, 800)
    } else if (playerArray.length == 10) {
        win()
    } else if (turn == playerArray.length && !won) {
        turn++
        counter.innerHTML = turn
        gameTurn = true
        lightUp = 0
        playerArray = []
        interval = setInterval(game, 1000)
        console.log(interval)
    }
}

/**
 * Light up all ligths, play the winner's song 
 * and writes WIN in the counter.
 */
function win() {
    lightUpColor()
    wins.play()
    counter.innerHTML = "WIN!"
    setTimeout(resetColor, 300)
    on = false
    won = true   
}