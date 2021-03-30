import {Action} from '@ngrx/store';
import {GamePlay} from './game-play.state';
import {CellData} from '../model/cell-data.model';
import LevelEnum = GamePlay.LevelEnum;

export enum GamePlayActionTypes {
  CreateGameBoard = '[GamePlay] Create Game Board',
  CreateGameBoardSuccess = '[GamePlay] Create Game Board Success',
  UpdateBoard = '[GamePlay] Update Board',
  UpdateBoardSuccess = '[GamePlay] Update Board Success',
  ResetBoard = '[GamePlay] Reset the board'
}

export class CreateGameBoard implements Action {
  readonly type = GamePlayActionTypes.CreateGameBoard;

  constructor(public level: LevelEnum) {
  }
}

export class CreateGameBoardSuccess implements Action {
  readonly type = GamePlayActionTypes.CreateGameBoardSuccess;

  constructor(public config: any) {
  }
}

export class UpdateBoard implements Action {
  readonly type = GamePlayActionTypes.UpdateBoard;

  constructor(public cell: CellData) {
  }
}

export class UpdateBoardSuccess implements Action {
  readonly type = GamePlayActionTypes.UpdateBoardSuccess;
}

export class ResetBoard implements Action {
  readonly type = GamePlayActionTypes.ResetBoard;
}

export type GamePlayActions = CreateGameBoard
  | CreateGameBoardSuccess
  | UpdateBoard
  | UpdateBoardSuccess
  | ResetBoard;


