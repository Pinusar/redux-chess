import Game from "../Game.ts";
import { TicTacToeEngine } from '../ticTacToeEngine.ts';


test("Should add X after playing move", () => {
    const game = new Game();
    const engine = new TicTacToeEngine()

    let state = engine.playMove({board: game.board}, {target: 3})
    state = engine.playMove(state, {target: 0})
    state = engine.playMove(state, {target: 4})

    const result = engine.findBestMove(state, false, 9)

    expect(result.move).toBe(5);
});

test("Should show 0 as best score", () => {
    const game = new Game();
    const engine = new TicTacToeEngine()

    let state =
    engine.playMove({board: game.board}, {target: 3})
    state = engine.playMove(state, {target: 0})
    state = engine.playMove(state, {target: 4})
    state = engine.playMove(state, {target: 5})
    state = engine.playMove(state, {target: 1})
    state = engine.playMove(state, {target: 7})
    state = engine.playMove(state, {target: 2})
    state = engine.playMove(state, {target: 6})

    const result = engine.findBestMove(state, true, 9)

    expect(result.move.target).toBe(8);
    expect(result.score).toBe(0);
});

test("Should prevent loss", () => {
    const game = new Game();
    const engine = new TicTacToeEngine()

    let state =
    engine.playMove({board: game.board}, {target: 3})
    state = engine.playMove(state, {target: 4})
    state = engine.playMove(state, {target: 0})
    state = engine.playMove(state, {target: 6})
    state = engine.playMove(state, {target: 2})

    const result = engine.findBestMove(state, false, 9)

    expect(result.move.target).toBe(1);
    expect(result.score).toBe(0);
});
