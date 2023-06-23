
export interface Player {
  id: number;
  name: string;
  playerName: string;
  birthDate: string;
  image: string;
  lostMatches: number;
  ownGoals: number;
}

export type PlayerLostMatches = Omit<Player, 'ownGoals'>;
export type PlayerOwnGoals = Omit<Player, 'lostMatches'>;
