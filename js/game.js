'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const POWER = '🥐'
const CHERRY = '🍒'

const gGame = {
    score: 0,
    isOn: false
}

var gBoard
var gCherryIntervalId

function onInit() {
    gGame.score = 0
    console.log('hello')
    gBoard = buildBoard()
    createGhosts(gBoard)
    addPowerFood()
    createPacman(gBoard)
    renderBoard(gBoard, '.board-container')
    gGame.isOn = true
    gCherryIntervalId = setInterval(addCherry,15000)
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }
        }
    }
    return board
}

function updateScore(diff) {
    // TODO: update model and dom
    // Model
    gGame.score += diff
    // DOM
    document.querySelector('h2 span').innerText = gGame.score

}

function gameOver() {
    console.log('Game Over')
    // TODO
    clearInterval(gIntervalGhosts)
    gGame.isOn = false
    renderCell(gPacman.location, '🪦')
    document.querySelector('.board-container').innerHTML =
        `<p>Game Over</p><br><button onclick="onInit()">Restart</button>`
}
function checkVictory() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j] === FOOD) return false
        }
    }
    // clearInterval(gCherryIntervalId)
    return true
}
function addPowerFood() {
    gBoard[1][1] = POWER
    gBoard[gBoard.length - 2][1] = POWER
    gBoard[1][gBoard[0].length - 2] = POWER
    gBoard[gBoard.length - 2][gBoard[0].length - 2] = POWER
}

function addCherry() {
    var idxI = getRandomIntInclusive(1, 9)
    var idxJ = getRandomIntInclusive(1, 9)
    var cellLocation = {i: idxI,j: idxJ}
    var cell = gBoard[idxI][idxJ]
    if (cell !== FOOD && cell !== EMPTY) {
        idxI = getRandomIntInclusive(1, 8)
        idxJ = getRandomIntInclusive(1, 8)
        cell = gBoard[idxI][idxJ]
        cellLocation = {i: idxI,j: idxJ}
    }
    gBoard[idxI][idxJ] = CHERRY
    renderCell(cellLocation,CHERRY)
    console.log('cherry coord:', idxI,idxJ)
    
}
