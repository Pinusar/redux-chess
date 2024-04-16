import { GameEngine } from '../../ai/aiService';
import { getPossibleMoves } from './GameService';
import { playMove as executeMove } from './GameServiceFacade';
import { GameState } from './GameState';
import { PieceType } from './PieceType';
import { Color } from './Color';

export class ChessEngine extends GameEngine<ChessState, ChessMove> {
  evaluate(gameState: ChessState): number {
    let result = 0;
    for (let i = 0; i < gameState.state.board.length; i++) {
      const row = gameState.state.board[i];
      for (let i1 = 0; i1 < row.length; i1++){
        const piece = row[i1];

        const values = {
          'K': 0,
          'P': 1,
          'R': 5,
          'N': 3,
          'B': 3,
          'Q': 9,
        }

        if (piece.type !== PieceType.EMPTY) {
          // @ts-ignore
          const pieceValue = values[piece.symbol.toUpperCase()]
          if (piece.color === Color.WHITE) {
            result += pieceValue
          } else {
            result -= pieceValue
          }
        }
      }
    }
    return result;
  }

  getMoves(gameState: ChessState): ChessMove[] {
    let result: ChessMove[] = []
    for (let i = 0; i < gameState.state.board.length; i++) {
      const row = gameState.state.board[i];
      for (let i1 = 0; i1 < row.length; i1++){
        const piece = row[i1];

        if (piece.type !== PieceType.EMPTY && piece.color === gameState.state.activePlayer) {
          let cell = i * 8 + i1;
          const moves = getPossibleMoves(gameState.state, cell)
          moves.forEach(move => result.push({from: cell, to: move}))
        }
      }
    }
    return result;
  }

  isTerminalState(gameState: ChessState): boolean {
    return false;
  }

  playMove(gameState: ChessState, move: ChessMove): ChessState {
    const newState = executeMove(gameState.state, move.from, move.to)
    return {state: newState};
  }

}

export interface ChessState {
  state: GameState
}

export interface ChessMove {
  from: number,
  to: number
}