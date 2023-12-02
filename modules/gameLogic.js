
function isMoveValid(board, cell){
    return board[cell[0]][cell[1]] === null;
}

function checkWinCondition(board, cell, value){
    const length = board.length;
    return (getRowCount(board, cell, value) === length
            || getColumnCount(board, cell, value) === length
            || getRightDiagonalCount(board, value) === length
            || getLeftDiagonalCount(board, value) === length);
}

function checkTieCondition(board){
    for(let i = 0; i < board.length; ++i){
        for(let j = 0; j < board.length; ++j){
            if(board[i][j] === null){
                return false;
            }
        }
    }

    return true;
}

function getRowCount(board, cell, value){
    let row = cell[0];
    let count = 0;

    for(let i = 0; i < board.length; ++i){
        if(board[row][i] === value){
            count++;
        }
    }

    return count;
}

function getColumnCount(board, cell, value){
    let col = cell[1];
    let count = 0;

    for(let i = 0; i < board.length; ++i){
        if(board[i][col] === value){
            count++;
        }
    }

    return count;
}

function getLeftDiagonalCount(board, value){
    let count = 0;

    for(let i = 0; i < board.length; i++){
        if(board[i][i] === value){
            count++;
        }
    }

    return count;
}

function getRightDiagonalCount(board, value){
    let count = 0;

    for(let i = 0; i < board.length; i++){
        if(board[i][board.length - 1 - i] === value){
            count++;
        }
    }

    return count;
}


export {isMoveValid, checkWinCondition, checkTieCondition};