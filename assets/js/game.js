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
function one() {
    
    if (noise) {
        let audio1 = document.getElementById("track1")
        audio1.play()
    }
    noise = true
    green.style.backgroundColor = '#01ff1b'
}

/**
 * plays a musical note and flashes the light
 */
function two() {
    
    if (noise) {
        let audio2 = document.getElementById("track2")
        audio2.play()
    }
    noise = true;
    yellow.style.backgroundColor = '#ff9400'
}

/**
 * plays a musical note and flashes the light
 */
function three() {
    
    if (noise) {
        let audio3 = document.getElementById("track3")
        audio3.play()
    }
    noise = true
    blue.style.backgroundColor = '#40abff'
}

/**
 * plays a musical note and flashes the light
 */
function four() {
    
    if (noise) {
        let audio4 = document.getElementById("track4")
        audio4.play()
    }
    noise = true
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
 * flashes all colours
 */
function flashColor() {
    green.style.backgroundColor = '#01ff1b'
    yellow.style.backgroundColor = '#ff9400'
    blue.style.backgroundColor = '#40abff'
    white.style.backgroundColor = '#fff'
}


/**When green is clicked
 * feeds the array, call the functions check, one 
 * and resetColor 
 */
green.addEventListener('click', (event) => {
    if (on) {
        playerOrder.push(1)
        check()
        one()
        if (!win) {
            setTimeout(() => {
                resetColor()
            }, 300)
        }
    }
})

/**When yellow is clicked
 * feeds the array, call the functions check, two 
 * and resetColor 
 */
yellow.addEventListener('click', (event) => {
    if (on) {
        playerOrder.push(2)
        check()
        two()
        if (!win) {
            setTimeout(() => {
                resetColor()
            }, 300)
        }
    }
})

/**When blue is clicked
 * feeds the array, call the functions check, three 
 * and resetColor 
 */
blue.addEventListener('click', (event) => {
    if (on) {
        playerOrder.push(3)
        check()
        three()
        if (!win) {
            setTimeout(() => {
                resetColor()
            }, 300)
        }
    }
})

/**When white is clicked
 * feeds the array, call the functions check, four 
 * and resetColor 
 */
white.addEventListener('click', (event) => {
    if (on) {
        playerOrder.push(4)
        check()
        four()
        if (!win) {
            setTimeout(() => {
                resetColor()
            }, 300)
        }
    }
})

/**
 * Checks if player has been doing the same sequence as the game and 
 * if player has won the game.
 * Calls the function gameTurn
 */
function check() {
    if (playerOrder[playerOrder.length - 1] !== randomOrder[playerOrder.length - 1]) {
        good = false
    }

    if (playerOrder.length == 20 && good) {
        winGame()
    }

    if (good == false) {
        flashColor()
        let error = document.getElementById("error")
        error.play()
        turnCounter.innerHTML = "NO!"
        setTimeout(() => {
            turnCounter.innerHTML = turn
            resetColor()

            if (strict) {
                play()
            } else {
                compTurn = true
                flash = 0
                playerOrder = []
                good = true
                intervalId = setInterval(gameTurn, 800)
            }
        }, 800)

        noise = false
    }

    if (turn == playerOrder.length && good && !win) {
        turn++
        playerOrder = []
        compTurn = true
        flash = 0
        turnCounter.innerHTML = turn
        intervalId = setInterval(gameTurn, 800)
    }
}

/**
 * Flashes the ligths, play the winner's song 
 * and writes win in the counter.
 */
function winGame() {
    flashColor()
    let jingleWin = document.getElementById("wins")
    jingleWin.play()
    turnCounter.innerHTML = "WIN!"
    setTimeout(() => {
        resetColor()
    }, 300)
    on = false
    win = true   
}