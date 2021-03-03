import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import GameboardFactory from "./GameboardFactory";
// import PlayerFactory from "./PlayerFactory";

// const player1Board = GameboardFactory();
// const player2Board = GameboardFactory();

// const player1 = PlayerFactory(false, true);
// const player2 = PlayerFactory(false, false);

// let myField = player1Board.getField();
// let PCField = player2Board.getField();

// player1Board.placeShip(0, 0, 3, "vertical");
// player1Board.receiveAttack(player2.attack());
// player1Board.receiveAttack(player2.attack());

// player2Board.placeShip(0, 0, 3, "vertical");
// player2Board.receiveAttack(player1.attack(0, 0));
// player2Board.receiveAttack(player1.attack(1, 1));

ReactDOM.render(
  <React.StrictMode>
    {/* <App
      me={player1}
      pc={player2}
      myBoard={player1Board}
      pcBoard={player2Board}
      pcField={PCField}
    /> */}
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
