import {Component, Input, OnInit} from '@angular/core';
import {CellData, StatusEnum} from "../../model/cell-data.model";
import {GamePlayService} from "../../state/game-play.service";

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.less']
})
export class CellComponent implements OnInit {

  CellStatus = StatusEnum;

  @Input() row: number;
  @Input() col: number;
  @Input() cellData: CellData;

  constructor(private gamePlayService: GamePlayService) {
  }

  ngOnInit(): void {
  }

  updateStatus(): void {
    // call service to update status of cell
    if (this.cellData.status === StatusEnum.HIDDEN) {
      this.gamePlayService.updateCellStatus({
        ...this.cellData,
        status: StatusEnum.OPENED
      });
    }
  }

  flagTheCell(): void {
    if (this.cellData.status !== StatusEnum.OPENED) {
      this.gamePlayService.updateCellStatus({
        ...this.cellData,
        status: StatusEnum.FLAGGED
      });
    }
  }

}
