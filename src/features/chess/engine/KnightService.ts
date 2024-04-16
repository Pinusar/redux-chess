import { GameState } from './GameState';
import { PieceType } from './PieceType';
import { getPiece } from './GameService';
import { Color } from './Color';

export function getKnightMoves(gameState: GameState, selectedCell: number, color: Color) {
  const zeroRowCancel = [-10, 15, 6, -17]
  const firstRowCancel = [-10, 6]
  const seventhRowCancel = [10, 17, -6, -15]
  const sixthRowCancel = [10, -6]
  const candidates = [6, 15, 17, 10, -10, - 17, -6, -15]
  const row = selectedCell % 8;
  return candidates
    .filter(c => !(row == 1 && firstRowCancel.includes(c)))
    .filter(c => !(row == 0 && zeroRowCancel.includes(c)))
    .filter(c => !(row >= 6 && sixthRowCancel.includes(c)))
    .filter(c => !(row == 7 && seventhRowCancel.includes(c)))
    .map(c => c + selectedCell)
    .filter(targetCell => targetCell >= 0 && targetCell < 64)
    .filter(targetCell => {
      let piece = getPiece(gameState.board, targetCell);
      return piece.type === PieceType.EMPTY || piece.color !== color
    })
}