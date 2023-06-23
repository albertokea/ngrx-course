import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PlayerLostMatches } from '@ngrx-example/models/player.model';
import { Store } from '@ngrx/store';
import { StatisticsEnum } from '../../models/statistics.enum';
import * as PlayerStatisticsAcions from '@ngrx-example/features/statistics/state/player.actions';
import * as PlayerStatisticsSelectors from '@ngrx-example/features/statistics/state/player.selectors';

@Component({
  selector: 'app-lost-matches-container',
  templateUrl: './lost-matches-container.component.html',
  styleUrls: ['./lost-matches-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LostMatchesContainerComponent implements OnInit{
  statisticsEnum = StatisticsEnum;
  players$ = this.store.select(PlayerStatisticsSelectors.selectAllPlayers);
  
  constructor(private store: Store){}
 
  ngOnInit(): void {
    this.store.dispatch(PlayerStatisticsAcions.enterLostMatchesPage());
  }

  addPlayer(player: PlayerLostMatches) {
   this.store.dispatch(PlayerStatisticsAcions.playerLostMatchesAdded({player}));
  }
}
