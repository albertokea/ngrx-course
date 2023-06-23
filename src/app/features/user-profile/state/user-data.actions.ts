import { User } from '@ngrx-example/models/user.model';
import { createAction, props } from '@ngrx/store';

export const enterProfilePage = createAction(
  '[Profile Page] Enter Profile Page'
);

export const loadUserProfileSuccess = createAction(
  '[UserProfile Api] Load User Profile Success',
  props<{ user: User }>()
);

export const loadUserProfileFailure = createAction(
  '[UserProfile Api] Load User Profile Failure',
  props<{ error: any }>()
);