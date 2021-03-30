import {GamePlay} from '../state/game-play.state';
import {CellData, StatusEnum} from '../model/cell-data.model';
import LevelEnum = GamePlay.LevelEnum;
import GameStatusEnum = GamePlay.GameStatusEnum;

export class GameUtils {

  static readonly boardSizeToLevelMap = {
    BEGINNER: {rowLength: 9, colLength: 9, mines: 10},
    INTERMEDIATE: {rowLength: 16, colLength: 16, mines: 40},
    EXPERT: {rowLength: 16, colLength: 30, mines: 99}
  };

  static peerPosition = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

  public static getBoardSizeBasesOnLevel(level: LevelEnum): any {
    return GameUtils.boardSizeToLevelMap[level];
  }

  public static get2DCellData(rowSize: number, colSize: number): CellData[][] {
    // @ts-ignore
    const arr = new Array(rowSize);
    for (let i = 0; i < rowSize; ++i) {
      arr[i] = new Array(colSize);
    }

    for (let i = 0; i < rowSize; ++i) {
      for (let j = 0; j < colSize; ++j) {
        arr[i][j] = {
          status: StatusEnum.HIDDEN,
          nearMines: 0,
          hasMine: false,
          row: i,
          col: j
        };
      }
    }
    return arr;
  }

  private static getRandomCell(rowLength: number, colLength: number): { row: number, col: number } {
    const row = Math.floor(Math.random() * rowLength);
    const col = Math.floor(Math.random() * colLength);
    return {row, col};
  }


  public static getInitialBoardConfiguration(level: LevelEnum) {
    const {rowLength, colLength, mines} = GameUtils.boardSizeToLevelMap[level];
    // create the board
    const cellDataList = GameUtils.get2DCellData(rowLength, colLength);

    // Assign mine to it
    for (let i = 0; i < mines; ++i) {
      const {row, col} = GameUtils.getRandomCell(rowLength, colLength);

      // check if random function doesn't select the same position
      if (cellDataList[row][col].hasMine) {
        --i;
      } else {
        cellDataList[row][col] = {
          status: StatusEnum.HIDDEN,
          nearMines: -1,
          hasMine: true,
          row,
          col
        };
        // update the neighbours
        GameUtils.updateNeighboursWithMinesCount(cellDataList, rowLength, colLength, row, col);
      }

    }


    return {
      cellData: [...cellDataList],
      level,
      boardSize: {row: rowLength, col: colLength},
      mineCount: mines,
      gameStatus: GameStatusEnum.NOT_STARTED,
      hiddenCellsCount: (rowLength * colLength) - mines
    };
  }

  private static updateNeighboursWithMinesCount(cellDataList: CellData[][], rowLength: number,
                                                colLength: number, curRow: number, curCol: number): void {

    const neighbours = GameUtils.peerPosition;
    for (let i = 0; i < neighbours.length; ++i) {
      const r = curRow + neighbours[i][0];
      const c = curCol + neighbours[i][1];

      // check boundary for overflow
      if ((r >= 0 && r < rowLength) && (c >= 0 && c < colLength) && !cellDataList[r][c].hasMine) {
        cellDataList[r][c] = {
          ...cellDataList[r][c],
          nearMines: cellDataList[r][c].nearMines + 1
        };
      }
    }
  }

  public static floodNearbyCells(cellData: CellData[][], targetCell: CellData): void {

    for (let x = -1; x <= 1; x++) {
      const row = targetCell.row + x;
      if (row < 0 || row >= cellData.length) {
        continue;
      }

      for (let y = -1; y <= 1; y++) {
        const col = targetCell.col + y;
        if (col < 0 || col >= cellData[targetCell.row].length) {
          continue;
        }

        if (cellData[row][col].status !== StatusEnum.OPENED) {
          cellData[row][col] = {
            ...cellData[row][col],
            status: StatusEnum.OPENED
          };
          if (cellData[row][col].nearMines === 0) {
            GameUtils.floodNearbyCells(cellData, cellData[row][col]);
          }
        }
      }
    }
  }

  public static updateSpecificCell(cellData: CellData[][], targetCell: CellData): CellData[][] {
    return cellData.map((subArray: CellData[], rowIndex: number) => {
      if (targetCell.row === rowIndex) {
        return subArray.map((cell: CellData, colIndex: number) => {
          if (targetCell.col === colIndex) {
            return {
              ...cell,
              status: targetCell.status
            };
          }
          return cell;
        });
      }
      return subArray;
    });

  }


  public static updateCell(cellData: CellData[][], targetCell: CellData, flag?: boolean): CellData[][] {
    const newCellData = GameUtils.updateSpecificCell(cellData, targetCell);
    if (flag) {
      return newCellData;
    }
    if (targetCell.nearMines === 0) {
      const floodedCellData = GameUtils.clone2DArray(newCellData);
      GameUtils.floodNearbyCells(floodedCellData, targetCell);
      return floodedCellData;
    }
    return newCellData;
  }


  public static clone2DArray(old2DArray: any[][]): any {
    return old2DArray.map((subArray: any[]) => {
      return subArray.map((data: any) => {
        return {
          ...data
        };
      });
    });
  }

  public static showAllCell(cellData: CellData[][]): CellData[][] {
    return cellData.map((subArray: CellData[]) => {
      return subArray.map((cell: CellData) => {
        return {
          ...cell,
          status: StatusEnum.OPENED
        };
      });
    });
  }

  public static handleGameStatus(cellData: CellData[][]): { status: GameStatusEnum, hiddenCells: number } {
    const hiddenCells = cellData.map((subArray: CellData[]) =>
      subArray.reduce((accumulator: number, currentValue: CellData) =>
        currentValue.status !== StatusEnum.OPENED ? accumulator + 1 : accumulator, 0))
      .reduce((accumulator: number, currentValue: number) => accumulator + currentValue);

    if (hiddenCells === 0) {
      return {hiddenCells, status: GameStatusEnum.WON};
    }
    return {hiddenCells, status: GameStatusEnum.IN_PROGRESS};
  }

}
