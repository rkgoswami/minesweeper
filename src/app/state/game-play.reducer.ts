import {GamePlayState, initialGamePlayState} from "./game-play.state";
import {GamePlayActions, GamePlayActionTypes} from "./game-play.actions";
import {GameUtils} from "../utils/game-utils";
import {CellData} from "../model/cell-data.model";
import StatusEnum = CellData.StatusEnum;

export function gamePlayReducer(state: GamePlayState = initialGamePlayState,
                                action: GamePlayActions): GamePlayState {

  switch (action.type) {
    case GamePlayActionTypes.CreateGameBoard: {
      return {
        ...state,
        ...action.config,
        isLoading: true
      }
    }

    case GamePlayActionTypes.CreateGameBoardSuccess: {
      return {...state, isLoading: false}
    }

    case GamePlayActionTypes.UpdateBoard: {
      return {
        ...state,
        cellData: state.cellData.map((subArray: CellData[], rowIndex: number) => {
          if (action.cellPosition.row === rowIndex) {
            return subArray.map((cellData: CellData, colIndex: number) => {
              if (action.cellPosition.col === colIndex) {
                return {
                  ...cellData,
                  status: action.cellStatus
                };
              }
              return cellData;
            })
          }
          return subArray;
        })
      }
    }

    default:
      return state;
  }

}
