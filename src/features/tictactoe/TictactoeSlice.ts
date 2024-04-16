import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { playMove } from './brain/GameService';
import { TicTacToeEngine } from './brain/ticTacToeEngine';

const initialBoard = [
  '.', '.', '.',
  '.', '.', '.',
  '.', '.', '.',
]

const initialState = {
  board: initialBoard
}

const engine: TicTacToeEngine = new TicTacToeEngine();

const tictactoeSlice = createSlice(
  {
    name: 'Tictactoe',
    initialState,
    reducers: {
      movePlayed(state, action) {
        const targetCell = action.payload
        const oldBoard = state.board
        const newState = engine.playMove({board: oldBoard}, {target: targetCell})
        let finalState = newState;

        // ai move
        if (engine.isTerminalState({board: newState.board})) {
          finalState = newState
        } else {
          const bestMove = engine.findBestMove(newState, false, 9)
          const stateAfterAiMove = engine.playMove({board: newState.board}, bestMove.move)
          finalState = stateAfterAiMove
        }

        state.board = finalState.board
      },
      gameRestarted(state) {
        state.board = initialBoard
      }
    }
  }
)

export const selectBoard = (state: RootState) => state.tictactoe.board
export const {movePlayed, gameRestarted} = tictactoeSlice.actions
export default tictactoeSlice.reducer