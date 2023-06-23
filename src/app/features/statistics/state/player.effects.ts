import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as PlayerActions from './player.actions';
import { StatisticsService } from '../services/statistics.service';

@Injectable()
export class PlayerEffects {
  loadLostMatchesPlayers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PlayerActions.enterLostMatchesPage),
      concatMap(() =>
        this.statisticsService.lostMatches().pipe(
          map((response) =>
            PlayerActions.loadPlayersLostMatchesSuccess({
              players: response.map((player) => ({ ...player, ownGoals: 0 })),
            })
          ),
          catchError((error) =>
            of(PlayerActions.loadPlayersLostMatchesFailure({ error }))
          )
        )
      )
    );
  });

  addPlayer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PlayerActions.playerLostMatchesAdded),
      concatMap((action) =>
        this.statisticsService.addLostMatchesPlayer(action.player).pipe(
          map((response) =>
            PlayerActions.addPlayerLostMatchesSuccess({
              player: response,
            })
          ),
          catchError((error) =>
            of(PlayerActions.addPlayerLostMatchesFailure({ error }))
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private statisticsService: StatisticsService
  ) {}
}
