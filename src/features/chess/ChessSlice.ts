import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getNotation, getPossibleMovesForCellNumber, hasPiece, playMove } from './engine/GameServiceFacade';
import { GameState, newGameState } from './engine/GameState';
import { ChessEngine } from './engine/ChessEngine';

let initialGameState = newGameState();
const initialState : State  = {
  gameState: initialGameState,
  twoPlayerModeEnabled: false,
  selectedCell: null,
  possibleMoveCells: [],
  computerMoveFrom: null,
  computerMoveTo: null,
}

const chessSlice = createSlice(
  {
    name: 'Chess',
    initialState,
    reducers: {
      cellClicked(state, action : CellClickedAction) {
        const targetCell = action.payload

        if (state.selectedCell != null && state.possibleMoveCells.includes(targetCell)) {
          let newState = playMove(state.gameState, state.selectedCell, targetCell);

          // computer move
          if (!state.twoPlayerModeEnabled) {
            const start = performance.now()
            const engine = new ChessEngine();
            const bestMove = engine.findBestMove({state: newState}, false, 3)
            newState = playMove(newState, bestMove.move.from, bestMove.move.to)
            state.computerMoveFrom = bestMove.move.from
            state.computerMoveTo = bestMove.move.to
            const end = performance.now()
            console.log(`engine took: ${end - start} ms`)

          }

          state.gameState = newState
          state.selectedCell = null;
          state.possibleMoveCells = [];
        } else if (hasPiece(state.gameState.board, targetCell)) {
          state.selectedCell = targetCell;
          state.possibleMoveCells = getPossibleMovesForCellNumber(state.gameState, state.selectedCell);
        } else {
          state.selectedCell = null;
          state.possibleMoveCells = [];
        }

        return state;
      },
      gameRestarted(state) {
        state.gameState = initialGameState
        state.selectedCell = null;
        state.possibleMoveCells = [];
        state.computerMoveFrom = null;
        state.computerMoveTo = null;
      },
      gameModeChanged(state) {
        state.twoPlayerModeEnabled = !state.twoPlayerModeEnabled
      }
    }
  }
)

export const selectBoard = (state: RootState) => state.chess.gameState.board
export const selectTwoPlayerMode = (state: RootState) => state.chess.twoPlayerModeEnabled
export const selectSelectedCell = (state: RootState) => state.chess.selectedCell
export const selectComputerMoveFrom = (state: RootState) => state.chess.computerMoveFrom
export const selectComputerMoveTo = (state: RootState) => state.chess.computerMoveTo
export const selectPossibleMoves = (state: RootState) => state.chess.possibleMoveCells
export const selectPossibleMovesNotation = (state: RootState) => state.chess.possibleMoveCells.map(c => getNotation(c))
export const {gameRestarted, cellClicked, gameModeChanged} = chessSlice.actions
export default chessSlice.reducer

interface State {
  gameState: GameState,
  twoPlayerModeEnabled: boolean,
  selectedCell: number | null,
  possibleMoveCells: number[],
  computerMoveFrom: number | null,
  computerMoveTo: number | null,
}

interface CellClickedAction {
  payload: number
}