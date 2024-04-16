import { Color } from './Color';
import { CellData, toInternalCellData } from './GameServiceFacade';
import { fromLetter, Piece } from './Piece';
import { PieceType } from './PieceType';
import { GameState } from './GameState';
import { getPawnMoves, isDoublePawnMove, isEnPassantCapture } from './PawnService';
import { getKnightMoves } from './KnightService';
import { getBishopMoves } from './BishopService';
import { getRookMoves } from './RookService';
import { getQueenMoves } from './QueenService';
import { getKingAttackMoves, getKingMoves } from './KingService';

function kingWouldBeInCheckAfterMove(gameState: GameState, sourceCell: number, targetCell: number) {
  const newState = makeMove(gameState, sourceCell, targetCell)
  return isKingInCheck(newState, gameState.activePlayer)
}


function getKingPosition(gameState: GameState, color: Color) {
  let kingPosition = 100;
  for (let i = 0; i < gameState.board.length; i++) {
    const row = gameState.board[i];
    for (let i1 = 0; i1 < row.length; i1++) {
      const piece = row[i1];
      if (piece.type === PieceType.KING && piece.color === color) {
        kingPosition = i * 8 + i1;
      }
    }
  }
  return kingPosition;
}

export function isKingInCheck(gameState: GameState, activePlayer : Color) {
  let kingPosition = getKingPosition(gameState, activePlayer);
  const board = gameState.board
  for (let i = 0; i < board.length; i++) {
    const row = board[i];
    for (let i1 = 0; i1 < row.length; i1++){
      const piece = row[i1];
      if (piece.type !== PieceType.EMPTY && piece.color !== activePlayer) {

        let cell = i * 8 + i1;
        let possibleMoves = getAttackableSquares(gameState, cell);
        if (possibleMoves.includes(kingPosition)) {
          console.log(`${activePlayer} king is in check by ${piece.type} on cell ${cell}`);
          return true;
        }
      }
    }
  }
  return false;
}

export function getPossibleMoves(gameState: GameState, selectedCell: number) : number[] {
  const board = gameState.board
  let result : number[] = []
  const piece = getPiece(board, selectedCell)
  let color = piece.color;
  if (color === gameState.activePlayer) {
    if (piece.type === PieceType.PAWN) {
      result = getPawnMoves(gameState, selectedCell);
    } else if (piece.type === PieceType.KNIGHT) {
      result =  getKnightMoves(gameState, selectedCell, color);
    } else if (piece.type === PieceType.BISHOP) {
      result = getBishopMoves(gameState, selectedCell);
    } else if (piece.type === PieceType.ROOK) {
      result = getRookMoves(gameState, selectedCell);
    } else if (piece.type === PieceType.QUEEN) {
      result = getQueenMoves(gameState, selectedCell);
    } else if (piece.type === PieceType.KING) {
      result = getKingMoves(gameState, selectedCell);
    }
  }
  return result
    .filter(move => !kingWouldBeInCheckAfterMove(gameState, selectedCell, move));
}

export function getAttackableSquares(gameState: GameState, selectedCell: number) : number[] {
  const board = gameState.board
  const result : number[] = []
  const piece = getPiece(board, selectedCell)
  if (piece.type === PieceType.PAWN) {
    return getPawnMoves(gameState, selectedCell);
  } else if (piece.type === PieceType.KNIGHT) {
    return  getKnightMoves(gameState, selectedCell, piece.color);
  } else if (piece.type === PieceType.BISHOP) {
    return getBishopMoves(gameState, selectedCell);
  } else if (piece.type === PieceType.ROOK) {
    return getRookMoves(gameState, selectedCell);
  } else if (piece.type === PieceType.QUEEN) {
    return getQueenMoves(gameState, selectedCell);
  } else if (piece.type === PieceType.KING) {
    return getKingAttackMoves(gameState, selectedCell);
  }
  return result;
}


function oneBack(gameState: GameState, clickedCellData: CellData) : CellData {
  if (gameState.activePlayer === Color.BLACK) {
    return {
      row: clickedCellData.row - 1,
      cell: clickedCellData.cell
    }
  } else {
    return {
      row: clickedCellData.row + 1,
      cell: clickedCellData.cell
    }
  }
}

function makePawnMove(gameState: GameState, sourceCell: number, targetCell: number, board: Piece[][], selectedCellData: CellData, clickedCellData: CellData, piece: Piece) {
  if (isEnPassantCapture(gameState, sourceCell, targetCell)) {
    board[selectedCellData.row][selectedCellData.cell] = fromLetter('.');
    const oneBackCoordinates = oneBack(gameState, clickedCellData);
    board[clickedCellData.row][clickedCellData.cell] = piece;
    board[oneBackCoordinates.row][oneBackCoordinates.cell] = fromLetter('.');
  } else {
    board[selectedCellData.row][selectedCellData.cell] = fromLetter('.');
    board[clickedCellData.row][clickedCellData.cell] = piece;
  }
  if (isDoublePawnMove(piece, sourceCell, targetCell, board)) {
    gameState.enPassantCandidates[piece.color].push(targetCell);
  }
}
function makePieceMove(gameState: GameState, sourceCell: number, targetCell: number, board: Piece[][], selectedCellData: CellData, clickedCellData: CellData, piece: Piece) {
    board[selectedCellData.row][selectedCellData.cell] = fromLetter('.');
    board[clickedCellData.row][clickedCellData.cell] = piece;
}

function isCastlingMove(gameState: GameState, sourceCell: number, targetCell: number) {
  return sourceCell === 60 && [62, 58].includes(targetCell) || sourceCell === 4 && [2, 6].includes(targetCell)
}

function makeKingMove(gameState: GameState, sourceCell: number, targetCell: number, board: Piece[][], selectedCellData: CellData, clickedCellData: CellData, piece: Piece) {
    if (isCastlingMove(gameState, sourceCell, targetCell)) {
      if (targetCell === 62) {
        const rookSourceCell = toInternalCellData(63)
        const rookTargetCell = toInternalCellData(61)
        board[selectedCellData.row][selectedCellData.cell] = fromLetter('.');
        board[clickedCellData.row][clickedCellData.cell] = piece;
        board[rookSourceCell.row][rookSourceCell.cell] = fromLetter('.')
        board[rookTargetCell.row][rookTargetCell.cell] = fromLetter('R')
      } else if (targetCell === 58) {
        const rookSourceCell = toInternalCellData(56)
        const rookTargetCell = toInternalCellData(59)
        board[selectedCellData.row][selectedCellData.cell] = fromLetter('.');
        board[clickedCellData.row][clickedCellData.cell] = piece;
        board[rookSourceCell.row][rookSourceCell.cell] = fromLetter('.')
        board[rookTargetCell.row][rookTargetCell.cell] = fromLetter('R')
      }
      if (targetCell === 6) {
        const rookSourceCell = toInternalCellData(7)
        const rookTargetCell = toInternalCellData(5)
        board[selectedCellData.row][selectedCellData.cell] = fromLetter('.');
        board[clickedCellData.row][clickedCellData.cell] = piece;
        board[rookSourceCell.row][rookSourceCell.cell] = fromLetter('.')
        board[rookTargetCell.row][rookTargetCell.cell] = fromLetter('r')
      } else if (targetCell === 2) {
        const rookSourceCell = toInternalCellData(0)
        const rookTargetCell = toInternalCellData(3)
        board[selectedCellData.row][selectedCellData.cell] = fromLetter('.');
        board[clickedCellData.row][clickedCellData.cell] = piece;
        board[rookSourceCell.row][rookSourceCell.cell] = fromLetter('.')
        board[rookTargetCell.row][rookTargetCell.cell] = fromLetter('r')
      }
    } else {
      board[selectedCellData.row][selectedCellData.cell] = fromLetter('.');
      board[clickedCellData.row][clickedCellData.cell] = piece;
    }
}



export function makeMove(gameState: GameState, sourceCell:number, targetCell: number) : GameState {
  const workingState = JSON.parse(JSON.stringify(gameState))
  const selectedCellData = toInternalCellData(sourceCell);
  const clickedCellData = toInternalCellData(targetCell)
  const board = workingState.board
  const piece = board[selectedCellData.row][selectedCellData.cell];

  workingState.enPassantCandidates[workingState.activePlayer] = [];

  if (piece.type === PieceType.PAWN) {
    makePawnMove(workingState, sourceCell, targetCell, board, selectedCellData, clickedCellData, piece);
  } else if (piece.type === PieceType.KING) {
    makeKingMove(workingState, sourceCell, targetCell, board, selectedCellData, clickedCellData, piece);
    if (workingState.activePlayer === Color.WHITE) {
      workingState.hasWhiteKingMoved = true;
    } else {
      workingState.hasBlackKingMoved = true;
    }
  } else {
    makePieceMove(workingState, sourceCell, targetCell, board, selectedCellData, clickedCellData, piece);
    if (workingState.activePlayer === Color.WHITE) {
      if (piece.type === PieceType.ROOK && sourceCell === 63) {
        workingState.hasWhiteHRookMoved = true;
      } else if (piece.type === PieceType.ROOK && sourceCell === 56) {
        workingState.hasWhiteARookMoved = true;
      }
    } else {
      if (piece.type === PieceType.ROOK && sourceCell === 7) {
        workingState.hasBlackHRookMoved = true;
      } else if (piece.type === PieceType.ROOK && sourceCell === 0) {
        workingState.hasBlackARookMoved = true;
      }
    }
  }


  workingState.activePlayer = workingState.activePlayer === Color.WHITE ? Color.BLACK : Color.WHITE
  let newState = JSON.parse(JSON.stringify(workingState));
  return newState
}

export function hasPieceInternal(board: Piece[][], cellNumber: number) {
  const cellData = toInternalCellData(cellNumber);
  return board[cellData.row][cellData.cell].type !== PieceType.EMPTY;
}

export function getPiece(board: Piece[][], cellNumber: number) {
  const cellData = toInternalCellData(cellNumber);
  return board[cellData.row][cellData.cell]
}

export function hasOpposingPiece(board: Piece[][], cell: number, playerColor : Color) {
  return hasPieceInternal(board, cell) && getPiece(board, cell).color !== playerColor;
}
