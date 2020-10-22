let randomOrder = []
let playerOrder = []
let flash
let turn
let good
let compTurn
let intervalId
let strict = false
let noise = true
let on = false
let win

const turnCounter = document.querySelector("#turn")
const green = document.querySelector('#green')
const yellow = document.querySelector('#yellow')
const blue = document.querySelector('#blue')
const white = document.querySelector('#white')
const strictBtn = document.querySelector("#strict")
const onOff = document.querySelector("#on")
const start = document.querySelector("#start")

start.addEventListener('click', (event) => {
    if (on || win) {
        play()
    }
})

onOff.addEventListener('click', (event) => {
    if (onOff.checked == true) {
        on = true
        turnCounter.innerHTML = "-"
    } else {
        on = false
        turnCounter.innerHTML = ""
        resetColor()
        clearInterval(intervalId)
    }
})

strictBtn.addEventListener('click', (event) => {
    if (strictBtn.checked == true) {
        strict = true
    } else {
        strict = false
    }
})

/**
 * Sets variables, pushes ramdon numbers to 
 * the Array and to intervalId assigns setInteval.
 */
function play() {
    win = false
    randomOrder = []
    playerOrder = []
    flash = 0
    intervalId = 0
    turn = 1
    turnCounter.innerHTML = 1
    good = true
    for (var i = 0; i < 20; i++) {
        randomOrder.push(Math.floor(Math.random() * 4) + 1)
    }
    compTurn = true

    intervalId = setInterval(gameTurn, 800)
}
/**
 * Switches between player and computer flashes
 * if compTurn is true, it reads the array and flashes it.
 */
function gameTurn() {
    on = false

    if (flash == turn) {
        clearInterval(intervalId)
        compTurn = false
        resetColor()
        on = true
    }

    if (compTurn) {
        resetColor()
        setTimeout(() => {
            if (randomOrder[flash] == 1) one()
            if (randomOrder[flash] == 2) two()
            if (randomOrder[flash] == 3) three()
            if (randomOrder[flash] == 4) four()
            flash++
        }, 200)
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

