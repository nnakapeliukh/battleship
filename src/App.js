import GameField from "./GameField";
import GameboardFactory from "./GameboardFactory";
import PlayerFactory from "./PlayerFactory";
import { useEffect, useLayoutEffect, useState } from "react";
import DragShips from "./DragShips";
import StartScreen from "./StartScreen";
import EndScreen from "./EndScreen.js";
import "./styles/App.css";
import GitFooter from "./GitFooter";

function App(props) {
  const [humanBoard, setHumanBoard] = useState(GameboardFactory());
  const [pcBoard, setPcBoard] = useState(GameboardFactory());

  const [humanPlayer, setHumanPlayer] = useState(PlayerFactory(true, true));
  const [pcPlayer, setPcPlayer] = useState(PlayerFactory(false, false));

  const [isHumanAttacking, setIsHumanAttacking] = useState(false);
  const [showTitle, setShowTitle] = useState(true);

  const startGame = () => {
    setHumanBoard(GameboardFactory());
    setPcBoard(GameboardFactory());
    setHumanPlayer(PlayerFactory(true, true));
    setPcPlayer(PlayerFactory(false, false));
    setShowPlaceRandomBut(true);
    setShowShips(true);
    setShowTitle(false);
    setGameOver(false);
    setHumanWon(false);
    setIsFleetPlaced(false);
    setTwoship(4);
    setThreeship(3);
    setFourship(2);
    setFiveship(1);
  };

  useLayoutEffect(() => {
    pcPlayer.placeShips(pcBoard.placeShip);
  }, [pcPlayer]);

  const playerAttacks = (event) => {
    const rawAttack = event.target.id; //raw attack is id of the cell - "enemy1,1"
    let row = Number(rawAttack[5]);
    let column = Number(rawAttack[7]);
    if (humanPlayer.isMyTurn()) {
      pcBoard.receiveAttack(humanPlayer.attack(row, column));
      setIsHumanAttacking(true);
    }
  };

  //next turn
  useEffect(() => {
    if (isHumanAttacking) {
      setIsHumanAttacking(false);
      setCurrentPlayer("pc");
    }
  }, [isHumanAttacking]);

  const [currentPlayer, setCurrentPlayer] = useState("human");
  const [gameOver, setGameOver] = useState(false);
  const [humanWon, setHumanWon] = useState(false);

  useEffect(() => {
    if (currentPlayer === "human" && !humanPlayer.isMyTurn()) {
      humanPlayer.nowYourTurn();
    } else if (currentPlayer === "pc" && !pcPlayer.isMyTurn()) {
      humanBoard.receiveAttack(pcPlayer.attack(null, null));
      setCurrentPlayer("human");
    }
    if (
      (humanBoard.isFleetDestroyed() || pcBoard.isFleetDestroyed()) &&
      isFleetPlaced
    ) {
      setGameOver(true);
      if (pcBoard.isFleetDestroyed()) {
        setHumanWon(true);

        console.log("you won");
      }
    }
  }, [currentPlayer]);

  const drag = (ev) => {
    ev.dataTransfer.setData("text", ev.target.id);
  };

  const [twoShip, setTwoship] = useState(4);
  const [threeShip, setThreeship] = useState(3);
  const [fourShip, setFourship] = useState(2);
  const [fiveShip, setFiveship] = useState(1);
  const [showPlaceRandomBut, setShowPlaceRandomBut] = useState(true);
  const [showShips, setShowShips] = useState(false);
  const [isFleetPlaced, setIsFleetPlaced] = useState(false);

  const drop = (ev) => {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    //extract info
    let row = Number(ev.target.id[0]);
    let column = Number(ev.target.id[2]);
    let size = Number(data[0]);
    let orientation = data[1] === "h" ? "horizontal" : "vertical";

    if (humanBoard.placeShip(row, column, size, orientation)) {
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
      setShowPlaceRandomBut(false);
    } else {
      //change the cell that was highlited back to empty
      let cell = document.getElementsByClassName("empty-cell-highlight");
      while (cell.length > 0) {
        cell[0].className = "empty-cell";
      }
    }
  };

  useEffect(() => {
    if (!twoShip && !threeShip && !fourShip && !fiveShip) {
      setIsFleetPlaced(true);
    }
  }, [twoShip, threeShip, fourShip, fiveShip]);

  return (
    <div className="App">
      <StartScreen showTitle={showTitle} startGame={startGame} />
      <h1 className="title">Battleship</h1>
      <GameField
        myField={humanBoard.getField()}
        enemyField={pcBoard.getField()}
        handleClick={playerAttacks}
        handleDrop={drop}
        isFleetPlaced={isFleetPlaced}
      />
      <DragShips
        handleDrag={drag}
        showShips={showShips}
        twoShip={twoShip}
        threeShip={threeShip}
        fourShip={fourShip}
        fiveShip={fiveShip}
        showPlaceRandomBut={showPlaceRandomBut}
        handlePlaceRandom={() => {
          humanPlayer.placeShips(humanBoard.placeShip);
          setShowPlaceRandomBut(false);
          setShowShips(false);
          setIsFleetPlaced(true);
        }}
      />
      <EndScreen
        gameOver={gameOver}
        humanWon={humanWon}
        startGame={startGame}
      />
      <GitFooter />
    </div>
  );
}

export default App;
