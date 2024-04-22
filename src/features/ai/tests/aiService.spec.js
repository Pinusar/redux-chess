import { sampleGameState, TestGameEngine } from './testGame.ts';

test("Should find best move", () => {
    const simulator = new TestGameEngine();
    const result = simulator.findBestMove(sampleGameState)

    expect(result.move.target).toEqual('C')
    expect(result.score).toEqual(3)
});

test("Should find best move for limited depth", () => {
    const simulator = new TestGameEngine();
    const result = simulator.findBestMove(sampleGameState, true, 1)

    expect(result.move.target).toEqual('D')
    expect(result.score).toEqual(4)
});

test("Should find best move when best move is immediately available", () => {
    const simulator = new TestGameEngine();
    const state = JSON.parse(JSON.stringify(sampleGameState))
    state.rootNode.children.push({score: 20, name: 'X', children:[]})
    const result = simulator.findBestMove(state)

    expect(result.move.target).toEqual('X')
    expect(result.score).toEqual(20)
});


test("Should use alpha beta pruning", () => {
    const simulator = new TestGameEngine();
    const result = simulator.findBestMove(sampleGameState)

    expect(simulator.counter).toEqual(11)
});
