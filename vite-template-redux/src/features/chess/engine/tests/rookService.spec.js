import { fromBoard } from '../GameState.ts';
import { getPossibleMovesForNotation, playMoveForNotation } from '../GameServiceFacade.ts';
import { Color } from '../Color.ts';

test("Should get possible moves for white rook on G5", () => {
    const board = [
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r',],
        ['p', 'p', 'p', 'p', '.', 'p', 'p', 'p',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', 'p', '.', 'R', '.',],
        ['.', '.', '.', '.', 'P', '.', '.', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['P', 'P', 'P', 'P', '.', 'P', 'P', 'P',],
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', '.',],
    ]
    const gameState = fromBoard(board)

    const result = getPossibleMovesForNotation(gameState, 'G5')

    expect(result.sort()).toEqual(['G6', 'G7', 'F5', 'E5', 'H5', 'G4', 'G3'].sort());
});

test("Should get possible moves for white rook on H8", () => {
    const board = [
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r',],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', '.', '.', '.', 'p',],
        ['.', '.', '.', '.', '.', '.', '.', 'P',],
        ['.', '.', '.', '.', '.', '.', '.', 'R',],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', '.',],
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', '.',],
    ]
    const gameState = fromBoard(board, Color.BLACK)

    const result = getPossibleMovesForNotation(gameState, 'H8')

    expect(result.sort()).toEqual(['H7', 'H6'].sort());
});
