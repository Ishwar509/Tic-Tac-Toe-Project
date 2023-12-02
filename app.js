
import * as gameController from "./modules/gameController.js";
import * as computerAI from "./modules/computerAI.js";

function createPlayer(name, symbol, moveType){
    const getName = () => name;
    const getSymbol = () => symbol;
    return {getName, getSymbol, playMove: moveType};
}

function userMoveType(){
    let position = prompt("Enter cell position");
    position = position.split(",").map((curr) => curr = Number(curr));
    return position;
}

const user = createPlayer("Anonymous", "X", userMoveType);
const computer = createPlayer("Computer", "O", computerAI.moveType);
const boardSize = 3;

document.querySelector('button').onclick = function(e){
    e.target.setAttribute('disabled', '');
    gameController.playGame(user, computer, boardSize);
    e.target.removeAttribute('disabled');
}