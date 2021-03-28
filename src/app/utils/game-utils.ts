import {GamePlay} from "../state/game-play.state";
import {CellData} from "../model/cell-data.model";
import LevelEnum = GamePlay.LevelEnum;
import StatusEnum = CellData.StatusEnum;
import GameStatusEnum = GamePlay.GameStatusEnum;

export class GameUtils {

  static readonly boardSizeToLevelMap = {
    'BEGINNER': {rowLength: 9, colLength: 9, mines: 10},
    'INTERMEDIATE': {rowLength: 16, colLength: 16, mines: 40},
    'EXPERT': {rowLength: 16, colLength: 30, mines: 99}
  }

  static peerPosition = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

  public static getBoardSizeBasesOnLevel(level: LevelEnum) {
    return GameUtils.boardSizeToLevelMap[level];
  }

  public static get2DCellData(row, col) {
    // @ts-ignore
    let arr = new Array(row);
    for (let i = 0; i < row; ++i) {
      arr[i] = new Array(col);
    }

    for (let i = 0; i < row; ++i) {
      for (let j = 0; j < col; ++j) {
        arr[i][j] = {
          status: StatusEnum.HIDDEN,
          value: "(" + i+ "," + j + ")",
          nearMines: 0,
          hasMine: false
        }
      }
    }
    return arr;
  }

  private static getRandomCell(rowLength: number, colLength: number): { row: number, col: number } {
    let row = Math.floor(Math.random() * rowLength);
    let col = Math.floor(Math.random() * colLength);
    console.log(row, col);
    return {row, col};
  }


  public static getInitialBoardConfiguration(level: LevelEnum) {
    const {rowLength, colLength, mines} = GameUtils.getBoardSizeBasesOnLevel(level);
    // create the board
    const cellDataList = GameUtils.get2DCellData(rowLength, colLength);

    // Assign mine to it
    for (let i = 0; i < mines; ++i) {
      let {row, col} = GameUtils.getRandomCell(rowLength, colLength);

      // check if random function doesn't select the same position
      if (cellDataList[row][col].hasMine) {
        --i;
      } else {
        cellDataList[row][col] = {
          status: StatusEnum.HIDDEN,
          nearMines: -1,
          hasMine: true
        };

        // update the neighbours
        GameUtils.updateNeighboursWithMinesCount(cellDataList, rowLength, colLength, row, col);
      }

    }


    // calculate the neighbour mines
    //GameUtils.countNeighbourMines(cellData);
    console.log('Inside getInitialBoardConfiguration: ', cellDataList);

    return {
      cellData: [...cellDataList],
      level: level,
      boardSize: {rowLength, colLength},
      mineCount: mines,
      gameStatus: GameStatusEnum.NOT_STARTED,
      score: 0
    };
  }

  private static updateNeighboursWithMinesCount(cellDataList: CellData[][], rowLength, colLength, curRow, curCol) {

    const neighbours = GameUtils.peerPosition;
    console.log('Neb: ', neighbours);

    for (let i = 0; i < neighbours.length; ++i) {
      let r = curRow + neighbours[i][0];
      let c = curCol + neighbours[i][1];

      console.log('(r,c): ', r, c);
      console.log('(curR,curC): ', curRow, curCol);

      // check boundary for overflow
      if ((r >= 0 && r < rowLength) &&
        (c >= 0 && c < colLength) && !cellDataList[r][c].hasMine) {
        cellDataList[r][c] = {
          ...cellDataList[r][c],
          nearMines: cellDataList[r][c].nearMines + 1
        }
        console.log('updated cell: ', cellDataList[r][c]);
      }
    }
    console.log(cellDataList);
  }

  public static showCell() {
    //if ()
  }
}
