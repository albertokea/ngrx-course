import { Injectable } from '@angular/core';
import { Actions, createEffect, concatLatestFrom, ofType } from '@ngrx/effects';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import * as UserDataActions from './user-data.actions';
import * as AuthSelectors from '@ngrx-example/shared/auth/state/auth.selectors';
import { UserProfileService } from '../services/user-profile.service';

@Injectable()
export class UserDataEffects {
  loadUserProfile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserDataActions.enterProfilePage),
      concatLatestFrom(() => this.store.select(AuthSelectors.selectUserId)),
      filter(([action, userId]) => Boolean(userId)),
      switchMap(([action, userId]) =>
        this.userProfileService.userProfile(userId!).pipe(
          map((response) =>
            UserDataActions.loadUserProfileSuccess({
              user: response,
            })
          ),
          catchError((error) =>
            of(UserDataActions.loadUserProfileFailure({ error }))
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private userProfileService: UserProfileService,
    private store: Store
  ) {}
}
