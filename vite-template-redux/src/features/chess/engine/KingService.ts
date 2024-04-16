import { GameState } from './GameState';
import { PieceType } from './PieceType';
import { getPiece, isKingInCheck } from './GameService';
import { Color } from './Color';

export function getKingMoves(gameState: GameState, selectedCell: number) {
  return [...getRegularKingMoves(gameState, selectedCell), ...getCastlingMoves(gameState, selectedCell)]
}

export function getKingAttackMoves(gameState: GameState, selectedCell: number) {
  return getRegularKingMoves(gameState, selectedCell)
}

function getRegularKingMoves(gameState: GameState, selectedCell: number) {
  const zeroRowCancel = [-1, -7, -9]
  const seventhRowCancel = [1, 7, 9]
  const candidates = [1, -1, -7, -8, -9, 7, 8, 9]
  const row = selectedCell % 8;
  return candidates
    .filter(c => !(row == 0 && zeroRowCancel.includes(c)))
    .filter(c => !(row == 7 && seventhRowCancel.includes(c)))
    .map(c => c + selectedCell)
    .filter(targetCell => targetCell >= 0 && targetCell < 64)
    .filter(targetCell => {
      let piece = getPiece(gameState.board, targetCell);
      return piece.type === PieceType.EMPTY || piece.color !== gameState.activePlayer
    })
}


function getCastlingMoves(gameState: GameState, selectedCell: number) {
  let king;
  let result = []
  if (!isKingInCheck(gameState, gameState.activePlayer)) {
    if (gameState.activePlayer === Color.WHITE) {
      king = getPiece(gameState.board, 60)
      if (!gameState.hasWhiteKingMoved) {
        if (PieceType.KING === king.type) {
          if (!gameState.hasWhiteHRookMoved) {
            if (getPiece(gameState.board, 62).type === PieceType.EMPTY
              && getPiece(gameState.board, 61).type === PieceType.EMPTY
            ) {
              result.push(62)
            }
          }
          if (!gameState.hasWhiteARookMoved) {
            if (getPiece(gameState.board, 57).type === PieceType.EMPTY
              && getPiece(gameState.board, 58).type === PieceType.EMPTY
              && getPiece(gameState.board, 59).type === PieceType.EMPTY
            ) {
              result.push(58)
            }
          }
        }
      }
    }
    else {
      king = getPiece(gameState.board, 4)
      if (PieceType.KING === king.type) {
        if (!gameState.hasBlackKingMoved) {
          if (!gameState.hasBlackHRookMoved) {
            if (getPiece(gameState.board, 6).type === PieceType.EMPTY
              && getPiece(gameState.board, 5).type === PieceType.EMPTY
            ) {
              result.push(6)
            }
          }
          if (!gameState.hasBlackARookMoved) {
            if (getPiece(gameState.board, 3).type === PieceType.EMPTY
              && getPiece(gameState.board, 2).type === PieceType.EMPTY
              && getPiece(gameState.board, 1).type === PieceType.EMPTY
            ) {
              result.push(2)
            }
          }
        }
      }
    }
  }
  return result;
}