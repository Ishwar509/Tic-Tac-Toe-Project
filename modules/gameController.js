import * as gameLogic from "./gameLogic.js";
import * as gameBoard from "./gameBoard.js";

const gameState = {
    winner: null,
    isGameOver: false,
    currPlayer:null,
};

function switchPlayer(playerOne, playerTwo){
    gameState.currPlayer = gameState.currPlayer === playerOne? playerTwo : playerOne;
}

function playTurn(player, selectedPosition){
    if(!gameLogic.isMoveValid(gameBoard.getBoard(), selectedPosition)){
        console.log("Invalid Move");
        return;
    }

    gameBoard.setCellValue(selectedPosition, player.getSymbol());
    
    if(gameLogic.checkWinCondition(gameBoard.getBoard(), selectedPosition, player.getSymbol())){
        gameState.winner = player.getName();
        gameState.isGameOver = true;
    }
   
    if(gameLogic.checkTieCondition(gameBoard.getBoard())){
        gameState.isGameOver = true;
    }
}

function endGame(){
    console.log("Game Over");
    console.log("Winner is " + gameState.winner);
}

function playGame(playerOne, playerTwo, boardSize){
    
    boardSize = boardSize || 3;
    gameBoard.createBoard(boardSize);

    while(!gameState.isGameOver){
        switchPlayer(playerOne, playerTwo);
        let selectedPosition = gameState.currPlayer.playMove();
        
        playTurn(gameState.currPlayer, selectedPosition);
        
        gameBoard.displayBoard();
    }

    endGame();
}

export {playGame};