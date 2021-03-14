import { useState } from "react";
import "./styles/GameField.css";

import ship2 from "./img/ship2.png";
import ship3 from "./img/ship3.png";
import ship4 from "./img/ship4.png";
import ship5 from "./img/ship5.png";

const GameField = (props) => {
  const [cellsToHighlight, setCellsToHighlight] = useState([]);

  const calcCellsToHighlight = (row, column, size, orient) => {
    let cellsArray = [];
    if (orient === "h") {
      for (let i = 0; i < size; i++) {
        if (column + i < 10) {
          cellsArray.push({
            row: row,
            column: column + i,
          });
        }
      }
    } else if (orient === "v") {
      for (let i = 0; i < size; i++) {
        if (row + i < 10) {
          cellsArray.push({
            row: row + i,
            column: column,
          });
        }
      }
    }
    return cellsArray;
  };

  const highlightCell = (ev) => {
    ev.preventDefault();

    if (ev.target.className === "empty-cell") {
      ev.target.className = "empty-cell-highlight";
      let row = Number(ev.target.id[0]);
      let column = Number(ev.target.id[2]);
      let shipData = ev.dataTransfer.getData("text");
      let size = Number(shipData[0]);
      let orient = shipData[1];
      let cellsArray = calcCellsToHighlight(row, column, size, orient);
      for (const item of cellsArray) {
        let cell = document.getElementById(`${item.row},${item.column}`);
        if (cell) {
          cell.className = "empty-cell-highlight";
        }
      }
    }
  };

  const cancelHighlight = (ev) => {
    //
    let cell = document.getElementsByClassName("empty-cell-highlight");
    while (cell.length > 0) {
      cell[0].className = "empty-cell";
    }
  };

  const placeShipImage = (cell, row, column) => {
    let length = cell.ship.length;
    let orient = cell.ship.orient;
    let imgId = length + orient[0] + "onboard";
    let shipImage;
    switch (length) {
      case 2:
        orient === "horizontal"
          ? (shipImage = (
              <img
                className="placed-ship ship-size2 "
                src={ship2}
                draggable={false}
                alt="small ship"
              />
            ))
          : (shipImage = (
              <img
                className="placed-vertical placed-ship ship-size2 "
                src={ship2}
                alt="small ship"
                draggable={false}
              />
            ));

        break;
      case 3:
        orient === "horizontal"
          ? (shipImage = (
              <img
                className="placed-ship ship-size3 "
                src={ship3}
                draggable={false}
                alt="small ship"
              />
            ))
          : (shipImage = (
              <img
                className="placed-vertical placed-ship ship-size3 "
                src={ship3}
                alt="small ship"
                draggable={false}
              />
            ));

        break;
      case 4:
        orient === "horizontal"
          ? (shipImage = (
              <img
                className="placed-ship ship-size4 "
                src={ship4}
                draggable={false}
                alt="small ship"
              />
            ))
          : (shipImage = (
              <img
                className="placed-vertical placed-ship ship-size4 "
                src={ship4}
                alt="small ship"
                draggable={false}
              />
            ));

        break;
      case 5:
        orient === "horizontal"
          ? (shipImage = (
              <img
                className="placed-ship ship-size5 "
                src={ship5}
                draggable={false}
                alt="small ship"
              />
            ))
          : (shipImage = (
              <img
                className="placed-vertical placed-ship ship-size5 "
                src={ship5}
                alt="small ship"
                draggable={false}
              />
            ));

        break;

      default:
        shipImage = null;
        break;
    }
    return shipImage;
  };

  return (
    <div className="field-grids">
      <div className="grid-wrapper">
        <div className="my-field-grid">
          {props.myField.map((cellRow, row) => {
            return cellRow.map((cell, column) => {
              if (cell.isShip && cell.hit) {
                return (
                  <div
                    className="hit-ship-cell"
                    key={"hitship" + [row, column]}
                  >
                    {cell.hullNum === 0
                      ? placeShipImage(cell, row, column)
                      : null}
                  </div>
                );
              } else if (cell.isShip && cell.hullNum === 0) {
                return (
                  <div className="ship-cell" key={"ship" + [row, column]}>
                    {placeShipImage(cell, row, column)}
                  </div>
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
                    onDragOver={highlightCell}
                    onDragLeave={cancelHighlight}
                    key={"empty" + [row, column]}
                  ></div>
                );
              }
            });
          })}
        </div>
      </div>
      {props.isFleetPlaced ? (
        <div className="grid-wrapper">
          <div className="enemy-field-grid">
            {props.enemyField.map((cellRow, row) => {
              return cellRow.map((cell, column) => {
                if (cell.isShip && cell.hit && cell.ship.isSunk()) {
                  return (
                    <div
                      className="hit-ship-cell"
                      key={"hitship" + [row, column]}
                    >
                      {cell.hullNum === 0
                        ? placeShipImage(cell, row, column)
                        : null}
                    </div>
                  );
                } else if (cell.isShip && cell.hit) {
                  return (
                    <div
                      className="hit-ship-cell"
                      key={"hitship" + [row, column]}
                    ></div>
                  );
                } else if (cell.isShip && cell.hullNum === 0) {
                  return (
                    <div
                      className="enemy-empty-cell"
                      id={"enemy" + [row, column]}
                      onClick={props.handleClick}
                      key={"enemyempty" + [row, column]}
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
                      className="enemy-empty-cell"
                      id={"enemy" + [row, column]}
                      onClick={props.handleClick}
                      key={"enemyempty" + [row, column]}
                    ></div>
                  );
                }
              });
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default GameField;
