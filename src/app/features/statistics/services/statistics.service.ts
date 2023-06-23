import { Injectable } from '@angular/core';
import { PlayerLostMatches } from '@ngrx-example/models/player.model';
import { Observable } from 'rxjs';
import { CommonHttpService } from 'src/app/core/services/common-http.service';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  constructor(private http: CommonHttpService) {}

  lostMatches(): Observable<PlayerLostMatches[]> {
    return this.http.get<PlayerLostMatches[]>('lost');
  }

  addLostMatchesPlayer(
    player: PlayerLostMatches
  ): Observable<PlayerLostMatches> {
    return this.http.post<PlayerLostMatches>('lost', player);
  }
}
