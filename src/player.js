import Gameboard from './gameboard';
import ship from './ship';

export default () => {
    const gameboard = Gameboard();
    const attackArray = [];
    const shipArray = [];
    for (let i = 0; i < 10; i+=1) {
        for (let j = 0; j < 10; j+=1) {
            attackArray.push([i, j]);
            shipArray.push([i, j]);
        }
    }

    const attackRandomCoordinate = () => {
        const random = Math.floor(Math.random() * attackArray.length);
        const targetCoordinate = attackArray.splice(random, 1)[0];
        return targetCoordinate;
    };

    const checkAvailableSquares = (random, length) => {
        const {occupiedCoordinates} = gameboard;
        for (let i=0; i<length; i+=1) {
            for (let j=0; j<occupiedCoordinates.length; j+=1) {
                if (occupiedCoordinates[j][0] === shipArray[random][0] && occupiedCoordinates[j][1] === shipArray[random][1]+i) {
                    return true;
                }
            }
        }
        return false;
    }

    const placeShips = () => {
        const lengths = [5, 4, 3, 3, 2];
        for (let i = 0; i < 5; i+=1) {
            let random = Math.floor(Math.random() * shipArray.length);
            while (shipArray[random][1] + lengths[i] > 10 || checkAvailableSquares(random, lengths[i])) {
                random = Math.floor(Math.random() * shipArray.length);
            }
            const coord = shipArray.splice(random, lengths[i])[0];
            gameboard.placeShip(coord[0], coord[1], lengths[i]);
        }
    };

    return { gameboard, attackRandomCoordinate, placeShips }
};