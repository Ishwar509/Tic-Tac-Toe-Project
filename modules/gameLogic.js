
function isMoveValid(board, cell){
    return (board[cell[0]][cell[1]] === null);
}

function checkWinCondition(board, value){
    const length = board.length;
    return (   checkRows(board, value)
            || checkColumns(board, value)
            || checkLeftDiagonal(board, value)
            || checkRightDiagonal(board, value));
}

function checkTieCondition(board){
    let length = board.length;
    for(let i = 0; i < length; ++i){
        for(let j = 0; j < length; ++j){
            if(board[i][j] === null){
                return false;
            }
        }
    }

    return true;
}

function checkRows(board, value){
    let length = board.length;

    for(let i = 0; i < length; ++i){
        let count = 0;
        for(let j = 0; j < length; ++j){
            if(board[i][j] === value) count++;
        }

        if(count === length) return true;
    }

    return false;
}

function checkColumns(board, value){
    let length = board.length;

    for(let i = 0; i < length; ++i){
        let count = 0;
        for(let j = 0; j < length; ++j){
            if(board[j][i] === value) count++;
        }

        if(count === length) return true;
    }

    return false;
}

function checkLeftDiagonal(board, value){
    let count = 0;
    let length = board.length;

    for(let i = 0; i < length; i++){
        if(board[i][i] === value){
            count++;
        }
    }

    return count === length;
}

function checkRightDiagonal(board, value){
    let count = 0;
    let length = board.length;

    for(let i = 0; i < length; i++){
        if(board[i][length - 1 - i] === value){
            count++;
        }
    }

    return count === length;
}

export {isMoveValid, checkWinCondition, checkTieCondition};