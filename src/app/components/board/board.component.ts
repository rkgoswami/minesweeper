import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {GamePlayService} from "../../state/game-play.service";
import {CellData} from "../../model/cell-data.model";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.less']
})
export class BoardComponent implements OnInit {
  isLoading$: Observable<boolean>;
  boardSize$: Observable<{ row: number, col: number }>;
  boardData$: Observable<CellData[][]>;

  constructor(private gamePlayService: GamePlayService) {
  }

  ngOnInit(): void {
    this.isLoading$ = this.gamePlayService.isLoading$();
    this.boardSize$ = this.gamePlayService.selectBoardSize$();
    this.boardData$ = this.gamePlayService.selectBoardData$();
    this.gamePlayService.initGameBoard();
  }

}
