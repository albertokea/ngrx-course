import { Player } from '@ngrx-example/models/player.model';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';
import * as PlayerActions from './player.actions';


export interface State extends EntityState<Player> {
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<Player> = createEntityAdapter<Player>({
  selectId: (player: Player) => player.id,
 // sortComparer: (a: Player, b: Player) => b.lostMatches - a.lostMatches,
});

export const initialState: State = adapter.getInitialState({
  loading: false,
  error: null,
});

export const playerFeature = createFeature({
  name: 'player',
  reducer: createReducer(
    initialState,
    on(PlayerActions.enterLostMatchesPage, (state) => ({
      ...state,
      loading: true,
    })),
    on(PlayerActions.loadPlayersLostMatchesSuccess, (state, action) =>
      adapter.setAll(action.players, { ...state, loading: false })
    ),
    on(PlayerActions.loadPlayersLostMatchesFailure, (state, action) => ({
      ...state,
      loading: false,
      error: action.error,
    })),
    on(PlayerActions.playerLostMatchesAdded, (state) => ({
      ...state,
      loading: true
    })),
    on(PlayerActions.addPlayerLostMatchesSuccess, (state, action) =>
      adapter.addOne(({...action.player, ownGoals: 0}), { ...state, loading: false })
    ),
    on(PlayerActions.addPlayerLostMatchesFailure, (state, action) => ({
      ...state,
      loading: false,
      error: action.error,
    }))
  ),
});
