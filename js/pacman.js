'use strict'

const PACMAN = '😷'
var gPacman

function createPacman(board) {
    // DONE: initialize gPacman...
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false
    }
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

}

function movePacman(ev) {
    if (!gGame.isOn) return
    // DONE: use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev.key)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL) return

    // DONE: hitting a ghost? call gameOver
    if (nextCell === GHOST) {
        if (gPacman.isSuper) {
            superEat(nextLocation)
        } else {
            gameOver()
        }
    }

    if (nextCell === FOOD) {
        updateScore(1)
    }

    if (nextCell === POWER) {
        if(!gPacman.isSuper){
            gPacman.isSuper = true
            var clearSuperId = setTimeout(() => {
                gPacman.isSuper = false
                reviveGhosts(gBoard)
            }, 5000);
        }else{
            return
        }
    }
    if(nextCell===CHERRY){
        updateScore(10)
    }



    // DONE: moving from current location:
    // DONE: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // DONE: update the DOM
    renderCell(gPacman.location, EMPTY)


    // DONE: Move the pacman to new location:
    // DONE: update the model
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    gPacman.location = nextLocation
    // DONE: update the DOM
    renderCell(nextLocation, PACMAN)
    if (checkVictory()) {
        document.querySelector('.board-container').innerHTML =
            `<p>Victory</p><br><button onclick="onInit()">Play again</button>`
        gGame.isOn = false
    }
}

function getNextLocation(eventKeyboard) {
    // console.log(eventKeyboard)

    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    // DONE: figure out nextLocation
    switch (eventKeyboard) {
        case 'ArrowUp':
            nextLocation.i--
            break;
        case 'ArrowRight':
            nextLocation.j++
            break;
        case 'ArrowDown':
            nextLocation.i++
            break;
        case 'ArrowLeft':
            nextLocation.j--
            break;
    }
    return nextLocation
}
function superEat(nextLocation) {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghostCell = gGhosts[i].location
        if (ghostCell.i === nextLocation.i && ghostCell.j === nextLocation.j) {
            gGhosts.splice(i, 1)
            renderCell(ghostCell, EMPTY)
            gBoard[nextLocation.i][nextLocation.j] = EMPTY
            console.log(gGhosts);
        }
    }
}
