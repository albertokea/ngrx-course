import { createSelector } from '@ngrx/store';
import { adapter, playerFeature, State } from './player.reducer';

export const {
  selectLoading,
  selectPlayerState,
  selectError,
  selectEntities,
  selectIds,
} = playerFeature;

const { selectAll, selectTotal } = adapter.getSelectors();

export const selectAllPlayers = createSelector(
  selectPlayerState,
  (state: State) => selectAll(state)
);

export const selectEditPlayer = createSelector(
  selectPlayerState,
  (state: State) => {
    if(state.selectId) {
      return state.entities[state.selectId]
    }
    return null;
  }
);

export const selectActivePlayer = createSelector(
  selectPlayerState,
  (state: State) => {
    if(state.selectId) {
      return state.entities[state.selectId]
    }
    return null;
  }
);