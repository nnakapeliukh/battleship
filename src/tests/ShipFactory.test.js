import ShipFactory from "../ShipFactory";

describe("Ship factory function tests", () => {
  it("should create a ship with defined length", () => {
    const newShip = ShipFactory(4);
    expect(newShip.length).toBe(4);
  });
});

describe("Ship damage test", () => {
  it("should mark hit hull spaces", () => {
    const newShip = ShipFactory(4);

    expect(newShip.hit(2)).toStrictEqual([false, false, true, false]);
    expect(newShip.hit(1)).toStrictEqual([false, true, true, false]);
  });
});

describe("Is ships still alive", () => {
  const newShip = ShipFactory(2);

  it("should not be sunk when new", () => {
    expect(newShip.isSunk()).toBe(false);
  });

  it("should not be sunk whith partial damage", () => {
    newShip.hit(0);
    expect(newShip.isSunk()).toBe(false);
  });

  it("should be sunk when all damaged", () => {
    newShip.hit(1);

    expect(newShip.isSunk()).toBe(true);
  });
});
