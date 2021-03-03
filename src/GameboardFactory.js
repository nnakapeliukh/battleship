import ShipFactory from "./ShipFactory";

const GameboardFactory = () => {
  let field = [[]];
  let fleet = [];

  (function init() {
    for (let row = 0; row < 10; row++) {
      field.push([]);
      for (let col = 0; col < 10; col++) {
        field[row][col] = { isShip: false, hit: false };
      }
    }
  })();

  const placeShip = (row, column, size, orientation) => {
    const ship = ShipFactory(size);
    fleet.push(ship);
    if (!isPlacable(row, column, size, orientation)) {
      throw "Placement error: another ship";
    }
    if (orientation === "vertical") {
      if (row + size > 10) {
        throw "Placement error: vertical";
      }
      for (let i = 0; i < size; i++) {
        field[row + i][column].isShip = true;
        field[row + i][column].ship = ship;
        field[row + i][column].hullNum = i;
      }
      return true;
    } else if (orientation === "horizontal") {
      if (column + size > 10) {
        throw "Placement error: horizontal";
      }
      for (let i = 0; i < size; i++) {
        field[row][column + i].isShip = true;
        field[row][column + i].ship = ship;
        field[row][column + i].hullNum = i;
      }
      return true;
    } else {
      return false;
    }
  };

  const isPlacable = (row, column, size, orientation) => {
    if (orientation === "vertical") {
      for (let i = 0; i < size; i++) {
        if (field[row + i][column].isShip === true) {
          return false;
        }
      }
    }
    if (orientation === "horizontal") {
      for (let i = 0; i < size; i++) {
        if (field[row][column + i].isShip === true) {
          return false;
        }
      }
    }
    return true;
  };

  const receiveAttack = (attack) => {
    const row = attack.row;
    const column = attack.column;

    switch (field[row][column].isShip) {
      case true:
        field[row][column].hit = true;
        field[row][column].ship.hit(field[row][column].hullNum);
        return true;

      case false:
        field[row][column].hit = true;
        return true;

      default:
        return false;
    }
  };
  const isFleetDestroyed = () => {
    for (let i = 0; i < fleet.length; i++) {
      if (!fleet[i].isSunk()) {
        return false;
      }
    }
    return true;
  };
  const getField = () => {
    return field;
  };

  return { placeShip, getField, receiveAttack, isFleetDestroyed };
};

export default GameboardFactory;
