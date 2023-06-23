import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUserData from './user-data.reducer';

export const selectUserDataState = createFeatureSelector<fromUserData.State>(
  fromUserData.userDataFeatureKey
);

export const selectUserData = createSelector(
  selectUserDataState,
  (state) => state.user
);

export const selectError = createSelector(
  selectUserDataState,
  (state) => state.error
);

export const selectLoading = createSelector(
  selectUserDataState,
  (state) => state.loading
);


export const userProfileViewModel = createSelector(
  selectUserData,
  selectError,
  selectLoading,
  (userData, error, isLoading) => ({ userData, error, isLoading })
);
