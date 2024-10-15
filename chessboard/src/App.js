import React, { useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import apiConnection from './ApiConnection';
import parsing from "./parsing";

const { startNewGame, getMove } = apiConnection;
const { convertToAlgebraic, parseMoveToCoords } = parsing
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
             const parsedMove = parseMoveToCoords(move);

             const engineMove = await getMove(gameId, parsedMove);
             const fromSquare = convertToAlgebraic(engineMove.oldRow, engineMove.oldCol);
             const toSquare = convertToAlgebraic(engineMove.newRow, engineMove.newCol);

             game.move({
                 from: fromSquare,
                 to: toSquare,
                 promotion: 'q', // auto queen
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
            textAlign: "center",
            width: "100%",
            height: "100vh",
            backgroundImage: `url(${process.env.PUBLIC_URL + '/background.png'})`,
            backgroundSize: "cover"
        }}>
            <h1 style={{
                paddingBottom: "5px",
                color: "white",
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: "50px"
            }}>
                Play The Engine!
            </h1>

            <div>
                <Chessboard
                    boardWidth={window.innerWidth > 700 ? 530 : 285}
                    position={position}
                    onPieceDrop={onDrop}
                    isDraggablePiece={isDraggablePiece}
                />
            </div>

        </div>
    );
}

export default ChessGame;
