import {Injectable} from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {CreateGameBoard, CreateGameBoardSuccess, GamePlayActionTypes} from './game-play.actions';
import {switchMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Store} from '@ngrx/store';
import {GamePlayService} from './game-play.service';

@Injectable()
export class GamePlayEffects {
  constructor(private actions$: Actions,
              private store$: Store<any>,
              private gamePlayService: GamePlayService) {
  }

  @Effect()
  createGameBoard$: Observable<any> = createEffect(() => {
    return this.actions$.pipe(
      ofType(GamePlayActionTypes.CreateGameBoard),
      switchMap((action: CreateGameBoard) => {
        return this.gamePlayService.createGameBoard(action.level).pipe(
          switchMap((config) => of(new CreateGameBoardSuccess(config)))
        );
      })
    );
  });
}



