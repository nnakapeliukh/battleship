const ShipFactory = (lengthIn) => {
  const length = lengthIn;
  let hullIsHit = new Array(length).fill(false);

  const hit = (positionHit) => {
    hullIsHit[positionHit] = true;
    return hullIsHit;
  };

  const isSunk = () => {
    for (let i = 0; i < length; i++) {
      if (hullIsHit[i] === false) {
        return false;
      }
    }
    return true;
  };

  return { length, hit, isSunk };
};

export default ShipFactory;
