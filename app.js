
function userMoveType(){
    let position = prompt("Enter cell position");
    position = position.split(",").map((curr) => curr = Number(curr));
    return position;
}

function computerMoveType(){
    let position = gameBoard.getRandomEmptyCell();
    return position;
}

function createPlayer(name, symbol, moveType){
    const getName = () => name;
    const getSymbol = () => symbol;
    return {getName, getSymbol, playMove: moveType};
}


const user = createPlayer("Anonymous", "X", userMoveType);
const computer = createPlayer("Computer", "O", computerMoveType);
const boardSize = 3;


const gameBoard = (function(size){
    
    const board = createBoard();
    
    function createBoard(){
        const board = [];
        
        for(let i = 0; i < size; ++i){
            board[i] = [];
            for(let j = 0; j < size; ++j){
                board[i][j] = null;
            }
        }
        
        return board;
    }

    function showBoard(){
        let boardOutput = "";
        for(let i = 0; i < size; ++i){
            for(let j = 0; j < size; ++j){
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

    function getSize(){
        return size;
    }

    function isCellEmpty(cell){
        return board[cell[0]][cell[1]] === null;
    }

    function getRandomEmptyCell(){
        const emptyCells = getEmptyCells();
        let length = emptyCells.length;
        let randomIndex = Math.floor(Math.random() * length);
        return [emptyCells[randomIndex][0], emptyCells[randomIndex][1]];
    }

    function getEmptyCells(){
        const emptyCells = [];

        for(let i = 0; i < size; ++i){
            for(let j = 0; j < size; ++j){
                if(board[i][j] === null){
                    emptyCells.push([i, j]);
                }
            }
        }

        return emptyCells;
    }

    function setCellValue(cell, value){
        board[cell[0]][cell[1]] = value;
    }

    function getRowCount(cell, value){
        let row = cell[0];
        let count = 0;

        for(let i = 0; i < size; ++i){
            if(board[row][i] === value){
                count++;
            }
        }

        return count;
    }

    function getColumnCount(cell, value){
        let col = cell[1];
        let count = 0;

        for(let i = 0; i < size; ++i){
            if(board[i][col] === value){
                count++;
            }
        }

        return count;
    }

    function getLeftDiagonalCount(value){
        let count = 0;

        for(let i = 0; i < size; i++){
            if(board[i][i] === value){
                count++;
            }
        }

        return count;
    }

    function getRightDiagonalCount(value){
        let count = 0;

        for(let i = 0; i < size; i++){
            if(board[i][size - 1 - i] === value){
                count++;
            }
        }

        return count;
    }

    function isBoardFull(){
        for(let i = 0; i < size; ++i){
            for(let j = 0; j < size; ++j){
                if(board[i][j] === null){
                    return false;
                }
            }
        }

        return true;
    }

    return {isCellEmpty, isBoardFull, showBoard, setCellValue, getSize, getRandomEmptyCell, 
            getRowCount, getColumnCount, getLeftDiagonalCount, getRightDiagonalCount};

})(boardSize);


const gameController = (function(playerOne, playerTwo){

    let winner = null;
    let isGameOver = false;
    let currPlayer = null;

    function isMoveValid(cell){
        return gameBoard.isCellEmpty(cell);
    }

    function setPlayerSymbol(cell){
        gameBoard.setCellValue(cell, currPlayer.getSymbol());
    }

    function checkWinCondition(cell){
        if(gameBoard.getRowCount(cell, currPlayer.getSymbol()) === gameBoard.getSize()
            || gameBoard.getColumnCount(cell, currPlayer.getSymbol()) === gameBoard.getSize()
            || gameBoard.getRightDiagonalCount(currPlayer.getSymbol()) === gameBoard.getSize()
            || gameBoard.getLeftDiagonalCount(currPlayer.getSymbol()) === gameBoard.getSize()){
                winner = currPlayer.getName();
                isGameOver = true;
        }
    }

    function checkTieCondition(){
        if(gameBoard.isBoardFull()){
            winner = "Tie";
            isGameOver = true;
        }
    }

    function switchPlayer(){
        currPlayer = currPlayer === playerOne? playerTwo : playerOne;
    }

    function playTurn(selectedPosition){
        if(!isMoveValid(selectedPosition)){
            console.log("Invalid Move");
            return;
        }

        setPlayerSymbol(selectedPosition);
        checkTieCondition();
        checkWinCondition(selectedPosition);
    }

    function endGame(){
        console.log("Game Over");
        console.log("Winner is " + winner);
    }

    function playGame(){
        currPlayer = playerOne;

        while(!isGameOver){
            let selectedPosition = currPlayer.playMove();
            
            playTurn(selectedPosition);
            
            gameBoard.showBoard();
            switchPlayer();
        }

        endGame();
    }

    return {playGame};
})(user, computer);

document.querySelector('button').onclick = function(e){
    e.target.setAttribute('disabled', '');
    gameController.playGame();
    e.target.removeAttribute('disabled');
}