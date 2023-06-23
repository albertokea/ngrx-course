import { User } from '@ngrx-example/models/user.model';
import { Action, createReducer, on } from '@ngrx/store';
import * as UserDataActions from './user-data.actions';

export const userDataFeatureKey = 'userData';

export interface State {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export const initialState: State = {
  user: null,
  loading: false,
  error: null
};

export const reducer = createReducer(
  initialState,
  on(UserDataActions.enterProfilePage, (state) => ({...state, loading: true})),
  on(UserDataActions.loadUserProfileSuccess, (state, {user}) => ({...state, user, loading: false})),
  on(UserDataActions.loadUserProfileFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);
