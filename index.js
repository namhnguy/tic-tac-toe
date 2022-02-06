const GameBoard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];
    const get = () => board;
    const set = (mark, location) => board[location] = mark;
    const clear = () => {
        board = board.map(() => '');
    };

    return {
        get,
        set,
        clear,
    };
})();

const DisplayController = (() => {
    const notification = document.querySelector(".notification");

    const show = (mark, node) => {
        node.textContent = mark;
    };

    const showNotification = (name) => {
        notification.textContent = `${name}'s turn!`
    }

    const showWin = (name) => {
        if (name === "tie") {
            notification.textContent = "The game is a tie!";
            const buttons = document.querySelector(".board-container");
            let children = Array.from(buttons.children);
            children.forEach(child => child.disabled = true);
        }
        else {
            notification.textContent = `The winner is ${name}`;
            const buttons = document.querySelector(".board-container");
            let children = Array.from(buttons.children);
            children.forEach(child => child.disabled = true);
        }

    }

    const showClear = () => {
        const board = document.querySelector(".board-container");
        let children = Array.from(board.children);
        children.forEach(child => child.textContent = '');
    }

    return {
        show,
        showNotification,
        showWin,
        showClear,
    }
})();

const CheckWin = (() => {
    const checkBoard = (mark, currentBoard) => {
        //check first row 
        if (currentBoard[0] === mark) {
            if (currentBoard[1] === mark) {
                if (currentBoard[2] === mark) {
                    return true;
                }
            }
        }
        //check second row
        if (currentBoard[3] === mark) {
            if (currentBoard[4] === mark) {
                if (currentBoard[5] === mark) {
                    return true;
                }
            }
        }
        //check third row
        if (currentBoard[6] === mark) {
            if (currentBoard[7] === mark) {
                if (currentBoard[8] === mark) {
                    return true;
                }
            }
        }
        //check first column
        if (currentBoard[0] === mark) {
            if (currentBoard[3] === mark) {
                if (currentBoard[6] === mark) {
                    return true;
                }
            }
        }
        //check middle column
        if (currentBoard[1] === mark) {
            if (currentBoard[4] === mark) {
                if (currentBoard[7] === mark) {
                    return true;
                }
            }
        }
        //check third column
        if (currentBoard[2] === mark) {
            if (currentBoard[5] === mark) {
                if (currentBoard[8] === mark) {
                    return true;
                }
            }
        }
        //check left diagonal
        if (currentBoard[0] === mark) {
            if (currentBoard[4] === mark) {
                if (currentBoard[8] === mark) {
                    return true;
                }
            }
        }
        //check right diagonal
        if (currentBoard[2] === mark) {
            if (currentBoard[4] === mark) {
                if (currentBoard[6] === mark) {
                    return true;
                }
            }
        }
        return false;
    };

    return {
        checkBoard,
    }
})();

const GameController = ((board, display, checkWin) => {
    const player = (name, marker) => {
        return { name, marker };
    };

    const player1 = player('Player 1', 'x');
    const player2 = player('Player 2', 'o');
    let counter = 0;

    const playGame = () => {
        const boardButtons = document.querySelector(".board-container");
        boardButtons.addEventListener('click', event => {
            counter += 1;
            if (event.target.id !== '') {
                let node = document.getElementById(event.target.id);
                if (counter % 2 === 1) {
                    display.showNotification(player2.name);
                    display.show(player1.marker, node);
                    board.set(player1.marker, parseInt(event.target.id));
                    if (counter >= 5) {
                        if (checkWin.checkBoard(player1.marker, board.get())) {
                            display.showWin(player1.name);
                        }
                    }
                }
                else {
                    display.showNotification(player1.name);
                    display.show(player2.marker, node);
                    board.set(player2.marker, parseInt(event.target.id));
                    if (counter >= 5) {
                        if (checkWin.checkBoard(player2.marker, board.get())) {
                            display.showWin(player2.name);
                        }
                    }
                }
            }
            if (counter >= 9) {
                display.showWin("tie");
            }
        });
    };

    const restart = () => {
        const restartButton = document.querySelector(".restart");
        restartButton.addEventListener('click', () => {
            board.clear();
            display.showClear();
            display.showNotification(player1.name);
            const boardButtons = document.querySelector(".board-container");
            let children = Array.from(boardButtons.children);
            children.forEach(child => child.disabled = false);
            counter = 0;
        });
    };

    const init = () => {
        playGame();
        restart();
        display.showNotification(player1.name);
    }

    return {
        init,
    };


})(GameBoard, DisplayController, CheckWin);

GameController.init();