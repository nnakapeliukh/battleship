import "./styles/DragShips.css";
import ship2 from "./img/ship2.png";
import ship3 from "./img/ship3.png";
import ship4 from "./img/ship4.png";
import ship5 from "./img/ship5.png";

const DragShips = (props) => {
  const rotateShip = (ev) => {
    let shipInfo = ev.target.id;
    if (shipInfo[1] === "v") {
      ev.target.id = `${shipInfo[0]}h`;
      ev.target.classList.remove("ship-vertical");
    } else {
      ev.target.id = `${shipInfo[0]}v`;
      ev.target.classList.add("ship-vertical");
    }
  };

  return (
    <div className="drag-container">
      {props.showPlaceRandomBut ? (
        <button className="random-button" onClick={props.handlePlaceRandom}>
          Place random
        </button>
      ) : null}

      {props.twoShip && props.showShips ? (
        <div
          draggable
          onDragStart={props.handleDrag}
          className="ship-container"
        >
          <img
            className="i2-ship"
            id="2h"
            src={ship2}
            alt="small ship"
            onClick={rotateShip}
          />
        </div>
      ) : null}
      {props.threeShip && props.showShips ? (
        <div
          draggable
          onDragStart={props.handleDrag}
          className="ship-container"
        >
          <img
            className="i3-ship"
            id="3h"
            src={ship3}
            alt="small ship"
            onClick={rotateShip}
          />
        </div>
      ) : null}
      {props.fourShip && props.showShips ? (
        <div
          draggable
          onDragStart={props.handleDrag}
          className="ship-container"
        >
          <img
            className="i4-ship"
            id="4h"
            src={ship4}
            alt="small ship"
            onClick={rotateShip}
          />
        </div>
      ) : null}
      {props.fiveShip && props.showShips ? (
        <div
          draggable
          onDragStart={props.handleDrag}
          className="ship-container"
        >
          <img
            className="i5-ship"
            id="5h"
            src={ship5}
            alt="small ship"
            onClick={rotateShip}
          />
        </div>
      ) : null}
    </div>
  );
};

export default DragShips;
