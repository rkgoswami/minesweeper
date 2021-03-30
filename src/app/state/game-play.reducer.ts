import {GamePlayState, initialGamePlayState} from './game-play.state';
import {GamePlayActions, GamePlayActionTypes} from './game-play.actions';
import {GameUtils} from '../utils/game-utils';

export function gamePlayReducer(state: GamePlayState = initialGamePlayState,
                                action: GamePlayActions): GamePlayState {

  switch (action.type) {
    case GamePlayActionTypes.CreateGameBoard: {
      return {
        ...state,
        isLoading: true
      };
    }

    case GamePlayActionTypes.CreateGameBoardSuccess: {
      return {
        ...state,
        ...action.config,
        gameStatus: 'IN_PROGRESS',
        isLoading: false
      };
    }

    case GamePlayActionTypes.UpdateBoard: {

      if (action.cell.hasMine) {
        // game over
        return {
          ...state,
          gameStatus: 'LOST',
          cellData: GameUtils.showAllCell(state.cellData)
        };
      }
      return {
        ...state,
        cellData: GameUtils.updateCell(state.cellData, action.cell)
      };
    }

    case GamePlayActionTypes.ResetBoard: {
      const newState = GameUtils.getInitialBoardConfiguration(state.level);
      return {
        ...state,
        ...newState
      };
    }

    default:
      return state;
  }

}
