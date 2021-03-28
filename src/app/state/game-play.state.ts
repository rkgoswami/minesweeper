import {CellData} from "../model/cell-data.model";
import LevelEnum = GamePlay.LevelEnum;
import GameStatusEnum = GamePlay.GameStatusEnum;

export interface GamePlayState {
  isLoading: boolean;
  cellData: CellData[][];
  level: LevelEnum;
  boardSize: { row: number, col: number };
  mineCount: number;
  gameStatus: GameStatusEnum;
  score: number;
}

export const initialGamePlayState: GamePlayState = {
  isLoading: false,
  cellData: [],
  level: null,
  boardSize: null,
  mineCount: 0,
  gameStatus: null,
  score: 0
}

export namespace GamePlay {
  export type LevelEnum = 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT';
  export const LevelEnum = {
    BEGINNER: 'BEGINNER' as LevelEnum,
    INTERMEDIATE: 'INTERMEDIATE' as LevelEnum,
    EXPERT: 'EXPERT' as LevelEnum
  };

  export type GameStatusEnum = 'NOT_STARTED' | 'WON' | 'IN_PROGRESS' | 'LOST';
  export const GameStatusEnum = {
    NOT_STARTED: 'NOT_STARTED' as GameStatusEnum,
    WON: 'WON' as GameStatusEnum,
    IN_PROGRESS: 'IN_PROGRESS' as GameStatusEnum,
    LOST: 'LOST' as GameStatusEnum
  };
}
