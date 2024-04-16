import { GameEngine } from '../../ai/aiService';
import { findPossibleMoves, findWinner, O, playMove, X } from './GameService';

export class TicTacToeEngine extends GameEngine<TicTacToeState, TicTacToeMove> {
  evaluate(gameState: TicTacToeState): number {
    const winner = findWinner(gameState.board)
    if (winner === null) {
      return 0
    } else if (winner === X) {
      return 1
    } else {
      return -1
    }
  }

  getMoves(gameState: TicTacToeState): TicTacToeMove[] {
    return findPossibleMoves(gameState.board).map(move => {return {target: move}})
  }

  isTerminalState(gameState: TicTacToeState): boolean {
    let emptyCells = gameState.board.filter(cell => cell === '.');
    return emptyCells.length === 0 || findWinner(gameState.board) !== null
  }

  playMove(gameState: TicTacToeState, move: TicTacToeMove): TicTacToeState {
    const newState = playMove(gameState.board, move.target)
    return {board: newState}
  }

}

export interface TicTacToeState {
  board: string[]
}

export interface TicTacToeMove {
  target: number
}