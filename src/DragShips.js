import "./styles/DragShips.css";
import ship2 from "./img/ship2.png";
import ship3 from "./img/ship3.png";
import ship4 from "./img/ship4.png";
import ship5 from "./img/ship5.png";

const DragShips = (props) => {
  return (
    <div>
      {props.twoShip ? (
        <div draggable onDragStart={props.handleDrag}>
          <img className="i2-ship" id="2h" src={ship2} alt="small ship" />
        </div>
      ) : null}
      {props.threeShip ? (
        <div draggable onDragStart={props.handleDrag}>
          <img className="i3-ship" id="3h" src={ship3} alt="small ship" />
        </div>
      ) : null}
      {props.fourShip ? (
        <div draggable onDragStart={props.handleDrag}>
          <img className="i4-ship" id="4h" src={ship4} alt="small ship" />
        </div>
      ) : null}
      {props.fiveShip ? (
        <div draggable onDragStart={props.handleDrag}>
          <img className="i5-ship" id="5h" src={ship5} alt="small ship" />
        </div>
      ) : null}
    </div>
  );
};

export default DragShips;
