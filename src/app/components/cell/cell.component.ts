import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CellData} from "../../model/cell-data.model";
import StatusEnum = CellData.StatusEnum;
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

  @Output() cellClicked: EventEmitter<StatusEnum> = new EventEmitter();

  constructor(private gamePlayService: GamePlayService) { }

  ngOnInit(): void {
  }

  updateStatus(): void {
    // call service to update status of cell
    if (this.cellData.status === StatusEnum.HIDDEN) {
      this.cellClicked.emit(StatusEnum.OPENED);
    }
    this.gamePlayService.updateCellStatus$(this.row, this.col, StatusEnum.OPENED)
  }

  flagTheCell(): void {
    if (this.cellData.status !== StatusEnum.OPENED) {
      this.cellClicked.emit(StatusEnum.FLAGGED);
      this.gamePlayService.updateCellStatus$(this.row, this.col, StatusEnum.FLAGGED);
    }
  }

}
