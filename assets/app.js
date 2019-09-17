//
// Tic Tac Toe Board
// Every tile on the board is assigned to a variable
// That variable is then added to an array called gameTiles
// winTiles is an array that holds arrays of all the winning combinations
// xTiles and oTiles start as empty and are populated as the game runs
// There are also multiple buttons that are hidden or visible depending on the stage of the game
//

const topLeft = document.getElementById("topLeft");
const topCenter = document.getElementById("topCenter");
const topRight = document.getElementById("topRight");
const midLeft = document.getElementById("midLeft");
const midCenter = document.getElementById("midCenter");
const midRight = document.getElementById("midRight");
const botLeft = document.getElementById("botLeft");
const botCenter = document.getElementById("botCenter");
const botRight = document.getElementById("botRight");
const gameStatus = document.getElementById("gameStatus");
const newGame = document.getElementById("newGame");
const board = document.getElementById("board");
const onePlayerButton = document.getElementById("one");
const twoPlayersButton = document.getElementById("two");
const easyButton = document.getElementById("easy");
const hardButton = document.getElementById("hard");
const difficultyChoice = document.getElementById("difficulty")
const orderChoice = document.getElementById("order");
const playerFirst = document.getElementById("player");
const compFirst = document.getElementById("computer");
const name = document.getElementById("name");
var gameTiles = [topLeft, topCenter, topRight, midLeft, midCenter, midRight, botLeft, botCenter, botRight];
var winTiles = [[topLeft, topCenter, topRight], 
            [midLeft, midCenter, midRight],
            [botLeft, botCenter, botRight],
            [topLeft, midLeft, botLeft],
            [topCenter, midCenter, botCenter],
            [topRight, midRight, botRight],
            [topLeft, midCenter, botRight],
            [topRight, midCenter, botLeft]];
var xTiles = [];
var oTiles = [];
            
//
// All Game Functions
//

var gameOver = false;
var turn = 0;
newGame.style.display = "none";
board.style.display = "none";
gameStatus.innerText = "How many Players?";

newGame.addEventListener("click", function() {
    document.location.reload();
});

//
// Single Player Game Functions
//

difficultyChoice.style.display = "none";
orderChoice.style.display = "none";
var difficulty = "";

onePlayerButton.addEventListener("click", function() {
    onePlayerButton.style.display = "none";
    twoPlayersButton.style.display = "none";
    difficultyChoice.style.display = "block";
    gameStatus.innerText = "Choose Difficulty";

    easyButton.addEventListener("click", function() {
        board.style.display = "table";
        difficultyChoice.style.display = "none";
        gameStatus.innerText = "It is your turn";
        return difficulty = "easy";
    });
    hardButton.addEventListener("click", function() {
        board.style.display = "table";
        orderChoice.style.display = "none";
        difficultyChoice.style.display = "none";
        gameStatus.innerText = "It is your turn";
        return difficulty = "hard";
    });

    //
    // This loops through each tile on the board and creates a click Event Listener for it
    // If the tile has no text in it, a click will add the player's token (X) and execute the computer playing
    // Each time a tile is taken, it is pushed to the appropriate array to compare with the winning combinations
    //

    for (let i = 0; i < gameTiles.length; i++) {
        gameTiles[i].addEventListener("click", function() {
            if (gameTiles[i].innerText !== "X" && gameTiles[i].innerText !== "O") {
                gameStatus.innerText = "It is your turn";
                gameTiles[i].innerText = "X";
                xTiles.push(gameTiles[i]);
                checkOver();
                if (gameOver === false) {
                    if (difficulty === "easy") {
                        robotPlay();
    //
    // If the game mode is hard and the center piece is not taken, the computer will take it
    //
                    } else if (difficulty === "hard" && gameTiles[4].innerText == "") {
                        gameTiles[4].style.color = "red";
                        gameTiles[4].innerText = "O";
                        oTiles.push(gameTiles[4]);
                        turn++;
                    } else if (difficulty === "hard") {
                        checkCompWin();
                    }
                } 
            }
            turn++;
        });
    };

    //
    // This is the function that generates a random number for the computer to make a move
    // This only runs where neither the computer nor the player can win or the game is on easy mode
    // The function generates a random number between 0 and the length of the gameTiles array
    // If the game is not over (turn is less than 8), it places a token (O) in the randomly generated index if it is empty
    // Had issues with the computer placing nothing if the index was taken - added if empty do it and else run the function again
    // 
    // Be very careful if trying to replicate as you can create an infinite loop
    //

    function robotPlay() {
        var randomNumber = Math.trunc(Math.random() * (gameTiles.length));

        if (turn < 8) {
            if (gameTiles[randomNumber].innerText == "") {
                gameTiles[randomNumber].style.color = "red";
                gameTiles[randomNumber].innerText = "O";
                oTiles.push(gameTiles[randomNumber]);
                checkOver();
                turn++;
            } else {
                robotPlay();
            }
        } else {
            alert("You Tied!");
            newGame.style.display = "block";
            gameStatus.innerText = "Click New Game to Start Over!";
        }
    };

    //
    // This is the function that checks to see if the game is over and if it is alerts the winner
    //

    function checkOver() {
        for (let i = 0; i < winTiles.length; i++) {
            if (xTiles.includes(winTiles[i][0])) {
                if (xTiles.includes(winTiles[i][1])) {
                    if (xTiles.includes(winTiles[i][2])) {
                        alert("Congratulations! You won!");
                        newGame.style.display = "block";
                        gameStatus.innerText = "Click New Game to Start Over!";
                        return gameOver = true;
                    }
                }
            } else if (oTiles.includes(winTiles[i][0])) {
                if (oTiles.includes(winTiles[i][1])) {
                    if (oTiles.includes(winTiles[i][2])) {
                        alert("The computer won this round. Better luck next time.");
                        newGame.style.display = "block";
                        gameStatus.innerText = "Click New Game to Start Over!";
                        return gameOver = true;
                    }
                }              
            }
        } 
    };

    //
    // This is the first part of the computer's AI
    // When on hard mode, the computer will always prioritize winning over blocking the player from winning
    // The computer loops through all the tiles in it's array and if there are two win conditions it will place a tile in the third as long as it is open
    // There were some issues with looping even after the win condition had been met so added the oldTurn variable to create a stop gate
    //

    function checkCompWin() {
        let oldTurn = turn;
        for (let i = 0; i < winTiles.length; i++) {
            if (oTiles.includes(winTiles[i][0]) && oTiles.includes(winTiles[i][1]) && winTiles[i][2].innerText == "") {
                winTiles[i][2].style.color = "red";
                winTiles[i][2].innerText = "O";
                oTiles.push(winTiles[i][2]);
                checkOver();
                turn++;
            } else if (oTiles.includes(winTiles[i][0]) && oTiles.includes(winTiles[i][2]) && winTiles[i][1].innerText == "") {
                winTiles[i][1].style.color = "red";
                winTiles[i][1].innerText = "O";
                oTiles.push(winTiles[i][1]);
                checkOver();
                turn++;
            } else if (oTiles.includes(winTiles[i][1]) && oTiles.includes(winTiles[i][2]) && winTiles[i][0].innerText == "") {
                winTiles[i][0].style.color = "red";
                winTiles[i][0].innerText = "O";
                oTiles.push(winTiles[i][0]);
                checkOver();
                turn++;
            }
        }
        if (oldTurn === turn) {
            checkPlayerWin();
        }
    };

    //
    // This is the second part of the computer's AI
    // If the computer cannot win, it will try to stop the player from winning
    // The computer loops through all the tiles in the player's array and if there are two win conditions it will place a tile in the third as long as it is open
    // Similar issues with looping after so added the same oldTurn logic
    // There were also issues with the computer placing two tokens so changed i to be larger than the stopping condition once one play was achieved
    //

    function checkPlayerWin() {
        let oldTurn = turn;
        for (let i = 0; i < winTiles.length; i++) {
            if (xTiles.includes(winTiles[i][0]) && xTiles.includes(winTiles[i][1]) && winTiles[i][2].innerText == "") {
                winTiles[i][2].style.color = "red";
                winTiles[i][2].innerText = "O";
                oTiles.push(winTiles[i][2]);
                checkOver();
                turn++;
                i = 50;
            } else if (xTiles.includes(winTiles[i][0]) && xTiles.includes(winTiles[i][2]) && winTiles[i][1].innerText == "") {
                winTiles[i][1].style.color = "red";
                winTiles[i][1].innerText = "O";
                oTiles.push(winTiles[i][1]);
                checkOver();
                turn++;
                i = 50;
            } else if (xTiles.includes(winTiles[i][1]) && xTiles.includes(winTiles[i][2]) && winTiles[i][0].innerText == "") {
                winTiles[i][0].style.color = "red";
                winTiles[i][0].innerText = "O";
                oTiles.push(winTiles[i][0]);
                checkOver();
                turn++;
                i = 50;
            }
        }
        if (oldTurn === turn) {
            robotPlay();
        }
    };
});

//
// Two Player Game Functions
//

twoPlayersButton.addEventListener("click", function() {
    board.style.display = "table";
    onePlayerButton.style.display = "none";
    twoPlayersButton.style.display = "none";
    gameStatus.innerText = "Click a tile to begin!";

    //
    // Two player functions work mostly the same way as one player
    // Switch between player one and player two by checking if turn is even or odd using modulo
    //

    for (let i = 0; i < gameTiles.length; i++) {
        gameTiles[i].addEventListener("click", function() {
            if ((turn % 2) == 0) {
                if (gameTiles[i].innerText !== "X" && gameTiles[i].innerText !== "O") {
                    gameStatus.innerText = "Player Two's Turn";
                    gameTiles[i].innerText = "X";
                    xTiles.push(gameTiles[i]);
                    checkOver();
                    if (gameOver === false) {
                        turn++;
                    } 
                }
            } else {
                if (gameTiles[i].innerText !== "X" && gameTiles[i].innerText !== "O") {
                    gameStatus.innerText = "Player One's Turn";
                    gameTiles[i].style.color = "red";
                    gameTiles[i].innerText = "O";
                    oTiles.push(gameTiles[i]);
                    checkOver();
                    if (gameOver === false) {
                        turn++;
                    }
                }
            }
        });
    }

    //
    // This function checks to see if there is a winner and alerts them
    //

    function checkOver() {
        for (let i = 0; i < winTiles.length; i++) {
            if (xTiles.includes(winTiles[i][0])) {
                if (xTiles.includes(winTiles[i][1])) {
                    if (xTiles.includes(winTiles[i][2])) {
                        alert("Player One Wins!");
                        newGame.style.display = "block";
                        gameStatus.innerText = "Click New Game to Start Over!";
                        return gameOver = true;
                    }
                }
            } else if (oTiles.includes(winTiles[i][0])) {
                if (oTiles.includes(winTiles[i][1])) {
                    if (oTiles.includes(winTiles[i][2])) {
                        alert("Player Two Wins!");
                        newGame.style.display = "block";
                        gameStatus.innerText = "Click New Game to Start Over!";
                        gameOver = true;
                    }
                }
            }
        } 
        if (turn === 8 && gameOver === false) {
            alert("You Tied!");
            newGame.style.display = "block";
            gameStatus.innerText = "Click New Game to Start Over!";
        }
    }
});