import GameboardFactory from "../GameboardFactory";

describe("Gameboard places ships", () => {
  it("should place a ship vertically", () => {
    const Board = GameboardFactory();
    expect(Board.placeShip(0, 0, 3, "vertical")).toEqual(true);
  });

  it("should place a ship horizontally", () => {
    const Board = GameboardFactory();
    expect(Board.placeShip(0, 0, 3, "horizontal")).toEqual(true);
  });

  it("should NOT place a ship if out of reach", () => {
    const Board = GameboardFactory();
    expect(() => Board.placeShip(9, 9, 5, "horizontal")).toThrow();
    expect(() => Board.placeShip(6, 6, 5, "vertical")).toThrow();
  });

  it("should NOT place a ship on another ship", () => {
    const Board = GameboardFactory();
    Board.placeShip(0, 0, 3, "horizontal");

    expect(() => {
      Board.placeShip(0, 1, 3, "horizontal");
    }).toThrow();
    expect(() => {
      Board.placeShip(0, 0, 3, "vertical");
    }).toThrow();
  });
});

describe("Hit miss mechanics", () => {
  it("should record a hit", () => {
    const Board = GameboardFactory();
    const attack = { row: 0, column: 0 };
    Board.receiveAttack(attack);
    expect(Board.getField()[0][0].hit).toBe(true);
  });

  it("should register destroyed ship", () => {
    const Board = GameboardFactory();
    Board.placeShip(0, 0, 2, "vertical");
    const attack = { row: 0, column: 0 };
    Board.receiveAttack(attack);
    const attack2 = { row: 1, column: 0 };
    Board.receiveAttack(attack2);
    expect(Board.getField()[0][0].ship.isSunk()).toBe(true);
  });

  it("should detect destroyed fleet (game end)", () => {
    const Board = GameboardFactory();
    Board.placeShip(0, 0, 1, "vertical");
    Board.placeShip(1, 1, 1, "horizontal");
    const attack = { row: 0, column: 0 };
    Board.receiveAttack(attack);
    const attack2 = { row: 1, column: 1 };
    Board.receiveAttack(attack2);
    expect(Board.isFleetDestroyed()).toBe(true);
  });
});
