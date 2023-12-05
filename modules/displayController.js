import * as domController from './domController.js';
import * as gameUIHandler from './gameUIHandler.js';

function createBoardDisplay(boardSize){
    domController.createGrid(boardSize);
    gameUIHandler.gameBoardClickHandler();
}

function resetDisplay(){
    domController.removeGrid();
    showMessage("");
}

function updateCell(cell, symbol){
    let token = `[data-row="${cell[0]}"][data-col="${cell[1]}"]`;
    domController.addContent(token, symbol);
}

function showMessage(message){
    let token = ".game-message";
    domController.addContent(token, message);
}

export {createBoardDisplay, resetDisplay, updateCell, showMessage};