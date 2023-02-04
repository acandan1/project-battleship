import Ship from './ship';

export default () => {

    const board = [];

    const createBoard = () => {
        const row = 10;
        const col = 10;
        for (let i = 0; i < row; i += 1) {
            for (let j = 0; j < col; j += 1) {
                board.push([i, j]);
            }
        }
    };

    const occupiedCoordinates = [];
    const shipCoordinates = [];

    const placeShip = (top, left, shipLength) => {
        if (left + shipLength <= 10) {
            for (let i = 0; i < shipLength; i += 1) {
                occupiedCoordinates.push([top, left + i]);
                shipCoordinates.push([top, left + i]);
            }
            const ship = Ship(shipLength);
        }
    };

    const allShipsSunk = () => {
        if (shipCoordinates.length === 0) {
            return true;
        }
        return false;
    };

    const receiveAttack = (top, left) => {
        for (let i = 0; i < shipCoordinates.length; i+=1) {
            if (shipCoordinates[i][0] === top && shipCoordinates[i][1] === left) {
                shipCoordinates.splice(i, 1);
            }
        }
        return allShipsSunk();
    };

    createBoard();
    return { occupiedCoordinates, placeShip, receiveAttack }
}