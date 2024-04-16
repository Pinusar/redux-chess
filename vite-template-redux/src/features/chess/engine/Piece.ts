import { Color } from './Color';
import { PieceType } from './PieceType';

export interface Piece {
  color: Color
  type: PieceType
  symbol: string
}

export function fromLetter(letter: string) : Piece {
  let color;
  let type;

  if (letter.toUpperCase() === letter) {
    color = Color.WHITE
  } else {
    color = Color.BLACK
  }

  switch (letter.toUpperCase()) {
    case 'P':
      type = PieceType.PAWN;
      break;
    case 'B':
      type = PieceType.BISHOP;
      break;
    case 'R':
      type = PieceType.ROOK;
      break;
    case 'N':
      type = PieceType.KNIGHT;
      break;
    case 'K':
      type = PieceType.KING;
      break;
    case 'Q':
      type = PieceType.QUEEN;
      break;
    case '.':
      type = PieceType.EMPTY;
      break;
    default:
      throw Error(`Unknown piece letter: ${letter}`)
  }

  return {
    color,
    type,
    symbol: letter
  }
}