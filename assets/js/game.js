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

