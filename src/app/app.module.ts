import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CellComponent} from './components/cell/cell.component';
import {BoardComponent} from './components/board/board.component';
import {GameComponent} from './components/game/game.component';
import {StoreModule} from '@ngrx/store';
import {gamePlayReducer} from "./state/game-play.reducer";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {EffectsModule} from "@ngrx/effects";
import {GamePlayEffects} from "./state/game-play.effects";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    CellComponent,
    BoardComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({maxAge: 25}),
    StoreModule.forFeature('game-play', gamePlayReducer),
    EffectsModule.forRoot([
      GamePlayEffects
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
