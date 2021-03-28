export interface CellData {
  status: CellData.StatusEnum;
  value: number; // mine counts in neighbouring cells
  hasMine: boolean;
  nearMines: number;
}


export namespace CellData {
  export type StatusEnum = 'HIDDEN' | 'OPENED' | 'FLAGGED';
  export const StatusEnum = {
    HIDDEN: 'HIDDEN' as StatusEnum,
    OPENED: 'OPENED' as StatusEnum,
    FLAGGED: 'FLAGGED' as StatusEnum
  };
}
