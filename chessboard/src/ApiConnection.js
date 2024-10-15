const api = 'https://54.252.28.117'
const local = 'http://localhost:8080'
const url = local;

const getMove = async (gameId, playerMove) => {
    try {
        const response = await fetch(`${url}/move?id=${gameId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(playerMove),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const engineMove = await response.json();
        console.log('Engine Move:', engineMove);
        return engineMove;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
};
const startNewGame = async () => {
    try {
        const response = await fetch(`${url}/new-game`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to start a new game');
        }

        const gameId = await response.json();
        console.log('New Game ID:', gameId);
        return gameId;
    } catch (error) {
        console.error('Error starting new game:', error);
    }
};
const exports ={startNewGame, getMove}

export default exports;