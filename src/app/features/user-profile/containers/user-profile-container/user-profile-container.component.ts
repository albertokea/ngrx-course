import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as UserDataActions from '@ngrx-example/features/user-profile/state/user-data.actions';
import * as UserDataSelectors from '@ngrx-example/features/user-profile/state/user-data.selectors';
@Component({
  selector: 'app-user-profile-container',
  templateUrl: './user-profile-container.component.html',
  styleUrls: ['./user-profile-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileContainerComponent implements OnInit {
  userProfileViewModel$  = this.store.select(UserDataSelectors.userProfileViewModel);

  constructor(private store: Store) {}
  ngOnInit(): void {
    this.store.dispatch(UserDataActions.enterProfilePage());
  }
}
