import React, { useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import apiConnection from './ApiConnection';
import convertToAlgebraic from "./parsing";

const { startNewGame, getMove } = apiConnection;
const gameId = await startNewGame();

function ChessGame() {
    const [game] = useState(new Chess());
    const [position, setPosition] = useState(game.fen());


     const onDrop = async (sourceSquare, targetSquare) => {
         try{
             const move = game.move({
                 from: sourceSquare,
                 to: targetSquare,
                 promotion: 'q',
             });

             if (move) {
                 setPosition(game.fen());
             }
             const engineMove = await getMove(gameId);
             const fromSquare = convertToAlgebraic(engineMove.oldRow, engineMove.oldCol);
             const toSquare = convertToAlgebraic(engineMove.newRow, engineMove.newCol);

             game.move({
                 from: fromSquare,
                 to: toSquare,
                 promotion: 'q', // Handle promotion if needed
             });
             setPosition(game.fen());
         } catch(error){
             console.log(error);
         }
    };

    const isDraggablePiece = (piece) => {
        // Check if it's a white piece, allow dragging; otherwise prevent dragging
        return piece.piece.startsWith("w");


    };

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center"
        }}>
            <h1>Chess Game</h1>
            <Chessboard
                boardWidth={400}
                position={position}
                onPieceDrop={onDrop}
                isDraggablePiece={isDraggablePiece}
            />
        </div>
    );
}

export default ChessGame;
