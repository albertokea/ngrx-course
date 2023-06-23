import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import {
  Player,
  PlayerLostMatches,
  PlayerOwnGoals,
} from '@ngrx-example/models/player.model';
import { StatisticsEnum } from '../../models/statistics.enum';

@Component({
  selector: 'app-players-table',
  templateUrl: './players-table.component.html',
  styleUrls: ['./players-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayersTableComponent {
  @Input()
  data!: Player[];
  @Input() statisticName: string = '';
  @Input() tableType!: StatisticsEnum;
  @Output() selectedPlayer = new EventEmitter<Player>();

  statisticsEnum = StatisticsEnum;

  playerSelected(player: Player){
    this.selectedPlayer.emit(player);
  }
}
