import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StatisticsService } from '@ngrx-example/features/statistics/services/statistics.service';
import { Player, PlayerLostMatches } from '@ngrx-example/models/player.model';

@Component({
  selector: 'app-player-details-container',
  templateUrl: './player-details-container.component.html',
  styleUrls: ['./player-details-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerDetailsContainerComponent {
  constructor(private statisticService: StatisticsService) {}
}
