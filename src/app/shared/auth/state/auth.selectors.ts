import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducer';

export const selectAuthState = createFeatureSelector<fromAuth.State>(
  fromAuth.authFeatureKey
);

export const selectError = createSelector(
  selectAuthState,
  (state) => state.error
);

export const selectUserId = createSelector(
  selectAuthState,
  (state) => state.id
);