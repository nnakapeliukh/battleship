import PlayerFactory from "../PlayerFactory";

describe("Tests palyers functions", () => {
  it("player changes turn", () => {
    const player = PlayerFactory(false, false);

    player.nowYourTurn();

    expect(player.isMyTurn()).toBe(true);
  });

  it("a player's turn ends after an attack", () => {
    const player = PlayerFactory(true, false);
    player.attack(null, null);

    expect(player.isMyTurn()).toBe(false);
  });

  it("records previously hit locations", () => {
    const player = PlayerFactory(true, true);

    player.attack(1, 1);
    player.attack(2, 2);
    const expected = [
      { row: 1, column: 1 },
      { row: 2, column: 2 },
    ];
    expect(player.getAllHits()).toEqual(expect.arrayContaining(expected));
  });
});

describe("human player tests", () => {
  it("human players attacks based on iput coords", () => {
    const player = PlayerFactory(false, true);

    expect(player.attack(1, 1)).toEqual({ row: 1, column: 1 });
  });
});

describe("pc player tests", () => {
  it("pc player does not hit the same cell twice", () => {
    const player = PlayerFactory(false, false);

    expect(player.attack(null, null)).not.toMatchObject(
      player.attack(null, null)
    );
  });
});
