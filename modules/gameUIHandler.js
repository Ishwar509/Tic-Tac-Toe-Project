import * as gameController from "./gameController.js";
import * as gameCharacters from "./gameCharacters.js";
import * as computerAI from "./computerAI.js";

function loadGameUI(){
    let gameUI = document.querySelector('.game-ui');
    gameUI.addEventListener('click', gameButtonAction);
}

function gameBoardClickHandler(){
    let board = document.querySelector(".game-board");
    board.addEventListener('click', function(e){
        if(!e.target.classList.contains('cell')){
            return;
        }
        let rowPos = Number(e.target.dataset.row);
        let colPos = Number(e.target.dataset.col);
        let selectedCell = [rowPos, colPos];

        gameController.playRound(selectedCell);
    });
}

function gameButtonAction(e){
    let element = e.target;
    if(!element.classList.contains("btn")){
        return;
    }

    if(element.classList.contains("play")){
        let players = gameCharacters.createNewPlayers();
        gameController.playGame(players.user, players.computer);
    }

    if(element.classList.contains("symbol")){
        let previousSelection = document.querySelector('.symbol.selected');
        previousSelection.classList.remove("selected");
        element.classList.add("selected");
        gameCharacters.changeSymbol(element.textContent);
    }

    if(element.classList.contains("mode")){
        let previousMode = document.querySelector('.mode.selected');
        previousMode.classList.remove("selected");
        element.classList.add("selected");
        if(element.classList.contains("easy")){
            computerAI.changeMode(1);
        }
        else if(element.classList.contains("medium")){
            computerAI.changeMode(2);
        }
        else{
            computerAI.changeMode(3);
        }
    }
}

export {gameBoardClickHandler, loadGameUI};