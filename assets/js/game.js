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


