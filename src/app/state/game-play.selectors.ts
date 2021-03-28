import {createFeatureSelector, createSelector} from "@ngrx/store";
import {GamePlayState} from "./game-play.state";

export const gamePlayState = createFeatureSelector<GamePlayState>('game-play');

export const selectIsLoading = createSelector(gamePlayState, (state: GamePlayState) => state.isLoading);

export const selectBoardData = createSelector(gamePlayState, (state: GamePlayState) => state.cellData);

export const selectGameLevel = createSelector(gamePlayState, (state: GamePlayState) => state.level);

export const selectBoardSize = createSelector(gamePlayState, (state: GamePlayState) => state.boardSize);
