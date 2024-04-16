import { AbstractGameState, AbstractMove, BestMoveInfo } from './types';

export abstract class GameEngine<T extends AbstractGameState, M extends AbstractMove> {
  abstract getMoves(gameState: T): M[]
  abstract playMove(gameState: T, move: M): T
  abstract isTerminalState(gameState: T): boolean
  abstract evaluate(gameState: T): number

  evaluateRecursively(gameState: T, isMaximizing: boolean=true, depth: number=1): number {
    if (this.isTerminalState(gameState) || depth <= 1) {
      return this.evaluate(gameState)
    } else {
      const possibleMoves = this.getMoves(gameState)
      const movesWithScores: number[] = []
      for (const possibleMove of possibleMoves) {
        const newState = this.playMove(gameState, possibleMove)
        const score = this.evaluateRecursively(newState, !isMaximizing, depth - 1)
        movesWithScores.push(score)
      }
      if (isMaximizing) {
        return Math.max(...movesWithScores)
      } else {
        return Math.min(...movesWithScores)
      }
    }
  }
  findBestMove(gameState: T, isMaximizing=true, depth=3): BestMoveInfo<M> {
    let possibleMoves = this.getMoves(gameState);
    if (possibleMoves.length === 0) {
      throw Error("Trying to find best move, but there are no possible moves.")
    }
    const movesWithScores = []
    for (const possibleMove of possibleMoves) {
      const newState = this.playMove(gameState, possibleMove)
      const score = this.evaluateRecursively(newState, !isMaximizing, depth)
      movesWithScores.push({move: possibleMove, score})
    }
    if (isMaximizing) {
      return movesWithScores.reduce((max, obj) => obj.score > max.score ? obj : max, movesWithScores[0]);
    } else {
      return movesWithScores.reduce((min, obj) => obj.score < min.score ? obj : min, movesWithScores[0]);
    }
  }
}