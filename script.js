const p1 = document.querySelector('#player-1');
const p2 = document.querySelector('#player-2');
const message = document.querySelector('.message');
const boxes = document.querySelectorAll('#square');
const restartBtn = document.createElement('button');
const btn = document.querySelector('.btn');
let Players = ['Player 1', 'Player 2'];
boxes.forEach((box) => {
    box.style.visibility = 'hidden';
});

const GameBoard = (() => {
    let gameBoard = ['', '', '', '', '', '', '', '', ''];

    const getPlayers = () => {
        const form = document.querySelector('.form');
    
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            Players[0] = p1.value;
            Players[1] = p2.value;
            startGame();
        });
    };

    return {getPlayers, gameBoard}
})();


const renderBoard = () => {
        boxes.forEach((square) => {
                let index = square.getAttribute('data-index');
                let mark = GameBoard.gameBoard[index];
                square.textContent = mark;
        });
};

const startGame = () => {
    let i = 0;
    let result;
    boxes.forEach((square) => {
        square.style.visibility = 'visible';
        let index = square.getAttribute('data-index');
    
        square.addEventListener('click', () => {
            if (GameBoard.gameBoard[index] === ''){
                if (i%2 === 0){
                    GameBoard.gameBoard[index] = 'X';
                }else{
                    GameBoard.gameBoard[index] = 'O';
                }
                i++; 
            }
            renderBoard();
            result =  GameLogic();
            if (result === 0){
                message.textContent = `${Players[0]} Won`;
                stopGame();
                i = 0;
            }
            if (result === 1){
                message.textContent = `${Players[1]} Won`;
                stopGame();
                i = 0;
            }
        });
    });
};

const GameLogic = () => {
    let result = -1;
    if(GameBoard.gameBoard[0] == 'X' & GameBoard.gameBoard[1] == 'X' & GameBoard.gameBoard[2] == 'X'){
        result = 0;
    }
    else if(GameBoard.gameBoard[0] == 'O' & GameBoard.gameBoard[1] == 'O' & GameBoard.gameBoard[2] == 'O'){
        result = 1;
    }
    else if(GameBoard.gameBoard[3] == 'X' & GameBoard.gameBoard[4] == 'X' & GameBoard.gameBoard[5] == 'X'){
        result = 0;
    }
    else if(GameBoard.gameBoard[3] == 'O' & GameBoard.gameBoard[4] == 'O' & GameBoard.gameBoard[5] == 'O'){
        result = 1;
    }
    else if(GameBoard.gameBoard[6] == 'X' & GameBoard.gameBoard[7] == 'X' & GameBoard.gameBoard[8] == 'X'){
        result = 0;
    }
    else if(GameBoard.gameBoard[6] == 'O' & GameBoard.gameBoard[7] == 'O' & GameBoard.gameBoard[8] == 'O'){
        result = 1;
    }
    else if(GameBoard.gameBoard[0] == 'X' & GameBoard.gameBoard[3] == 'X' & GameBoard.gameBoard[6] == 'X'){
        result = 0;
    }
    else if(GameBoard.gameBoard[0] == 'O' & GameBoard.gameBoard[3] == 'O' & GameBoard.gameBoard[6] == 'O'){
        result = 1;
    }
    else if(GameBoard.gameBoard[1] == 'X' & GameBoard.gameBoard[4] == 'X' & GameBoard.gameBoard[7] == 'X'){
        result = 0;
    }
    else if(GameBoard.gameBoard[1] == 'O' & GameBoard.gameBoard[4] == 'O' & GameBoard.gameBoard[7] == 'O'){
        result = 1;
    }
    else if(GameBoard.gameBoard[2] == 'X' & GameBoard.gameBoard[5] == 'X' & GameBoard.gameBoard[8] == 'X'){
        result = 0;
    }
    else if(GameBoard.gameBoard[2] == 'O' & GameBoard.gameBoard[5] == 'O' & GameBoard.gameBoard[8] == 'O'){
        result = 1;
    }
    else if(GameBoard.gameBoard[0] == 'X' & GameBoard.gameBoard[4] == 'X' & GameBoard.gameBoard[8] == 'X'){
        result = 0;
    }
    else if(GameBoard.gameBoard[0] == 'O' & GameBoard.gameBoard[4] == 'O' & GameBoard.gameBoard[8] == 'O'){
        result = 1;
    }
    else if(GameBoard.gameBoard[2] == 'X' & GameBoard.gameBoard[4] == 'X' & GameBoard.gameBoard[6] == 'X'){
        result = 0;
    }
    else if(GameBoard.gameBoard[2] == 'O' & GameBoard.gameBoard[4] == 'O' & GameBoard.gameBoard[6] == 'O'){
        result = 1;
    }
    return result;
};

const stopGame = () => {
    restartBtn.classList.add('restart');
    restartBtn.textContent = 'Restart';
    btn.appendChild(restartBtn);
    restartBtn.addEventListener('click', () => {
        
        GameBoard.gameBoard = ['', '', '', '', '', '', '', '', ''];
        restartBtn.remove();
        message.textContent = '';
        boxes.forEach((box) => {
            box.style.visibility = 'hidden';
        });
        
        renderBoard();
        GameBoard.getPlayers();
        startGame();
    })
}

GameBoard.getPlayers();