import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {
  selectBoardData,
  selectBoardSize,
  selectGameLevel,
  selectGameStatus,
  selectIsLoading
} from "./game-play.selectors";
import {Observable, of} from "rxjs";
import {GamePlay} from "./game-play.state";
import {CreateGameBoard, ResetBoard, SetFlagToCell, UpdateBoard} from "./game-play.actions";
import {GameUtils} from "../utils/game-utils";
import {CellData} from "../model/cell-data.model";
import LevelEnum = GamePlay.LevelEnum;
import GameStatusEnum = GamePlay.GameStatusEnum;

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

  selectBoardSize$(): Observable<{ row: number, col: number }> {
    return this.store.select(selectBoardSize);
  }

  selectGameLevel$(): Observable<GamePlay.LevelEnum> {
    return this.store.select(selectGameLevel);
  }

  selectGameStatus$(): Observable<GameStatusEnum> {
    return this.store.select(selectGameStatus);
  }

  selectBoardData$(): Observable<CellData[][]> {
    return this.store.select(selectBoardData);
  }

  /* DISPATCHERS */

  initGameBoard(level: LevelEnum = LevelEnum.BEGINNER): void {
    this.store.dispatch(new CreateGameBoard(level));
  }

  updateCellStatus(cell: CellData) {
    this.store.dispatch(new UpdateBoard(cell))
  }

  setFlagToCell(cell: CellData) {
    this.store.dispatch(new SetFlagToCell(cell))
  }

  resetBoard() {
    this.store.dispatch(new ResetBoard())
  }

  createGameBoard(level): Observable<any> {
    const gameConfig = GameUtils.getInitialBoardConfiguration(level);
    return of(gameConfig);
  }

}
