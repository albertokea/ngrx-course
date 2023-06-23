import { Player, PlayerLostMatches } from '@ngrx-example/models/player.model';
import { createAction, props } from '@ngrx/store';

export const enterLostMatchesPage = createAction(
  '[Lost Matches Page] Enter Lost Matches Page Players'
);

export const loadPlayersLostMatchesSuccess = createAction(
  '[Statistics Api] Load Lost Matches Success',
  props<{ players: Player[] }>()
);

export const loadPlayersLostMatchesFailure = createAction(
  '[Statistics Page] Load  Lost Matches Failure',
  props<{ error: any }>()
);

export const playerLostMatchesAdded = createAction(
  '[Lost Matches Page] Player Added',
  props<{ player: PlayerLostMatches }>()
);

export const addPlayerLostMatchesSuccess = createAction(
  '[Statistics Api] Add player Success',
  props<{ player: PlayerLostMatches }>()
);

export const addPlayerLostMatchesFailure = createAction(
  '[Statistics Page] Add player Failure',
  props<{ error: any }>()
);
