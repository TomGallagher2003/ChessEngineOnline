const convertToAlgebraic = (row, col) => {
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const rank = 8 - row; // Rows are reversed in chess notation (row 0 is rank 8)
    const file = files[col]; // Column to file (e.g., 0 = 'a', 1 = 'b', etc.)
    return `${file}${rank}`;
};
export default convertToAlgebraic;