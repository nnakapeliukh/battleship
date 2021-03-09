import "./styles/GameField.css";

const GameField = (props) => {
  const allowDrop = (ev) => {
    ev.preventDefault();

    if (ev.target.className === "empty-cell") {
      ev.target.className = "empty-cell-highlight";
    }
  };

  const highleghtCell = (ev) => {
    console.log(ev);
    if (ev.target.className === "empty-cell-highlight") {
      ev.target.className = "empty-cell";
    }
  };

  return (
    <div>
      <div className="my-field-grid">
        {props.myField.map((cellRow, row) => {
          return cellRow.map((cell, column) => {
            if (cell.isShip && cell.hit) {
              return (
                <div
                  className="hit-ship-cell"
                  key={"hitship" + [row, column]}
                ></div>
              );
            } else if (cell.isShip) {
              return (
                <div className="ship-cell" key={"ship" + [row, column]}></div>
              );
            } else if (cell.hit) {
              return (
                <div className="hit-cell" key={"hit" + [row, column]}></div>
              );
            } else {
              return (
                <div
                  className="empty-cell"
                  id={[row, column]}
                  onDrop={props.handleDrop}
                  onDragOver={allowDrop}
                  onDragLeave={highleghtCell}
                  key={"empty" + [row, column]}
                ></div>
              );
            }
          });
        })}
      </div>
      <div className="enemy-field-grid">
        {props.enemyField.map((cellRow, row) => {
          return cellRow.map((cell, column) => {
            if (cell.isShip && cell.hit) {
              return (
                <div
                  className="hit-ship-cell"
                  key={"enemyhitship" + [row, column]}
                ></div>
              );
            } else if (cell.hit) {
              return (
                <div
                  className="hit-cell"
                  key={"enemyhit" + [row, column]}
                ></div>
              );
            } else {
              return (
                <div
                  className="empty-cell"
                  id={[row, column]}
                  onClick={props.handleClick}
                  key={"enemyempty" + [row, column]}
                ></div>
              );
            }
          });
        })}
      </div>
    </div>
  );
};

export default GameField;
