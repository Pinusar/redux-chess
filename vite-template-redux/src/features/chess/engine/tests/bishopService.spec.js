import { fromBoard } from '../GameState.ts';
import { getPossibleMovesForNotation, playMoveForNotation } from '../GameServiceFacade.ts';
import { Color } from '../Color.ts';

test("Should get possible moves for white bishop on F1", () => {
    const board = [
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r',],
        ['p', 'p', 'p', 'p', '.', 'p', 'p', 'p',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', 'p', '.', '.', '.',],
        ['.', '.', '.', '.', 'P', '.', '.', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['P', 'P', 'P', 'P', '.', 'P', 'P', 'P',],
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R',],
    ]
    const gameState = fromBoard(board)

    const result = getPossibleMovesForNotation(gameState, 'F1')

    expect(result).toEqual(['E2', 'D3', 'C4', 'B5', 'A6']);
});

test("Should get possible moves for white bishop when has opposing piece on diagonal", () => {
    const board = [
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r',],
        ['p', '.', 'p', 'p', '.', 'p', 'p', 'p',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', 'p', '.', '.', 'p', '.', '.', '.',],
        ['.', '.', '.', '.', 'P', '.', '.', '.',],
        ['P', '.', '.', '.', '.', '.', '.', '.',],
        ['.', 'P', 'P', 'P', '.', 'P', 'P', 'P',],
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R',],
    ]
    const gameState = fromBoard(board)

    const result = getPossibleMovesForNotation(gameState, 'F1')

    expect(result).toEqual(['E2', 'D3', 'C4', 'B5']);
});

test("Should get possible moves for black bishop when has opposing piece on diagonal", () => {
    const board = [
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r',],
        ['p', 'p', 'p', '.', 'p', 'p', 'p', 'p',],
        ['.', '.', '.', 'p', '.', '.', '.', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', '.', '.', 'P', '.',],
        ['P', '.', '.', '.', '.', '.', '.', '.',],
        ['.', 'P', 'P', 'P', 'p', 'P', '.', 'P',],
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R',],
    ]
    const gameState = fromBoard(board, Color.BLACK)

    const result = getPossibleMovesForNotation(gameState, 'C8')

    expect(result).toEqual(['D7', 'E6', 'F5', 'G4']);
});