import { fromBoard } from '../GameState.ts';
import { getPossibleMovesForNotation, playMoveForNotation } from '../GameServiceFacade.ts';
import { Color } from '../Color.ts';

test("Should get possible moves for white rook on D2", () => {
    const board = [
        ['r', 'n', 'b', 'q', 'k', 'b', '.', 'r',],
        ['p', 'p', 'p', '.', 'p', 'p', 'p', 'p',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', 'p', '.', '.', '.', '.',],
        ['.', 'P', '.', '.', '.', 'n', '.', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['P', '.', 'P', 'Q', 'P', 'P', 'P', 'P',],
        ['R', 'N', 'B', '.', 'K', 'B', 'N', 'R',],
    ]
    const gameState = fromBoard(board)

    const result = getPossibleMovesForNotation(gameState, 'D2')

    expect(result.sort()).toEqual(['D1', 'C3', 'D3', 'D4', 'D5', 'E3', 'F4'].sort());
});
