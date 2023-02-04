/* eslint-disable prefer-template */
/* eslint-disable no-use-before-define */
import './style.css';
import Player from './player';

const mainHandler =(() => {
    const player = Player();
    const computer = Player();
    const playerBoard = player.gameboard;
    const computerBoard = computer.gameboard;

    const startGame = () => {
        DOM(player, computer);
    };

    const toggleComputer = () => {
        const attackCoordinate = computer.attackRandomCoordinate();
        const top = attackCoordinate[0];
        const left = attackCoordinate[1];

        const bool = checkIfSquareOccupied(top, left, playerBoard);
        changeCoordinateColor(top.toString() + left.toString(), bool);
        const isWinner = playerBoard.receiveAttack(top, left);
        if (isWinner) { displayWinner("Computer") }
    };

    const callPlaceShips = () => {
        computer.placeShips();
    };

    const checkIfSquareOccupied = (top, left, playerBoardxx) => {
        const {occupiedCoordinates} = playerBoardxx;
    
        for (let i = 0; i < occupiedCoordinates.length; i+=1) {
            if (occupiedCoordinates[i][0] === top && occupiedCoordinates[i][1] === left) {
                return true;
            }
        }
        return false;
    };

    return { playerBoard, checkIfSquareOccupied, callPlaceShips,  startGame, toggleComputer }

})();

function DOM(player, computer) {
    const container = document.getElementsByClassName("container")[0];
    // Header div
    const header = document.createElement("div");
    header.className = "header";
    const h1 = document.createElement("h1");
    h1.id = "title";
    h1.innerHTML = "BATTLESHIP";
    header.appendChild(h1);
    container.appendChild(header);

    const playerBoard = player.gameboard;
    const computerBoard = computer.gameboard;

    const div = document.createElement("div");
    div.className = "main-div";

    const playerDiv = document.createElement("div");
    playerDiv.className = "board player";


    for (let i = 0; i < 10; i+=1) {
        for (let j = 0; j < 10; j+=1) {
            const square = document.createElement("div");
            square.className = "player-coord";
            square.id = i.toString()+j.toString() + "board";
            playerDiv.appendChild(square);
        }
    }

    const computerDiv = document.createElement("div");
    computerDiv.className = "board computer";

    for (let i = 0; i < 10; i+=1) {
        for (let j = 0; j < 10; j+=1) {
            const square2 = document.createElement("div");
            square2.className = "computer-coord safe";
            square2.id = i.toString() + j.toString() + "comp";
            square2.addEventListener('click', (event) => {
                if (square2.style.backgroundColor !== "rgb(98, 169, 220)") {
                    if (mainHandler.checkIfSquareOccupied(i, j, computerBoard) === true) {
                        square2.style.backgroundColor = "green";
                    } else {
                        square2.style.backgroundColor = "rgb(98, 169, 220)";
                    }
                    square2.className = "computer-coord";
                    const isWinner = computerBoard.receiveAttack(i, j);
                    if (isWinner) { displayWinner("You") }
                    else { mainHandler.toggleComputer(); }
                }
            });
            computerDiv.appendChild(square2);
        }
    }

    div.appendChild(playerDiv);
    div.appendChild(computerDiv);
    container.appendChild(div);
    createStartingPopup();
    createWinnerDisplay();
}

function createWinnerDisplay() {
    const popup = document.getElementsByClassName("popup")[0];
    const winnerPopup = document.createElement("div");
    winnerPopup.className = "winner-popup hidden";

    const h1 = document.createElement("h1");
    h1.id = "winner-tag";
    h1.innerHTML = "Oooga BOoga";
    winnerPopup.appendChild(h1);

    const button = document.createElement("button");
    button.innerHTML = "RESTART";
    button.addEventListener('click', (event) => {
        window.location.reload();
    });
    winnerPopup.appendChild(button);
    popup.appendChild(winnerPopup);

}

function createStartingPopup() {
    const container = document.getElementsByClassName("container")[0];
    const popup = document.createElement("div");
    popup.className = "popup";

    const popupDiv = document.createElement('div');
    popupDiv.className = "popup-main-div";

    const h2 = document.createElement('h2');
    h2.innerHTML = "Welcome to BATTLESHIP Soldier!";
    h2.id = "battleship";
    popupDiv.appendChild(h2);

    createStartingPosition(popupDiv);

    popup.appendChild(popupDiv);
    container.appendChild(popup);
}

function shipHelper(top, left, length) {
    mainHandler.playerBoard.placeShip(top, left, length);
    /* square.id = i.toString()+j.toString() + "board"; */

    for (let i = 0; i < length; i+=1) {
        const sq = document.getElementById(top.toString()+(left+i).toString()+"board");
        sq.style.backgroundColor = "grey";
    }

    if (length === 2) {
        mainHandler.callPlaceShips();
    }
}

function createStartingPosition(popup) {
    const div = document.createElement("div");
    div.className = "starting-grid";
    
    const shipArray = [];
    shipArray[0] = ["Carrier", 5];
    shipArray[1] = ["Battleship", 4];
    shipArray[2] = ["Destroyer", 3];
    shipArray[3] = ["Submarine", 3];
    shipArray[4] = ["Patrol Boat", 2];
    
    const h3 = document.createElement('h3');
    h3.innerHTML = `Place your ${ shipArray[0][0].toUpperCase() }.`;
    h3.id = "place-ship";
    popup.appendChild(h3);


    for (let i = 0; i < 10; i+=1) {
        for (let j = 0; j < 10; j+=1) {
            const square = document.createElement("div");
            square.className = "starting-coord";
            square.id = i.toString()+j.toString();
            square.addEventListener('mouseover', (event) => {
                if (shipArray[0][1] + j <= 10 && shipArray.length  !== 0) {
                    for (let k = 0; k < shipArray[0][1]; k+=1) {
                        const adv = document.getElementById(i.toString()+(j+k).toString());
                        if (adv.style.backgroundColor !== "grey") {
                            adv.style.backgroundColor = "blue";
                        }
                    }
                }
            })
            square.addEventListener('mouseout', (event) => {
                try {
                    if (shipArray.length  !== 0) {
                        for (let k = 0; k < shipArray[0][1]; k+=1) {
                            const adv = document.getElementById(i.toString()+(j+k).toString());
                            if (adv.style.backgroundColor !== "grey") {
                                adv.style.backgroundColor = "white";
                            }
                        }
                    }
                } catch {
                    return;
                }
            })
            square.addEventListener('click', (event) => {
                if (shipArray[0][1] + j <= 10) {
                    let bool = false;
                    const advArray = [];
                    for (let k = 0; k < shipArray[0][1]; k+=1) {
                        const adv = document.getElementById(i.toString()+(j+k).toString());
                        advArray.push(adv);
                        if (adv.style.backgroundColor === "grey") { bool = true; }
                    }
                    if (!bool) {
                        for (let x = 0; x < advArray.length; x +=1) {
                            advArray[x].style.background = "grey";
                        }
                        const ship = shipArray.shift();
                        if (ship[0] === "Patrol Boat") {
                            toggleStartPopup();
                        } else {
                            h3.innerHTML = `Place your ${ shipArray[0][0].toUpperCase() }.`;
                        }
                        shipHelper(i, j, ship[1]);
                    }
                }
            } )
            div.appendChild(square);
        }
    }

    popup.appendChild(div);
}

function displayWinner(player) {
    const tag = document.getElementById("winner-tag");
    tag.innerHTML = `${player} won!`;
    const popup = document.getElementsByClassName("popup")[0];
    const winnerPopup = document.getElementsByClassName("winner-popup")[0];
    popup.className = "popup";
    winnerPopup.className = "winner-popup";
}

function toggleStartPopup() {
    const popup = document.getElementsByClassName("popup")[0];
    popup.className = "popup hidden";
    const popupDiv = document.getElementsByClassName("popup-main-div")[0];
    popupDiv.className = "popup-main-div hidden";
}

function changeCoordinateColor(id, bool) {
    const sq = document.getElementById(id +"board");
    if (bool) { sq.style.backgroundColor = "red" }
    else { sq.style.backgroundColor = "rgb(98, 169, 220)"; }
}

mainHandler.startGame();