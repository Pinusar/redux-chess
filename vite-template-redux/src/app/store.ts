import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import counterReducer from "../features/counter/counterSlice"
import postsReducer from '../features/posts/postsSlice';
import usersSclice from '../features/users/usersSclice';
import tictactoeSlice from '../features/tictactoe/TictactoeSlice';
import chessSlice from '../features/chess/ChessSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsReducer,
    users: usersSclice,
    tictactoe: tictactoeSlice,
    chess: chessSlice,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
