import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from '@ngrx-example/models/user.model';


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoComponent {

  @Input() user: User | null = null;

}
