class TicTacToe {
    constructor() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.cells = document.querySelectorAll('.cell');
        this.currentPlayerElement = document.getElementById('current-player');
        this.gameMessageElement = document.getElementById('game-message');
        this.replayBtn = document.getElementById('replay-btn');
        
        this.winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        
        this.initializeGame();
    }
    
    initializeGame() {
        this.cells.forEach(cell => {
            cell.addEventListener('click', this.handleCellClick.bind(this));
        });
        
        this.replayBtn.addEventListener('click', this.resetGame.bind(this));
        this.updateDisplay();
    }
    
    handleCellClick(event) {
        const cell = event.target;
        const index = parseInt(cell.getAttribute('data-index'));
        
        if (this.board[index] !== '' || !this.gameActive) {
            return;
        }
        
        this.makeMove(index, cell);
    }
    
    makeMove(index, cell) {
        this.board[index] = this.currentPlayer;
        cell.textContent = this.currentPlayer;
        cell.classList.add(this.currentPlayer.toLowerCase());
        
        if (this.checkWin()) {
            this.endGame(`Player ${this.currentPlayer} wins!`, 'win');
        } else if (this.checkDraw()) {
            this.endGame("It's a draw!", 'draw');
        } else {
            this.switchPlayer();
        }
    }
    
    checkWin() {
        return this.winningConditions.some(condition => {
            return condition.every(index => {
                return this.board[index] === this.currentPlayer;
            });
        });
    }
    
    checkDraw() {
        return this.board.every(cell => cell !== '');
    }
    
    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.updateDisplay();
    }
    
    updateDisplay() {
        this.currentPlayerElement.textContent = this.currentPlayer;
        if (this.gameActive) {
            this.gameMessageElement.textContent = '';
            this.gameMessageElement.className = 'game-message';
        }
    }
    
    endGame(message, messageType) {
        this.gameActive = false;
        this.gameMessageElement.textContent = message;
        this.gameMessageElement.className = `game-message ${messageType}`;
        
        this.cells.forEach(cell => {
            cell.style.cursor = 'not-allowed';
        });
    }
    
    resetGame() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        
        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o');
            cell.style.cursor = 'pointer';
        });
        
        this.updateDisplay();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
});