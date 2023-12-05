import * as computerAI from "./computerAI.js";

let userSymbol = "X";
let computerSymbol = "O";

let user = null;
let computer = null;

function createNewPlayers() {
    user = createPlayer('User', userSymbol, null);
    computer = createPlayer('Computer', computerSymbol, computerAI.getMode());

    return {user, computer};
}

function getPlayers(){
    return {user, computer};
}

function createPlayer(name, symbol, moveType){
    const getName = () => name;
    const getSymbol = () => symbol;
    return {getName, getSymbol, playMove: moveType};
}


function changeSymbol(selectedSymbol){
    if(selectedSymbol === "X"){
        userSymbol = "X";
        computerSymbol = "O";
    }
    else{
        userSymbol = "O";
        computerSymbol = "X";
    }
}

export {createNewPlayers, getPlayers, changeSymbol};

