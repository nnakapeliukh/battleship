import React from "react";
import "./styles/StartScreen.css";

const StartScreen = (props) => {
  return (
    <React.Fragment>
      {props.showTitle ? (
        <div className="title-div">
          <div className="wrapper">
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

export default StartScreen;
