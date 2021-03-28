import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {selectBoardData, selectBoardSize, selectGameLevel, selectIsLoading} from "./game-play.selectors";
import {Observable} from "rxjs";
import {GamePlay} from "./game-play.state";
import {CreateGameBoard, UpdateBoard} from "./game-play.actions";
import {GameUtils} from "../utils/game-utils";
import {CellData} from "../model/cell-data.model";
import LevelEnum = GamePlay.LevelEnum;
import StatusEnum = CellData.StatusEnum;

// @ts-ignore
@Injectable({
  providedIn: "root"
})
export class GamePlayService {

  constructor(private store: Store) {
  }

  /* SELECTORS */

  isLoading$(): Observable<boolean> {
    return this.store.select(selectIsLoading);
  }

  selectBoardSize$(): Observable<{row: number, col: number}> {
    return this.store.select(selectBoardSize);
  }

  selectGameLevel$(): Observable<GamePlay.LevelEnum> {
    return this.store.select(selectGameLevel);
  }

  selectBoardData$(): Observable<CellData[][]> {
    return this.store.select(selectBoardData);
  }

  /* DISPATCHERS */

  initGameBoard$(): void {
    this.store.dispatch(new CreateGameBoard(GameUtils.getInitialBoardConfiguration(LevelEnum.BEGINNER)));
  }

  updateCellStatus$(row: number, col: number, status?: StatusEnum) {
    this.store.dispatch(new UpdateBoard({row, col}, status))
  }
}
