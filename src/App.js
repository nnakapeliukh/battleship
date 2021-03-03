import GameField from "./GameField";
import GameboardFactory from "./GameboardFactory";
import PlayerFactory from "./PlayerFactory";
import { useEffect, useState } from "react";

function App(props) {
  const [humanBoard, setHumanBoard] = useState(GameboardFactory());
  const [pcBoard, setPcBoard] = useState(GameboardFactory());

  const [humanPlayer, setHumanPlayer] = useState(PlayerFactory(true, true));
  const [pcPlayer, setPcPlayer] = useState(PlayerFactory(false, false));

  useEffect(() => {
    humanBoard.placeShip(0, 0, 3, "vertical");
    // humanBoard.receiveAttack(pcPlayer.attack());
    // humanBoard.receiveAttack(pcPlayer.attack());

    pcBoard.placeShip(0, 0, 3, "vertical");
    // pcBoard.receiveAttack(humanPlayer.attack(0, 0));
    // pcBoard.receiveAttack(humanPlayer.attack(1, 1));

    setIsHumanAttacking(true);
  }, []);

  const [isHumanAttacking, setIsHumanAttacking] = useState(false);

  const playerAttacks = (event) => {
    const rawAttack = event.target.id;
    if (humanPlayer.isMyTurn()) {
      pcBoard.receiveAttack(
        humanPlayer.attack(Number(rawAttack[0]), Number(rawAttack[2]))
      );
    }
    setIsHumanAttacking(true);
  };

  useEffect(() => {
    if (isHumanAttacking) {
      setIsHumanAttacking(false);
      setCurrentPlayer("pc");
    }
  }, [isHumanAttacking]);

  const [currentPlayer, setCurrentPlayer] = useState("human");

  useEffect(() => {
    if (currentPlayer === "human" && !humanPlayer.isMyTurn()) {
      humanPlayer.nowYourTurn();
    } else if (currentPlayer === "pc" && !pcPlayer.isMyTurn()) {
      humanBoard.receiveAttack(pcPlayer.attack(null, null));
      setCurrentPlayer("human");
    }
    if (humanBoard.isFleetDestroyed() || pcBoard.isFleetDestroyed()) {
      setGameOver(true);
    }
  }, [currentPlayer]);

  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (gameOver) {
      console.log("GAME OVER");
    }
  }, [gameOver]);

  return (
    <div className="App">
      <GameField
        myField={humanBoard.getField()}
        enemyField={pcBoard.getField()}
        handleClick={playerAttacks}
      />
    </div>
  );
}

export default App;
