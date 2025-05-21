import { configureStore, type ThunkAction, type UnknownAction } from '@reduxjs/toolkit';
import gameReducer from './gameSlice';
import leaderboardReducer from './leaderboardSlice';

export const store = configureStore({
    reducer: {
        game: gameReducer,
        leaderboard: leaderboardReducer,
    },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  UnknownAction
>;