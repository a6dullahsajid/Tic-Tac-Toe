import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combinations";
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
let laffaz=0;  
export default function GameBoard({ onSelect, isActive }) {
  const [gameBoard, setGameBoard] = useState(initialGameBoard);
  let winner;
  let hasDraw;
  function handleSelectSymbol(rowIndex, colIndex) {
    setGameBoard(() => {
      const updatedBoard = gameBoard;
      updatedBoard[rowIndex][colIndex] = isActive;
      laffaz+=1;
      return updatedBoard;
    });
    if (laffaz == 9 && winner === undefined) {
      hasDraw = true;
    }
    for (const combination of WINNING_COMBINATIONS) {
      const firstSquare = gameBoard[combination[0].row][combination[0].column];
      const secondSquare = gameBoard[combination[1].row][combination[1].column];
      const thirdSquare = gameBoard[combination[2].row][combination[2].column];
      if (
        firstSquare &&
        firstSquare === secondSquare &&
        firstSquare === thirdSquare
      ) {
        winner = firstSquare;
      }
    }
    onSelect(winner,hasDraw);
  }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => {
                    if (gameBoard[rowIndex][colIndex] == null) {
                      handleSelectSymbol(rowIndex, colIndex);
                    }
                  }}
                >
                  {gameBoard[rowIndex][colIndex] == null
                    ? playerSymbol
                    : gameBoard[rowIndex][colIndex]}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
