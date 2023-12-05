
const mainContainer = document.querySelector('.main');

function createGrid(gridSize){
    let container = document.createElement('div');
    container.classList.add('game-board');

    for(let i = 0; i < gridSize; i++){
        for(let j = 0; j < gridSize; j++){
            let item = document.createElement('div');
            item.classList.add('cell');
            item.dataset.row = i;
            item.dataset.col = j;
            container.appendChild(item);
        }
    }
    
    mainContainer.appendChild(container);
    return container;
}

function removeGrid(){
    const board = document.querySelector('.game-board');
    if(board === null) return;

    board.remove();
}

function addContent(token, value) {
    let element = document.querySelector(token);
    if(element === null) return;

    element.textContent = value;
    if(element.classList.contains('cell')){
        element.classList.add(value);
    }
}

export {createGrid, removeGrid, addContent};