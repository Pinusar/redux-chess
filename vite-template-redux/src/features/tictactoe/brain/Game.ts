import { playMove } from './GameService';

export default class Game {
  private board: string[];
  constructor() {
    this.board =  [
      '.', '.', '.',
      '.', '.', '.',
      '.', '.', '.',
    ];
  }

  getBoard() {
    return this.board;
  }

  playMove(targetCell: number) {
    let newBoard = playMove(this.board, targetCell)
    this.board = newBoard
  }
}