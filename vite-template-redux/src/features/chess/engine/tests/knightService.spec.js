import { fromBoard } from '../GameState.ts';
import { getPossibleMovesForNotation, playMoveForNotation } from '../GameServiceFacade.ts';

test("Should get possible moves for white knight on G1", () => {
    const board = [
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r',],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P',],
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R',],
    ]
    const gameState = fromBoard(board)

    const result = getPossibleMovesForNotation(gameState, 'G1')

    expect(result).toEqual(['F3', 'H3']);
});

test("Should get possible moves for white knight on B1", () => {
    const board = [
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r',],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P',],
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R',],
    ]
    const gameState = fromBoard(board)

    const result = getPossibleMovesForNotation(gameState, 'B1')

    expect(result).toEqual(['A3', 'C3']);
});

test("Should get possible moves for white knight on A3", () => {
    const board = [
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r',],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P',],
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R',],
    ]
    const gameState = fromBoard(board)
    let newState = playMoveForNotation(gameState, 'B1', 'A3')
    newState = playMoveForNotation(newState, 'E7', 'E6')

    const result = getPossibleMovesForNotation(newState, 'A3')

    expect(result).toEqual(['B1', 'C4', 'B5']);
});

test("Should get possible moves for white knight on H3", () => {
    const board = [
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r',],
        ['p', 'p', 'p', 'p', '.', 'p', 'p', 'p',],
        ['.', '.', '.', '.', 'p', '.', '.', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', '.', '.', '.', 'N',],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P',],
        ['R', 'N', 'B', 'Q', 'K', 'B', '.', 'R',],
    ]
    const gameState = fromBoard(board)

    const result = getPossibleMovesForNotation(gameState, 'H3')

    expect(result).toEqual(['G1', 'F4', 'G5']);
});
