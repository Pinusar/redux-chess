import { getPiece, getPossibleMoves, hasPieceInternal, makeMove } from './GameService';
import { fromLetter, Piece } from './Piece';
import { GameState } from './GameState';
import { Color } from './Color';
import { PieceType } from './PieceType';


export function getPossibleMovesForNotation(gameState: GameState, cellNotation: string) : string[] {
  const cellNumber : number = toCellNumber(cellNotation);
  return getPossibleMoves(gameState, cellNumber).map(cell => getNotation(cell));
}

export function getPossibleMovesForCellNumber(gameState: GameState, cellNumber: number) : number[] {
  return getPossibleMoves(gameState, cellNumber);
}

export function playMoveForNotation(gameState: GameState, fromCell: string, targetCell: string) : GameState {
  return playMove(gameState, toCellNumber(fromCell), toCellNumber(targetCell))
}

export function playBatchMoves(gameState: GameState, moves: Move[]) {
  let workingState = gameState;
  moves.forEach(move => workingState = playMoveForNotation(workingState, move.from, move.to))
  return workingState;
}


export function playMove(gameState: GameState, fromCell: number, targetCell: number) : GameState {
  return makeMove(gameState, fromCell, targetCell);
}

export function hasPieceForNotation(board: Piece[][], cellNotation: string) {
  const cellNumber : number = toCellNumber(cellNotation);
  return hasPieceInternal(board, cellNumber)
}

export function hasPiece(board: Piece[][], cellNumber: number) {
  return hasPieceInternal(board, cellNumber)
}

export function getPieceForNotation(board: Piece[][], cellNotation: string) {
  let cellNumber = toCellNumber(cellNotation);
  return getPiece(board, cellNumber)
}


function toCellNumber(cellNotation : string) : number {
  const letter = cellNotation.substring(0, 1);
  const row : number = Number(cellNotation.substring(1));
  const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
  let cell = columns.findIndex(e => e === letter)
  return (8 - row) * 8 + cell
}


export function getNotation(targetCell: number) {
  const columns = ['-', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
  const row = 8 - Math.floor(targetCell / 8) ;
  const cell = targetCell % 8 + 1;
  return columns[cell] + row;
}

export function toInternalCellData(targetCell: number) : CellData {
  const row = Math.floor(targetCell / 8) ;
  const cell = targetCell % 8 ;
  return {
    row,
    cell
  }
}

export function isBlack(targetCell: number) {
  const row = 8 - Math.floor(targetCell / 8) ;
  const cell = targetCell % 8 + 1;
  return (row + cell) % 2 === 0;
}

export interface CellData {
  row: number,
  cell: number
}

export interface Move {
  from: string,
  to: string
}
