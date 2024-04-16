export interface AbstractGameState {

}

export interface AbstractMove {

}

export interface BestMoveInfo<T extends AbstractMove> {
  move: T,
  score: number
}