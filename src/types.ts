export type Role = 'head' | 'white' | 'bad';

export type GamePhase =
  | 'setup'
  | 'roleReveal'
  | 'headGooseMission'
  | 'acting'
  | 'deduction'
  | 'result';

export interface Player {
  id: number;
  name: string;
  role: Role;
}

export interface CardData {
  deckIndex: number;
  cardIndex: number;
  imageUrl: string;
}

export interface Scenario {
  text: string;
  cardA: CardData;
  cardB: CardData;
}

export interface GameState {
  phase: GamePhase;
  playerCount: number;
  selectedDecks: number[];
  customDeckUrl: string | null;
  players: Player[];
  currentRevealIndex: number;
  scenario: Scenario | null;
  selectedCards: (CardData | null)[];
  badGoosePlayerId: number | null;
  distractorCards: CardData[];
}

export interface DeckInfo {
  index: number;
  url: string;
  isCustom: boolean;
}
