import {Component, OnDestroy, OnInit} from '@angular/core';
import {GamePlayService} from "../../state/game-play.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";

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
          console.log('Form Change: ', newLevel);
          this.gamePlayService.initGameBoard(newLevel);
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  resetBoard() {
    this.gamePlayService.resetBoard();
  }
}
