import { fromBoard, newGameState } from '../GameState.ts';
import {
    getPieceForNotation,
    getPossibleMovesForNotation,
    playBatchMoves,
    playMoveForNotation,
} from '../GameServiceFacade.ts';
import { PieceType } from '../PieceType.ts';
import { Color } from '../Color.ts';

test("Should get possible moves for white king on E2", () => {
    const board = [
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r',],
        ['p', 'p', 'p', '.', 'p', 'p', 'p', 'p',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', 'P', '.', '.', '.',],
        ['.', '.', '.', 'p', '.', '.', '.', '.',],
        ['P', 'P', 'P', 'P', 'K', 'P', 'P', 'P',],
        ['R', 'N', 'B', 'Q', '.', 'B', 'N', 'R',],
    ]
    const gameState = fromBoard(board)

    const result = getPossibleMovesForNotation(gameState, 'E2')

    expect(result.sort()).toEqual(['E1', 'E3', 'F3'].sort());
});

test("King should not be able to move into check", () => {
    const board = [
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r',],
        ['p', 'p', 'p', '.', 'p', 'p', 'p', 'p',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', 'b', '.', 'P', '.', '.', '.',],
        ['.', '.', '.', '.', '.', 'P', '.', '.',],
        ['P', 'P', 'P', 'P', '.', '.', 'P', 'P',],
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R',],
    ]
    const gameState = fromBoard(board)

    const result = getPossibleMovesForNotation(gameState, 'E1')

    expect(result.sort()).toEqual(['F2'].sort());
});

test("Should be possible to castle kingside", () => {
    const board = [
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r',],
        ['p', 'p', 'p', '.', 'p', 'p', 'p', 'p',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', '.', 'N', 'P', '.',],
        ['P', 'P', 'P', 'P', 'P', 'P', 'B', 'P',],
        ['R', 'N', 'B', 'Q', 'K', '.', '.', 'R',],
    ]
    const gameState = fromBoard(board)

    const result = getPossibleMovesForNotation(gameState, 'E1')

    expect(result.sort()).toEqual(['F1', 'G1'].sort());
});

test("Should be possible to castle kingside for black king", () => {
    const board = [
        ['r', 'n', 'b', 'q', 'k', '.', '.', 'r',],
        ['p', 'p', 'p', 'p', 'p', 'p', 'b', 'p',],
        ['.', '.', '.', '.', '.', 'n', 'p', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', '.', 'N', 'P', '.',],
        ['P', 'P', 'P', 'P', 'P', 'P', 'B', 'P',],
        ['R', 'N', 'B', 'Q', 'K', '.', '.', 'R',],
    ]
    const gameState = fromBoard(board, Color.BLACK)

    const result = getPossibleMovesForNotation(gameState, 'E8')

    expect(result.sort()).toEqual(['F8', 'G8'].sort());
});


test("Should be possible to castle queenside for black", () => {
    const board = [
        ['r', '.', '.', '.', 'k', 'b', 'n', 'r',],
        ['p', 'b', 'p', 'q', 'p', 'p', 'p', 'p',],
        ['.', 'p', 'n', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', '.', 'N', 'P', '.',],
        ['P', 'P', 'P', 'P', 'P', 'P', 'B', 'P',],
        ['R', 'N', 'B', 'Q', 'K', '.', '.', 'R',],
    ]
    const gameState = fromBoard(board, Color.BLACK)

    const result = getPossibleMovesForNotation(gameState, 'E8')

    expect(result.sort()).toEqual(['D8', 'C8'].sort());
});

test("Should be possible to castle queenside", () => {
    const board = [
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r',],
        ['p', 'p', 'p', '.', 'p', 'p', 'p', 'p',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', 'P', 'N', 'P', '.', 'N', 'P', '.',],
        ['P', 'B', 'P', 'Q', 'P', 'P', '.', 'P',],
        ['R', '.', '.', '.', 'K', 'B', '.', 'R',],
    ]
    const gameState = fromBoard(board)

    const result = getPossibleMovesForNotation(gameState, 'E1')

    expect(result.sort()).toEqual(['D1', 'C1'].sort());
});

test("Should not be able to castle queenside if queen in the way", () => {
    const board = [
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r',],
        ['p', 'p', 'p', '.', 'p', 'p', 'p', 'p',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', 'P', 'N', 'P', '.', 'N', 'P', '.',],
        ['P', 'B', 'P', '.', 'P', 'P', '.', 'P',],
        ['R', '.', '.', 'Q', 'K', 'B', '.', 'R',],
    ]
    const gameState = fromBoard(board)

    const result = getPossibleMovesForNotation(gameState, 'E1')

    expect(result.sort()).toEqual(['D2'].sort());
});
test("Should not be able to castle queenside if bishop in the way", () => {
    const board = [
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r',],
        ['p', 'p', 'p', '.', 'p', 'p', 'p', 'p',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', 'P', 'N', 'P', '.', 'N', 'P', '.',],
        ['P', '.', 'P', 'Q', 'P', 'P', '.', 'P',],
        ['R', '.', 'B', '.', 'K', 'B', '.', 'R',],
    ]
    const gameState = fromBoard(board)

    const result = getPossibleMovesForNotation(gameState, 'E1')

    expect(result.sort()).toEqual(['D1'].sort());
});
test("Should not be able to castle queenside if knight in the way", () => {
    const board = [
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r',],
        ['p', 'p', 'p', '.', 'p', 'p', 'p', 'p',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', 'P', '.', 'P', '.', 'N', 'P', '.',],
        ['P', 'B', 'P', 'Q', 'P', 'P', '.', 'P',],
        ['R', 'N', '.', '.', 'K', 'B', '.', 'R',],
    ]
    const gameState = fromBoard(board)

    const result = getPossibleMovesForNotation(gameState, 'E1')

    expect(result.sort()).toEqual(['D1'].sort());
});

test("Both king and rook should move when castling kingside", () => {
    const board = [
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r',],
        ['p', 'p', 'p', '.', 'p', 'p', 'p', 'p',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', '.', 'N', 'P', '.',],
        ['P', 'P', 'P', 'P', 'P', 'P', 'B', 'P',],
        ['R', 'N', 'B', 'Q', 'K', '.', '.', 'R',],
    ]
    const gameState = fromBoard(board)

    const result = playMoveForNotation(gameState, "E1", "G1")

    expect(getPieceForNotation(result.board, "G1").type).toEqual(PieceType.KING);
    expect(getPieceForNotation(result.board, "F1").type).toEqual(PieceType.ROOK);
    expect(getPieceForNotation(result.board, "E1").type).toEqual(PieceType.EMPTY);
    expect(getPieceForNotation(result.board, "H1").type).toEqual(PieceType.EMPTY);
});

test("Both king and rook should move when castling quuenside", () => {
    const board = [
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r',],
        ['p', 'p', 'p', '.', 'p', 'p', 'p', 'p',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', 'P', 'N', 'P', '.', 'N', 'P', '.',],
        ['P', 'B', 'P', 'Q', 'P', 'P', '.', 'P',],
        ['R', '.', '.', '.', 'K', 'B', '.', 'R',],
    ]
    const gameState = fromBoard(board)

    const result = playMoveForNotation(gameState, "E1", "C1")

    expect(getPieceForNotation(result.board, "C1").type).toEqual(PieceType.KING);
    expect(getPieceForNotation(result.board, "D1").type).toEqual(PieceType.ROOK);
    expect(getPieceForNotation(result.board, "E1").type).toEqual(PieceType.EMPTY);
    expect(getPieceForNotation(result.board, "A1").type).toEqual(PieceType.EMPTY);
});

test("Both king and rook should move when castling kingside for black", () => {
    const board = [
        ['r', 'n', 'b', 'q', 'k', '.', '.', 'r',],
        ['p', 'p', 'p', 'p', 'p', 'p', 'b', 'p',],
        ['.', '.', '.', '.', '.', 'n', 'p', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', '.', 'N', 'P', '.',],
        ['P', 'P', 'P', 'P', 'P', 'P', 'B', 'P',],
        ['R', 'N', 'B', 'Q', 'K', '.', '.', 'R',],
    ]
    const gameState = fromBoard(board, Color.BLACK)

    const result = playMoveForNotation(gameState, 'E8', 'G8')


    expect(getPieceForNotation(result.board, "G8").type).toEqual(PieceType.KING);
    expect(getPieceForNotation(result.board, "F8").type).toEqual(PieceType.ROOK);
    expect(getPieceForNotation(result.board, "E8").type).toEqual(PieceType.EMPTY);
    expect(getPieceForNotation(result.board, "H8").type).toEqual(PieceType.EMPTY);
});


test("Both king and rook should move when castling kingside for black", () => {
    const board = [
        ['r', '.', '.', '.', 'k', 'b', 'n', 'r',],
        ['p', 'b', 'p', 'q', 'p', 'p', 'p', 'p',],
        ['.', 'p', 'n', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', '.', 'N', 'P', '.',],
        ['P', 'P', 'P', 'P', 'P', 'P', 'B', 'P',],
        ['R', 'N', 'B', 'Q', 'K', '.', '.', 'R',],
    ]
    const gameState = fromBoard(board, Color.BLACK)

    const result = playMoveForNotation(gameState, 'E8', 'C8')

    expect(getPieceForNotation(result.board, "C8").type).toEqual(PieceType.KING);
    expect(getPieceForNotation(result.board, "D8").type).toEqual(PieceType.ROOK);
    expect(getPieceForNotation(result.board, "E8").type).toEqual(PieceType.EMPTY);
    expect(getPieceForNotation(result.board, "A8").type).toEqual(PieceType.EMPTY);
});

test("Should not be able to castle if king has moved", () => {
    const gameState = newGameState()
    const moves = [
        { from: 'E2', to: 'E4' },
        { from: 'E7', to: 'E6' },
        { from: 'F1', to: 'E2' },
        { from: 'D7', to: 'D6' },
        { from: 'G1', to: 'F3' },
        { from: 'C7', to: 'C6' },
        { from: 'E1', to: 'F1' },
        { from: 'A7', to: 'A6' },
        { from: 'F1', to: 'E1' },
        { from: 'B7', to: 'B6' },
    ];
    const newState = playBatchMoves(gameState, moves)

    const result = getPossibleMovesForNotation(newState, 'E1')

    expect(result.sort()).toEqual(['F1'].sort());
});

test("Should not be able to castle kingside if rook has moved", () => {
    const gameState = newGameState()
    const moves = [
        { from: 'E2', to: 'E4' },
        { from: 'E7', to: 'E6' },
        { from: 'F1', to: 'E2' },
        { from: 'D7', to: 'D6' },
        { from: 'G1', to: 'F3' },
        { from: 'C7', to: 'C6' },
        { from: 'H1', to: 'F1' },
        { from: 'A7', to: 'A6' },
        { from: 'F1', to: 'H1' },
        { from: 'B7', to: 'B6' },
    ];
    const newState = playBatchMoves(gameState, moves)

    const result = getPossibleMovesForNotation(newState, 'E1')

    expect(result.sort()).toEqual(['F1'].sort());
});

test("Should not be able to castle queenside if rook has moved", () => {
    const moves = [
        { from: 'D2', to: 'D4' },
        { from: 'E7', to: 'E6' },
        { from: 'C1', to: 'E3' },
        { from: 'D7', to: 'D6' },
        { from: 'D1', to: 'D2' },
        { from: 'C7', to: 'C6' },
        { from: 'B1', to: 'C3' },
        { from: 'A7', to: 'A6' },
        { from: 'A1', to: 'D1' },
        { from: 'B7', to: 'B6' },
        { from: 'D1', to: 'A1' },
        { from: 'F7', to: 'F6' },
    ];
    const newState = playBatchMoves(newGameState(), moves)

    const result = getPossibleMovesForNotation(newState, 'E1')

    expect(result.sort()).toEqual(['D1'].sort());
});
test("Should not be able to castle if king has moved for black", () => {
    const moves = [
        { from: 'E2', to: 'E4' },
        { from: 'E7', to: 'E6' },
        { from: 'F1', to: 'E2' },
        { from: 'F8', to: 'E7' },
        { from: 'G1', to: 'F3' },
        { from: 'G8', to: 'F6' },
        { from: 'E1', to: 'F1' },
        { from: 'E8', to: 'F8' },
        { from: 'F1', to: 'E1' },
        { from: 'F8', to: 'E8' },
        { from: 'A2', to: 'A3' },
    ];
    const newState = playBatchMoves(newGameState(), moves)

    const result = getPossibleMovesForNotation(newState, 'E8')

    expect(result.sort()).toEqual(['F8'].sort());
});

test("Should not be able to castle kingside if rook has moved for black", () => {
    const moves = [
        { from: 'E2', to: 'E4' },
        { from: 'E7', to: 'E6' },
        { from: 'F1', to: 'E2' },
        { from: 'F8', to: 'E7' },
        { from: 'G1', to: 'F3' },
        { from: 'G8', to: 'F6' },
        { from: 'E1', to: 'F1' },
        { from: 'H8', to: 'F8' },
        { from: 'F1', to: 'E1' },
        { from: 'F8', to: 'H8' },
        { from: 'A2', to: 'A3' },
    ];
    const newState = playBatchMoves(newGameState(), moves)

    const result = getPossibleMovesForNotation(newState, 'E8')

    expect(result.sort()).toEqual(['F8'].sort());
});

test("Should not be able to castle queenside if rook has moved for black", () => {
    const moves = [
        { from: 'E2', to: 'E4' },
        { from: 'D7', to: 'D6' },
        { from: 'F1', to: 'E2' },
        { from: 'C8', to: 'E6' },
        { from: 'G1', to: 'F3' },
        { from: 'D8', to: 'D7' },
        { from: 'E1', to: 'F1' },
        { from: 'B8', to: 'C6' },
        { from: 'F1', to: 'E1' },
        { from: 'A8', to: 'D8' },
        { from: 'A2', to: 'A3' },
        { from: 'D8', to: 'A8' },
        { from: 'B2', to: 'B3' },
    ];
    const newState = playBatchMoves(newGameState(), moves)

    const result = getPossibleMovesForNotation(newState, 'E8')

    expect(result.sort()).toEqual(['D8'].sort());
});

test("Should not be able to castle if king is in check", () => {
    const moves = [
        { from: 'G2', to: 'G3' },
        { from: 'B8', to: 'C6' },
        { from: 'F1', to: 'G2' },
        { from: 'C6', to: 'D4' },
        { from: 'G1', to: 'F3' },
        { from: 'D4', to: 'F3' },
    ];
    const newState = playBatchMoves(newGameState(), moves)

    const result = getPossibleMovesForNotation(newState, 'E1')

    expect(result.sort()).toEqual(['F1'].sort());
});