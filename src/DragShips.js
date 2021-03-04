import "./styles/DragShips.css";

const DragShips = (props) => {
  return (
    <div>
      <div
        className="big-ship"
        id="6v"
        draggable
        onDragStart={props.handleDrag}
      ></div>
    </div>
  );
};

export default DragShips;
