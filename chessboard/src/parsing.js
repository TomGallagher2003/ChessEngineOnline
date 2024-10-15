const convertToAlgebraic = (row, col) => {
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const rank = 8 - row;
    const file = files[col];
    return `${file}${rank}`;
};
function algebraicToBoardCoords(square) {
    const file = square.charCodeAt(0) - 'a'.charCodeAt(0);
    const rank = parseInt(square[1], 10);

    const row = 8 - rank;
    const col = file;

    return { row, col };
}


function parseMoveToCoords(move) {
    const fromCoords = algebraicToBoardCoords(move.from);
    const toCoords = algebraicToBoardCoords(move.to);

    return {
        oldRow: fromCoords.row,
        oldCol: fromCoords.col,
        newRow: toCoords.row,
        newCol: toCoords.col,
        promotion: move.promotion, // Handle promotion if applicable
    };
}
const toExport = {convertToAlgebraic, parseMoveToCoords}

export default toExport;