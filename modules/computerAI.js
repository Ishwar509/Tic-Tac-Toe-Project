import * as gameBoard from "./gameBoard.js";
import * as gameCharacters from "./gameCharacters.js";
import * as gameLogic from "./gameLogic.js";

let mode = easyMode;

function getMode(){
    return mode;
}

function changeMode(modeFactor){
    if(modeFactor == 1){
        mode = easyMode;
    }
    else if(modeFactor == 2){
        mode = mediumMode;
    }
    else{
        mode = hardMode;
    }
}

function easyMode(){
    return getRandomEmptyCell(gameBoard.getBoard());
}

function mediumMode(){
    let randomness = Math.floor(Math.random() * 3);
    if(randomness > 0){
        return hardMode();
    }
    return easyMode();
}

function hardMode(){
    const user = gameCharacters.getPlayers().user;
    const computer = gameCharacters.getPlayers().computer;
    return findBestMove(gameBoard.getBoard(), user, computer);
}

function getRandomEmptyCell(board){
    const emptyCells = getEmptyCells(board);
    let length = emptyCells.length;
    let randomIndex = Math.floor(Math.random() * length);
    return [emptyCells[randomIndex][0], emptyCells[randomIndex][1]];
}

function getEmptyCells(board){
    const length = board.length;
    const emptyCells = [];

    for(let i = 0; i < length; ++i){
        for(let j = 0; j < length; ++j){
            if(board[i][j] === null){
                emptyCells.push([i, j]);
            }
        }
    }

    return emptyCells;
}

function findBestMove(board, user, computer) {
    let bestMove = null;
    let bestScore = -Infinity;

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === null) {
                board[i][j] = computer.getSymbol();
                let score = minimax(board, false, user, computer);
                board[i][j] = null;

                if (score > bestScore) {
                    bestScore = score;
                    bestMove = [i, j];
                }
            }
        }
    }

    return bestMove;
}

function minimax(board, isMaximizingPlayer, user, computer) {
    // Base cases: check for terminal states
    if (gameLogic.checkWinCondition(board, user.getSymbol())) {
        return -1;
    } else if (gameLogic.checkWinCondition(board, computer.getSymbol())) {
        return 1;
    } else if (gameLogic.checkTieCondition(board)) {
        return 0;
    }

    // Recursive case: evaluate all possible moves
    if (isMaximizingPlayer) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] === null) {
                    board[i][j] = computer.getSymbol();
                    let score = minimax(board, false, user, computer);
                    board[i][j] = null;
                    bestScore = Math.max(score, bestScore);
                }
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] === null) {
                    board[i][j] = user.getSymbol();
                    let score = minimax(board, true, user, computer);
                    board[i][j] = null;
                    bestScore = Math.min(score, bestScore);
                }
            }
        }
        return bestScore;
    }
}

export {getMode, changeMode};