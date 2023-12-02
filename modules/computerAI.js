import { getBoard } from "./gameBoard.js";

function moveType(){
    return getRandomEmptyCell(getBoard());
}

function getRandomEmptyCell(board){
    const emptyCells = getEmptyCells(board);
    let length = emptyCells.length;
    let randomIndex = Math.floor(Math.random() * length);
    return [emptyCells[randomIndex][0], emptyCells[randomIndex][1]];
}

function getEmptyCells(board){
    const emptyCells = [];

    for(let i = 0; i < board.length; ++i){
        for(let j = 0; j < board[i].length; ++j){
            if(board[i][j] === null){
                emptyCells.push([i, j]);
            }
        }
    }

    return emptyCells;
}

export {moveType};