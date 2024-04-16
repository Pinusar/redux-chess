import { getPossibleMovesForNotation, hasPieceForNotation, playMoveForNotation } from '../GameServiceFacade.ts';
import { fromBoard, newGameState } from '../GameState.ts';
import { Color } from '../Color.ts';

test("Should get possible moves for white pawn", () => {
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

    const result = getPossibleMovesForNotation(gameState, 'D2')

    expect(result).toEqual(['D3', 'D4']);
});

test("Should get possible moves for black pawn", () => {
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
    const gameState = fromBoard(board, Color.BLACK)

    const result = getPossibleMovesForNotation(gameState, 'E7')

    expect(result).toEqual(['E6', 'E5']);
});


test("Pawn should not be able to move, if it has a piece in front of it", () => {
    const board = [
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', 'b', '.', '.', '.',],
        ['.', '.', '.', '.', 'P', '.', '.', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
    ]
    const gameState = fromBoard(board)

    const result = getPossibleMovesForNotation(gameState, 'E2')

    expect(result).toEqual([]);
});


test("Black pawn should also not be able to move, if it has a piece in front of it", () => {
    const board = [
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', 'p', '.', '.', '.',],
        ['.', '.', '.', '.', 'N', '.', '.', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
    ]
    const gameState = fromBoard(board)

    const result = getPossibleMovesForNotation(gameState, 'E7')

    expect(result).toEqual([]);
});

test("Pawn should be able to capture diagonally", () => {
    const board = [
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', 'p', 'b', 'p', '.', '.',],
        ['.', '.', '.', '.', 'P', '.', '.', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
    ]
    const gameState = fromBoard(board)

    const result = getPossibleMovesForNotation(gameState, 'E2')

    expect(result).toEqual(['D3', 'F3']);
});

test("White player should not be able to move twice in a row", () => {
    const board = [
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
        ['.', '.', '.', '.', 'P', '.', '.', '.',],
        ['.', '.', '.', '.', '.', '.', '.', '.',],
    ]
    const gameState = fromBoard(board)

    const boardAfterMove = playMoveForNotation(gameState, 'E2', 'E4')
    const result = getPossibleMovesForNotation(boardAfterMove, 'E4')

    expect(result).toEqual([]);
});

test("Should be able to capture en passant", () => {
    let gameState = newGameState()

    gameState = playMoveForNotation(gameState, 'E2', 'E4')
    gameState = playMoveForNotation(gameState, 'E7', 'E6')
    gameState = playMoveForNotation(gameState, 'E4', 'E5')
    gameState = playMoveForNotation(gameState, 'F7', 'F5')

    const result = getPossibleMovesForNotation(gameState, 'E5')

    expect(result).toEqual(['F6']);
});

test("Should be able to capture en passant for black", () => {
    let gameState = newGameState()

    gameState = playMoveForNotation(gameState, 'A2', 'A3')
    gameState = playMoveForNotation(gameState, 'E7', 'E5')
    gameState = playMoveForNotation(gameState, 'E2', 'E3')
    gameState = playMoveForNotation(gameState, 'E5', 'E4')
    gameState = playMoveForNotation(gameState, 'D2', 'D4')

    const result = getPossibleMovesForNotation(gameState, 'E4')

    expect(result).toEqual(['D3']);
});


test("Capturing en passant for black should remove white pawn", () => {
    let gameState = newGameState()

    gameState = playMoveForNotation(gameState, 'A2', 'A3')
    gameState = playMoveForNotation(gameState, 'E7', 'E5')
    gameState = playMoveForNotation(gameState, 'E2', 'E3')
    gameState = playMoveForNotation(gameState, 'E5', 'E4')
    gameState = playMoveForNotation(gameState, 'D2', 'D4')
    gameState = playMoveForNotation(gameState, 'E4', 'D3')

    const whitePawn = hasPieceForNotation(gameState.board, 'D4')

    expect(whitePawn).toBe(false);
});

test("Can capture en passant only on next move", () => {
    let gameState = newGameState()

    gameState = playMoveForNotation(gameState, 'E2', 'E4')
    gameState = playMoveForNotation(gameState, 'E7', 'E6')
    gameState = playMoveForNotation(gameState, 'E4', 'E5')
    gameState = playMoveForNotation(gameState, 'F7', 'F5')
    gameState = playMoveForNotation(gameState, 'A2', 'A3')
    gameState = playMoveForNotation(gameState, 'A7', 'A6')

    const result = getPossibleMovesForNotation(gameState, 'E5')

    expect(result).toEqual([]);
});

test("En passant capture should move behind the pawn", () => {
    let gameState = newGameState()

    gameState = playMoveForNotation(gameState, 'E2', 'E4')
    gameState = playMoveForNotation(gameState, 'E7', 'E6')
    gameState = playMoveForNotation(gameState, 'E4', 'E5')
    gameState = playMoveForNotation(gameState, 'F7', 'F5')
    gameState = playMoveForNotation(gameState, 'E5', 'F6')

    const result = hasPieceForNotation(gameState.board, 'F5')

    expect(result).toBe(false);
});