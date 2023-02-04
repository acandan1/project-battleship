export default (length) => {
    let hits = 0;
    let sunk = false;

    const hit = () => {
        hits += 1;
    };

    const isSunk = () => {
        if (length === hits) { sunk = true ; }
        return sunk;
    };

    return { hit, isSunk };
};