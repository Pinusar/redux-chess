import { GameState } from './GameState';
import { Color, oppositeColor } from './Color';
import { toInternalCellData } from './GameServiceFacade';
import { Piece } from './Piece';
import { PieceType } from './PieceType';
import { getPiece, hasOpposingPiece, hasPieceInternal } from './GameService';

function hasEnPassantCandidate(gameState: GameState, cellNumber: number, color: Color.WHITE | Color.BLACK) {
  return gameState.enPassantCandidates[oppositeColor(color)].includes(cellNumber);
}

function isOnSecondRank(selectedCell: number, color: Color) {
  const cellData = toInternalCellData(selectedCell);
  let secondRank;
  if (color === Color.WHITE) {
    secondRank = 6;
  } else if (color === Color.BLACK) {
    secondRank = 1;
  }
  return cellData.row === secondRank;
}
function isOnFourthRank(selectedCell: number, color: Color) {
  const cellData = toInternalCellData(selectedCell);
  let secondRank;
  if (color === Color.WHITE) {
    secondRank = 4;
  } else if (color === Color.BLACK) {
    secondRank = 3;
  }
  return cellData.row === secondRank;
}

export function getPawnMoves(gameState: GameState, selectedCell: number) {
  const result = []
  const board = gameState.board
  const piece = getPiece(board, selectedCell);
  let oneForward;
  let northWest;
  let northEast;
  let right = 1;
  let left = -1;
  if (piece.color === Color.WHITE) {
    oneForward = -8;
    northEast = -9;
    northWest = -7;
  } else if (piece.color === Color.BLACK) {
    oneForward = 8;
    northEast = 7;
    northWest = 9;
  } else {
    throw Error('Expected pawn here at ' + selectedCell);
  }
  if (!hasPieceInternal(board, selectedCell + oneForward)) {
    result.push(selectedCell + oneForward);
    if (isOnSecondRank(selectedCell, piece.color)) {
      if (!hasPieceInternal(board, selectedCell + (oneForward * 2))) {
        result.push(selectedCell + (oneForward * 2));
      }
    }
  }
  if (hasOpposingPiece(board, selectedCell + northEast, piece.color)) {
    result.push(selectedCell + northEast);
  }
  if (hasOpposingPiece(board, selectedCell + northWest, piece.color)) {
    result.push(selectedCell + northWest);
  }
  if (hasEnPassantCandidate(gameState, selectedCell + right, piece.color)) {
    result.push(selectedCell + northWest);
  }
  if (hasEnPassantCandidate(gameState, selectedCell + left, piece.color)) {
    result.push(selectedCell + northEast);
  }
  return result;
}

export function isDoublePawnMove(piece: Piece, fromCell: number, targetCell: number, board: Piece[][]) {
  let isPawn = piece.type === PieceType.PAWN;
  let startsFromSecondRank = isOnSecondRank(fromCell, piece.color);
  let goesToFourthRank = isOnFourthRank(targetCell, piece.color);
  return isPawn && startsFromSecondRank && goesToFourthRank
}


function isDiagonal(sourceCell: number, targetCell: number) {
  const diff = targetCell - sourceCell;
  return diff === 7 || diff === -7 || diff === 9 || diff === -9
}

export function isEnPassantCapture(gameState: GameState, sourceCell: number, targetCell: number) {
  const diagonal = isDiagonal(sourceCell, targetCell);
  const movingPiece = getPiece(gameState.board, sourceCell);
  const targetSquare = getPiece(gameState.board, targetCell);
  return movingPiece.type === PieceType.PAWN && targetSquare.type === PieceType.EMPTY && diagonal;
}