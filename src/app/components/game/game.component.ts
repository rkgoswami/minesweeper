import {Component, OnDestroy, OnInit} from '@angular/core';
import {GamePlayService} from "../../state/game-play.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";
import {GamePlay} from "../../state/game-play.state";
import GameStatusEnum = GamePlay.GameStatusEnum;

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.less']
})
export class GameComponent implements OnInit, OnDestroy {

  levelForm: FormGroup;

  readonly levels = ['BEGINNER', 'INTERMEDIATE', 'EXPERT'];
  private subscription: Subscription = new Subscription();


  constructor(private gamePlayService: GamePlayService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.levelForm = this.formBuilder.group({
      level: ['']
    });
    this.subscription.add(
      this.levelForm.controls.level.valueChanges
        .subscribe((newLevel) => {
          this.gamePlayService.initGameBoard(newLevel);
        })
    );
    this.gamePlayService.selectGameStatus$().subscribe(
      (status: GameStatusEnum) => {
        if (status === GameStatusEnum.LOST || status === GameStatusEnum.WON) {
          const greeting = status === GameStatusEnum.WON ? 'Congrats, ' : 'Sorry, ';
          setTimeout(() => alert(greeting + "You have " + status + " the game."), 1000);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  resetBoard() {
    this.gamePlayService.resetBoard();
  }
}
