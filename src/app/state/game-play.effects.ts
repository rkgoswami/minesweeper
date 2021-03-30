import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {
  CreateGameBoard,
  CreateGameBoardSuccess,
  GamePlayActionTypes,
  UpdateBoard,
  UpdateGameStatus
} from './game-play.actions';
import {switchMap, withLatestFrom} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Store} from '@ngrx/store';
import {GamePlayService} from './game-play.service';
import {selectBoardData} from "./game-play.selectors";
import {CellData} from "../model/cell-data.model";
import {GameUtils} from "../utils/game-utils";
import {GamePlay} from "./game-play.state";
import GameStatusEnum = GamePlay.GameStatusEnum;

@Injectable()
export class GamePlayEffects {
  constructor(private actions$: Actions,
              private store$: Store<any>,
              private gamePlayService: GamePlayService) {
  }

  @Effect()
  createGameBoard$: Observable<any> = createEffect(() => {
    return this.actions$.pipe(
      ofType<CreateGameBoard>(GamePlayActionTypes.CreateGameBoard),
      switchMap((action: CreateGameBoard) => {
        return this.gamePlayService.createGameBoard(action.level).pipe(
          switchMap((config) => of(new CreateGameBoardSuccess(config)))
        );
      })
    );
  });

  @Effect()
  updateHiddenCells$: Observable<any> = createEffect(() => {
    return this.actions$.pipe(
      ofType<UpdateBoard>(GamePlayActionTypes.UpdateBoard),
      withLatestFrom(this.store$.select(selectBoardData)),
      switchMap(([action, cellData]: [UpdateBoard, CellData[][]]) => {
        let config;
        if (!action.cell.hasMine) {
          config = GameUtils.handleGameStatus(cellData);
        } else {
          config = {status: GameStatusEnum.LOST, hiddenCells: 0};
        }
        return of(new UpdateGameStatus(config));
      })
    );
  });
}



