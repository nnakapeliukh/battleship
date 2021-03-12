const PlayerFactory = (isTurn, isHumanIn) => {
  let myTurn = isTurn;
  const isHuman = isHumanIn;
  let alreadyAttacked = [];

  const isMyTurn = () => {
    return myTurn;
  };

  const endTurn = () => {
    myTurn = false;
  };
  const nowYourTurn = () => {
    myTurn = true;
  };

  const attack = (rowIn, columnIn) => {
    let attackToBe;
    endTurn();
    if (isHuman === false) {
      let row, column;
      let tries = 0;
      do {
        row = Math.floor(Math.random() * 10);
        column = Math.floor(Math.random() * 10);
        tries++;
      } while (!isAttackLegal(row, column) && tries < 120);

      attackToBe = { row: row, column: column };
    } else if (isHuman === true) {
      attackToBe = { row: rowIn, column: columnIn };
    }
    alreadyAttacked.push(attackToBe);
    return attackToBe;
  };
  const isAttackLegal = (row, column) => {
    for (let i = 0; i < alreadyAttacked.length; i++) {
      if (
        row === alreadyAttacked[i].row &&
        column === alreadyAttacked[i].column
      ) {
        return false;
      }
    }
    return true;
  };

  const getAllHits = () => {
    return alreadyAttacked;
  };

  const placeShips = (placeHandler) => {
    const fleet = [5, 4, 4, 3, 3, 3, 2, 2, 2, 2]; //size of each ship
    let row, column, orient;

    for (const size of fleet) {
      do {
        row = Math.floor(Math.random() * 10);
        column = Math.floor(Math.random() * 10);
        orient = Math.round(Math.random());
        orient ? (orient = "vertical") : (orient = "horizontal");
      } while (!placeHandler(row, column, size, orient));
    }
  };

  return { nowYourTurn, isMyTurn, attack, getAllHits, placeShips };
};

export default PlayerFactory;
