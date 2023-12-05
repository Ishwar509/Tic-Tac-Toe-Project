
let board = null;

function createBoard(boardSize){
    board = [];
    for(let i = 0; i < boardSize; ++i){
        board[i] = [];
        for(let j = 0; j < boardSize; ++j){
            board[i][j] = null;
        }
    }
}

function resetBoard(){
    board = null;
}

function getBoard(){
    return board;
}

function displayBoard(board){
    let boardOutput = "";
    for(let i = 0; i < board.length; ++i){
        for(let j = 0; j < board[i].length; ++j){
            if(board[i][j] !== null){
                boardOutput += board[i][j] + " ";
            } else {
                boardOutput += "# ";
            }
        }
        boardOutput += "\n";
    }

    console.log(boardOutput);
}

function setCellValue(cell, value){
    board[cell[0]][cell[1]] = value;
}

export {createBoard, resetBoard, getBoard, displayBoard, setCellValue};