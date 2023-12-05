import * as gameLogic from "./gameLogic.js";
import * as gameBoard from "./gameBoard.js";
import * as displayController from "./displayController.js";

const gameState = {
    playerOne: null,
    playerTwo: null,
    currPlayer:null,
    winner: null,
    isGameOver: false,
};

function switchPlayer(){
    if(gameState.currPlayer === gameState.playerOne){
        gameState.currPlayer = gameState.playerTwo;
    }
    else{
        gameState.currPlayer = gameState.playerOne;
    }
}

function playTurn(player, selectedPosition){
    if(!gameLogic.isMoveValid(gameBoard.getBoard(), selectedPosition)){
        return false;
    }

    gameBoard.setCellValue(selectedPosition, player.getSymbol());
    displayController.updateCell(selectedPosition, player.getSymbol());

    if(gameLogic.checkWinCondition(gameBoard.getBoard(), player.getSymbol())){
        gameState.winner = player.getName();
        gameState.isGameOver = true;
        endGame();
    }
   
    if(gameLogic.checkTieCondition(gameBoard.getBoard())){
        gameState.isGameOver = true;
        endGame();
    }

    switchPlayer();

    return true;
}

function playRound(userSelectedCell){
    if(gameState.isGameOver){
        return;
    }

    let isValid = playTurn(gameState.currPlayer, userSelectedCell);
    
    if(!isValid){
        return;
    }

    if(gameState.isGameOver){
        return;
    }

    let computerSelectedCell = gameState.currPlayer.playMove();
    playTurn(gameState.currPlayer, computerSelectedCell);
}

function endGame(){
    let message = "Draw";
    if(gameState.winner !== null){
        message = `${gameState.winner} wins!`;
    }

    displayController.showMessage(message);
}

function resetGame() {
    gameState.playerOne = null;
    gameState.playerTwo = null;
    gameState.isGameOver = false;
    gameState.winner = null;
    gameState.currPlayer = null;
    gameBoard.resetBoard();
    displayController.resetDisplay();
}

function playGame(playerOne, playerTwo, boardSize=3){
    resetGame();
    
    gameState.playerOne = playerOne;
    gameState.playerTwo = playerTwo;
    gameState.currPlayer = playerOne;
    gameBoard.createBoard(boardSize);
    displayController.createBoardDisplay(boardSize);
}

export {playGame, playRound};