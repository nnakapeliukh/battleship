import GameField from "./GameField";
import GameboardFactory from "./GameboardFactory";
import PlayerFactory from "./PlayerFactory";
import { useEffect, useState } from "react";
import DragShips from "./DragShips";

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
    const rawAttack = event.target.id; //raw attack is id of the cell - "enemy1,1"
    if (humanPlayer.isMyTurn()) {
      pcBoard.receiveAttack(
        humanPlayer.attack(Number(rawAttack[5]), Number(rawAttack[7]))
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

  const drag = (ev) => {
    ev.dataTransfer.setData("text", ev.target.id);
  };

  const [twoShip, setTwoship] = useState(4);
  const [threeShip, setThreeship] = useState(3);
  const [fourShip, setFourship] = useState(2);
  const [fiveShip, setFiveship] = useState(1);

  const drop = (ev) => {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    //extract info
    let row = Number(ev.target.id[0]);
    let column = Number(ev.target.id[2]);
    let size = Number(data[0]);
    let orientation = data[1] === "h" ? "horizontal" : "vertical";
    try {
      humanBoard.placeShip(row, column, size, orientation);
      switch (size) {
        case 2:
          setTwoship(twoShip - 1);
          break;
        case 3:
          setThreeship(threeShip - 1);
          break;
        case 4:
          setFourship(fourShip - 1);
          break;
        case 5:
          setFiveship(fiveShip - 1);
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);

      //change the cell that was highlited back to empty
      let cell = document.getElementsByClassName("empty-cell-highlight");
      while (cell.length > 0) {
        cell[0].className = "empty-cell";
      }
    } finally {
      //trigger rerender
    }
  };

  return (
    <div className="App">
      <GameField
        myField={humanBoard.getField()}
        enemyField={pcBoard.getField()}
        handleClick={playerAttacks}
        handleDrop={drop}
      />
      <DragShips
        handleDrag={drag}
        twoShip={twoShip}
        threeShip={threeShip}
        fourShip={fourShip}
        fiveShip={fiveShip}
      />
    </div>
  );
}

export default App;
