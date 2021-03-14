import React, { useEffect, useState } from "react";
import "./styles/StartScreen.css";

const EndScreen = (props) => {
  return (
    <React.Fragment>
      {props.gameOver ? (
        <div className="title-div">
          <div className="end-wrapper">
            {props.humanWon ? <h1>Victorious</h1> : <h1>Destroyed</h1>}
            <div className="wave"></div>
          </div>

          <button className="start-button" onClick={props.startGame}>
            Start Game
          </button>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default EndScreen;
