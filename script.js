const p1 = document.querySelector('#player-1');
const p2 = document.querySelector('#player-2');
const message = document.querySelector('.message');

const GameBoard = (() => {
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let Players = [];

    const getPlayers = () => {
        const form = document.querySelector('.form');
    
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            Players.push(Player(p1.value));
            Players.push(Player(p2.value));
            StartGame.startGame();
        });
    };

    return {getPlayers, gameBoard, Players}
})();

const Player = (name) =>{
    let playerName = name;
    return {playerName}
}


const RenderBoard = (() => {
    const boxes = document.querySelectorAll('#square');
    const render = () => {
        boxes.forEach((square) => {
                let index = square.getAttribute('data-index');
                let mark = GameBoard.gameBoard[index];
                square.textContent = mark;
        });
    }
    return {render}
})();

const StartGame = (() => {
    const boxes = document.querySelectorAll('#square');

    const startGame = () => {
        let i = 0;
        let result = -1;
        boxes.forEach((square) => {
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
                RenderBoard.render();
                result =  GameLogic();
                if (result === 0){
                    message.textContent = `${GameBoard.Players[0].playerName} Won`;
                    stopGame();
                }
                if (result === 1){
                    message.textContent = `${GameBoard.Players[1].playerName} Won`;
                    stopGame();
                }
            });
        });
    }

    return {startGame}
})();

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
    const restartBtn = document.createElement('button');
    const btn = document.querySelector('.btn');
    restartBtn.classList.add('restart');
    restartBtn.textContent = 'Restart';
    btn.appendChild(restartBtn);
    restartBtn.addEventListener('click', () => {
        p1.value = '';
        p2.value = '';
        GameBoard.player1 = '';
        GameBoard.player2 = '';
        
        GameBoard.gameBoard = ['', '', '', '', '', '', '', '', ''];
        RenderBoard.render();
        GameBoard.Players = [];
        restartBtn.remove();
        message.remove();
    })
}

GameBoard.getPlayers();