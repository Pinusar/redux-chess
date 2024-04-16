import { GameState } from './GameState';
import { PieceType } from './PieceType';
import { getPiece } from './GameService';

function isLegal(gameState: GameState, current: number, direction: number) {
  const targetCell = current + direction;
  const row = current % 8;
  if (row === 0 && direction === -1) {
    return false;
  }
  if (row === 7 && direction === 1) {
    return false;
  }
  if (targetCell < 0 || targetCell >= 64) {
    return false;
  }
  let piece = getPiece(gameState.board, targetCell);
  if (piece.type === PieceType.EMPTY) {
    return true;
  }
  if (piece.color === gameState.activePlayer) {
    return false;
  }
  return true;
}

export function getRookMoves(gameState: GameState, selectedCell: number) {
  const result : number[] = []
  const directions = [-1, 1, -8, 8]

  let current = selectedCell;

  for (const direction of directions) {
    while (isLegal(gameState, current, direction)) {
      current = current + direction;
      result.push(current);
      if (getPiece(gameState.board, current).type !== PieceType.EMPTY) {
        break;
      }
    }
    current = selectedCell;
  }

  return result;
}