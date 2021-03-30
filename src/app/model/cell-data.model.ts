export interface CellData {
  status: StatusEnum;
  hasMine: boolean;
  nearMines: number;
  row: number;
  col: number;
}


// export namespace CellData {
//   export type StatusEnum = 'HIDDEN' | 'OPENED' | 'FLAGGED';
//   export const StatusEnum = {
//     HIDDEN: 'HIDDEN' as StatusEnum,
//     OPENED: 'OPENED' as StatusEnum,
//     FLAGGED: 'FLAGGED' as StatusEnum
//   };
// }

export enum StatusEnum {
  HIDDEN = 'HIDDEN',
  OPENED = 'OPENED',
  FLAGGED = 'FLAGGED'
}
