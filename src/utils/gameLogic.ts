import { CardData, DeckInfo, Player, Role, Scenario } from '../types';

const DECK_URLS: Record<number, string> = {
  1: '/Deck01.webp',
  2: '/Deck02.webp',
  3: '/Deck03.webp',
  4: '/Deck04.webp',
  5: '/Deck05.webp',
  6: '/Deck06.webp',
  7: '/Deck07.webp',
  8: '/Deck08.webp',
  9: '/Deck09.webp',
  10: '/Deck10.webp',
  11: '/Deck11.webp',
  12: '/Deck12.webp',
};

export function getDeckInfo(selectedDecks: number[]): DeckInfo[] {
  return selectedDecks.map((index) => ({
    index,
    url: DECK_URLS[index],
  }));
}

export function assignRoles(playerCount: number, hasBadGoose: boolean = true): Player[] {
  const players: Player[] = [];
  const roles: Role[] = ['head'];

  if (hasBadGoose) {
    roles.push('bad');
    for (let i = 2; i < playerCount; i++) {
      roles.push('white');
    }
  } else {
    for (let i = 1; i < playerCount; i++) {
      roles.push('white');
    }
  }

  const shuffledRoles = [...roles].sort(() => Math.random() - 0.5);

  for (let i = 0; i < playerCount; i++) {
    players.push({
      id: i + 1,
      name: `玩家 ${i + 1}`,
      role: shuffledRoles[i],
    });
  }

  return players;
}

export function generateScenario(
  scenarioTexts: string[],
  decks: DeckInfo[]
): Scenario {
  const randomText =
    scenarioTexts[Math.floor(Math.random() * scenarioTexts.length)];

  const randomDeck1 = decks[Math.floor(Math.random() * decks.length)];
  let randomDeck2 = decks[Math.floor(Math.random() * decks.length)];

  while (decks.length > 1 && randomDeck2.index === randomDeck1.index) {
    randomDeck2 = decks[Math.floor(Math.random() * decks.length)];
  }

  const cardA: CardData = {
    deckIndex: randomDeck1.index,
    cardIndex: Math.floor(Math.random() * 25),
    imageUrl: randomDeck1.url,
  };

  const cardB: CardData = {
    deckIndex: randomDeck2.index,
    cardIndex: Math.floor(Math.random() * 25),
    imageUrl: randomDeck2.url,
  };

  return {
    text: randomText,
    cardA,
    cardB,
  };
}

export function generateDistractors(
  correctCards: CardData[],
  decks: DeckInfo[],
  count: number = 7
): CardData[] {
  const distractors: CardData[] = [];
  const usedKeys = new Set(
    correctCards.map((c) => `${c.deckIndex}-${c.cardIndex}`)
  );

  while (distractors.length < count) {
    const randomDeck = decks[Math.floor(Math.random() * decks.length)];
    const randomCardIndex = Math.floor(Math.random() * 25);
    const key = `${randomDeck.index}-${randomCardIndex}`;

    if (!usedKeys.has(key)) {
      distractors.push({
        deckIndex: randomDeck.index,
        cardIndex: randomCardIndex,
        imageUrl: randomDeck.url,
      });
      usedKeys.add(key);
    }
  }

  return distractors;
}

export function checkAnswer(
  selected: (CardData | null)[],
  correct: CardData[]
): boolean {
  if (selected.some((s) => s === null)) return false;

  const [s1, s2] = selected as CardData[];
  const [c1, c2] = correct;

  return (
    (s1.deckIndex === c1.deckIndex &&
      s1.cardIndex === c1.cardIndex &&
      s2.deckIndex === c2.deckIndex &&
      s2.cardIndex === c2.cardIndex) ||
    (s1.deckIndex === c2.deckIndex &&
      s1.cardIndex === c2.cardIndex &&
      s2.deckIndex === c1.deckIndex &&
      s2.cardIndex === c1.cardIndex)
  );
}
