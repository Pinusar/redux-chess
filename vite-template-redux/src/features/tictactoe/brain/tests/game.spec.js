import Game from "../Game.ts";


test("Should add X after playing move", () => {
    const game = new Game();

    game.playMove(2);

    expect(game.board[2]).toBe("X");
});

test("Should switch players", () => {
    const game = new Game();

    game.playMove(0);
    game.playMove(1);
    game.playMove(2);

    expect(game.board[0]).toBe("X");
    expect(game.board[1]).toBe("O");
    expect(game.board[2]).toBe("X");
});

test("Should not allow moving to occupied cell", () => {
    const game = new Game();

    game.playMove(0);
    const executable = () => game.playMove(0);

    expect(executable).toThrowError('Cannot move to cell 0. It is occupied by X.');
});

test("Should not allow moving after game is won", () => {
    const game = new Game();

    game.playMove(0);
    game.playMove(1);
    game.playMove(4);
    game.playMove(2);
    game.playMove(8);
    const executable = () => game.playMove(3);

    expect(executable).toThrowError('Cannot play move. Game is over. Winner: X.');
});