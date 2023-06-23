import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerDetailsContainerComponent } from './containers/player-details-container/player-details-container.component';
import { PlayerDetailsCardComponent } from './components/player-details-card/player-details-card.component';
import { RouterModule } from '@angular/router';
import { NgOptimizedImage } from '@angular/common'


@NgModule({
  declarations: [
    PlayerDetailsContainerComponent,
    PlayerDetailsCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: ':id',
      component: PlayerDetailsContainerComponent
    }])
  ]
})
export class PlayersModule { }
