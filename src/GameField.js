import { useState } from "react";
import "./styles/GameField.css";

import ship2 from "./img/ship2.png";

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
                  onDragOver={highlightCell}
                  onDragLeave={cancelHighlight}
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
  );
};

export default GameField;
