import { AbstractGameState, AbstractMove, BestMoveInfo } from './types';

export abstract class GameEngine<T extends AbstractGameState, M extends AbstractMove> {
  public counter: number = 0;
  abstract getMoves(gameState: T): M[]
  abstract playMove(gameState: T, move: M): T
  abstract isTerminalState(gameState: T): boolean
  abstract evaluate(gameState: T): number

  evaluateRecursively(gameState: T, isMaximizing: boolean=true, depth: number=1, alpha: number, beta: number| undefined): number {
    this.counter++;
    if (this.isTerminalState(gameState) || depth <= 1) {
      return this.evaluate(gameState)
    } else {
      const possibleMoves = this.getMoves(gameState)
      const scores: number[] = []
      let currentBeta = beta ?? 10000;
      for (const possibleMove of possibleMoves) {
        const newState = this.playMove(gameState, possibleMove)
        const score = this.evaluateRecursively(newState, !isMaximizing, depth - 1, alpha, currentBeta)
        scores.push(score)
        if (!isMaximizing) {
          currentBeta = Math.min(currentBeta, score);
        }
        if (!isMaximizing && score < alpha) {
          break;
        }
        if (isMaximizing && score > currentBeta) {
          break;
        }
      }
      if (isMaximizing) {
        return Math.max(...scores)
      } else {
        return Math.min(...scores)
      }
    }
  }
  findBestMove(gameState: T, isMaximizing=true, depth=3): BestMoveInfo<M> {
    this.counter = 0;
    let possibleMoves = this.getMoves(gameState);
    if (possibleMoves.length === 0) {
      throw Error("Trying to find best move, but there are no possible moves.")
    }
    const movesWithScores: BestMoveInfo<M>[] = []
    let alpha = -10000;
    for (const possibleMove of possibleMoves) {
      const newState = this.playMove(gameState, possibleMove)
      const score = this.evaluateRecursively(newState, !isMaximizing, depth, alpha, undefined)
      alpha = Math.max(score, alpha);
      movesWithScores.push({move: possibleMove, score})
    }
    console.log(`Evaluated ${this.counter} positions`)
    if (isMaximizing) {
      return this.findMaxMove(movesWithScores);
    } else {
      return this.findMinMove(movesWithScores);
    }
  }

  findMaxMove(movesWithScores: BestMoveInfo<M>[]): BestMoveInfo<M> {
    return movesWithScores.reduce((max, obj) => obj.score > max.score ? obj : max, movesWithScores[0]);
  }

  findMinMove(movesWithScores: BestMoveInfo<M>[]): BestMoveInfo<M> {
    return movesWithScores.reduce((min, obj) => obj.score < min.score ? obj : min, movesWithScores[0]);
  }
}