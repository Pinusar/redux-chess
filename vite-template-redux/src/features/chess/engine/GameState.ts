import { fromLetter, Piece } from './Piece';
import { Color } from './Color';

export interface GameState {
  board: Piece[][],
  enPassantCandidates: EnPassantInfo,
  activePlayer: Color,
  hasWhiteKingMoved: boolean,
  hasBlackKingMoved: boolean,
  hasWhiteHRookMoved: boolean,
  hasBlackHRookMoved: boolean,
  hasWhiteARookMoved: boolean,
  hasBlackARookMoved: boolean,
}

export type EnPassantInfo = {
  [key in Color]: number[];
};

export function newGameState() {
  const initialBoard = [
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r',],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p',],
    ['.', '.', '.', '.', '.', '.', '.', '.',],
    ['.', '.', '.', '.', '.', '.', '.', '.',],
    ['.', '.', '.', '.', '.', '.', '.', '.',],
    ['.', '.', '.', '.', '.', '.', '.', '.',],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P',],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R',],
  ]
  return fromBoard(initialBoard)
}

export function fromBoard(board: string[][], activePlayer=Color.WHITE) {
  const pieceBoard = board.map(row => row.map(cell => fromLetter(cell)))
  const enPassantInfo : EnPassantInfo = {
    0: [],
    1: []
  }
  return {
    board: pieceBoard,
    enPassantCandidates: enPassantInfo,
    hasWhiteARookMoved: false,
    hasWhiteHRookMoved: false,
    hasWhiteKingMoved: false,
    hasBlackARookMoved: false,
    hasBlackHRookMoved: false,
    hasBlackKingMoved: false,
    activePlayer
  }
}