import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Player } from '@ngrx-example/models/player.model';


@Component({
  selector: 'app-player-details-card',
  templateUrl: './player-details-card.component.html',
  styleUrls: ['./player-details-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerDetailsCardComponent {

  @Input()
  player!: Player;

}
