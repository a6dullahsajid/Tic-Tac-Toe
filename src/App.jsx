import GameBoard from "./components/GameBoard";
import GameOver from "./components/GameOver";
import Player from "./components/player";
import { useState } from "react";
function App() {
  const [activePlayer, setActivePlayer] = useState("X");
  const [won, setWon] = useState(undefined);
  const [draw, setDraw] = useState(undefined);
  const [playerNames, setPlayerNames] = useState({ "X": "Player 1" , "O": "Player 2"});
  function handleChance(winner, hasDraw) {
    setDraw(hasDraw);
    if (winner != undefined) {
      setWon(playerNames[winner]);
    }
    setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X"));
  }
  function handlePlayerNameChange(symbol , name) {
    setPlayerNames(()=>{
      playerNames[symbol] = name;
      return playerNames;
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={playerNames.X}
            symbol={"X"}
            isActive={activePlayer}
            onNameChange={handlePlayerNameChange}
          />
          <Player
            initialName={playerNames.O}
            symbol={"O"}
            isActive={activePlayer}
            onNameChange={handlePlayerNameChange}
          />
        </ol>
        {(won || draw) && <GameOver winner={won} />}
        <GameBoard onSelect={handleChance} isActive={activePlayer} />
      </div>
    </main>
  );
}

export default App;
