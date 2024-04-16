import { GameState } from './GameState';
import { PieceType } from './PieceType';
import { getPiece } from './GameService';
import { Color } from './Color';

function isLegal(gameState: GameState, current: number, direction: number, pieceColor: Color) {
  const targetCell = current + direction;
  const row = current % 8;
  if (row === 0 && direction < 0) {
    return false;
  }
  if (row === 7 && direction > 0) {
    return false;
  }
  if (targetCell < 0 || targetCell >= 64) {
    return false;
  }
  let piece = getPiece(gameState.board, targetCell);
  if (piece.type === PieceType.EMPTY) {
    return true;
  }
  if (piece.color === pieceColor) {
    return false;
  }
  return true;
}

export function getBishopMoves(gameState: GameState, selectedCell: number) {
  const result : number[] = []
  const directions = [-7, -9, 7, 9]
  const pieceColor = getPiece(gameState.board, selectedCell).color
  let current = selectedCell;

  for (const direction of directions) {
    while (isLegal(gameState, current, direction, pieceColor)) {
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