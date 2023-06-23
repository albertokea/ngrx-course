import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LostMatchesContainerComponent } from './containers/lost-matches-container/lost-matches-container.component';
import { PlayersTableComponent } from './components/players-table/players-table.component';
import { LostMatchesFormComponent } from './components/lost-matches-form/lost-matches-form.component';
import { StoreModule } from '@ngrx/store';
import * as fromPlayer from './state/player.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PlayerEffects } from './state/player.effects';

@NgModule({
  declarations: [
    LostMatchesContainerComponent,
    PlayersTableComponent,
    LostMatchesFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: 'lost',
        component: LostMatchesContainerComponent,
      },
    ]),
    StoreModule.forFeature(fromPlayer.playerFeature.name, fromPlayer.playerFeature.reducer),
    EffectsModule.forFeature([PlayerEffects]),
  ],
})
export class StatisticsModule {}
