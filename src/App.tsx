import { useState, useEffect } from 'react';
import { GameState, CardData, DeckInfo } from './types';
import { SetupPhase } from './components/SetupPhase';
import { RoleRevealPhase } from './components/RoleRevealPhase';
import { HeadGooseMission } from './components/HeadGooseMission';
import { ActingPhase } from './components/ActingPhase';
import { DeductionPhase } from './components/DeductionPhase';
import { ResultPhase } from './components/ResultPhase';
import {
  assignRoles,
  generateScenario,
  generateDistractors,
  getDeckInfo,
  checkAnswer,
} from './utils/gameLogic';
import { fetchScenarios } from './utils/csvFetcher';

function App() {
  const [scenarios, setScenarios] = useState<string[]>([]);
  const [gameState, setGameState] = useState<GameState>({
    phase: 'setup',
    playerCount: 6,
    selectedDecks: [],
    players: [],
    currentRevealIndex: 0,
    scenario: null,
    selectedCards: [null, null],
    badGoosePlayerId: null,
    distractorCards: [],
  });

  useEffect(() => {
    fetchScenarios().then(setScenarios);
  }, []);

  const handleStartGame = (
    playerCount: number,
    selectedDecks: number[]
  ) => {
    const players = assignRoles(playerCount);
    setGameState({
      ...gameState,
      phase: 'roleReveal',
      playerCount,
      selectedDecks,
      players,
      currentRevealIndex: 0,
      badGoosePlayerId: players.find((p) => p.role === 'bad')?.id || null,
    });
  };

  const handleNextReveal = () => {
    setGameState({
      ...gameState,
      currentRevealIndex: gameState.currentRevealIndex + 1,
    });
  };

  const handleCompleteReveal = () => {
    setGameState({
      ...gameState,
      phase: 'headGooseMission',
    });
  };

  const handleDrawScenario = () => {
    const decks: DeckInfo[] = getDeckInfo(gameState.selectedDecks);
    const scenario = generateScenario(scenarios, decks);
    const distractors = generateDistractors([scenario.cardA, scenario.cardB], decks, 7);

    const allCards = [scenario.cardA, scenario.cardB, ...distractors].sort(
      () => Math.random() - 0.5
    );

    setGameState({
      ...gameState,
      scenario,
      distractorCards: allCards,
    });
  };

  const handleStartActing = () => {
    setGameState({
      ...gameState,
      phase: 'acting',
    });
  };

  const handleEndActing = () => {
    setGameState({
      ...gameState,
      phase: 'deduction',
      selectedCards: [null, null],
    });
  };

  const handleSelectCard = (card: CardData, slotIndex: number) => {
    const newSelectedCards = [...gameState.selectedCards];
    newSelectedCards[slotIndex] = card;
    setGameState({
      ...gameState,
      selectedCards: newSelectedCards,
    });
  };

  const handleRemoveCard = (slotIndex: number) => {
    const newSelectedCards = [...gameState.selectedCards];
    newSelectedCards[slotIndex] = null;
    setGameState({
      ...gameState,
      selectedCards: newSelectedCards,
    });
  };

  const handleReveal = () => {
    if (!gameState.scenario) return;

    const isCorrect = checkAnswer(gameState.selectedCards, [
      gameState.scenario.cardA,
      gameState.scenario.cardB,
    ]);

    setGameState({
      ...gameState,
      phase: 'result',
    });

    if (!isCorrect) {
      setTimeout(() => {
        setGameState((prev) => ({
          ...prev,
          phase: 'result',
        }));
      }, 100);
    }
  };

  const handleTryAgain = () => {
    setGameState({
      ...gameState,
      phase: 'deduction',
      selectedCards: [null, null],
    });
  };

  const handleGiveUp = () => {
    if (!gameState.scenario) return;

    setGameState({
      ...gameState,
      selectedCards: [gameState.scenario.cardA, gameState.scenario.cardB],
      phase: 'result',
    });
  };

  const handleNewGame = () => {
    setGameState({
      phase: 'setup',
      playerCount: 6,
      selectedDecks: [],
      players: [],
      currentRevealIndex: 0,
      scenario: null,
      selectedCards: [null, null],
      badGoosePlayerId: null,
      distractorCards: [],
    });
  };

  const isCorrectAnswer = gameState.scenario
    ? checkAnswer(gameState.selectedCards, [
        gameState.scenario.cardA,
        gameState.scenario.cardB,
      ])
    : false;

  return (
    <div className="min-h-screen bg-[#F0F2F5]">
      {gameState.phase === 'setup' && (
        <SetupPhase onStart={handleStartGame} />
      )}

      {gameState.phase === 'roleReveal' && (
        <RoleRevealPhase
          players={gameState.players}
          currentIndex={gameState.currentRevealIndex}
          onNext={handleNextReveal}
          onComplete={handleCompleteReveal}
        />
      )}

      {gameState.phase === 'headGooseMission' && (
        <HeadGooseMission
          scenario={gameState.scenario}
          onDrawScenario={handleDrawScenario}
          onStartActing={handleStartActing}
        />
      )}

      {gameState.phase === 'acting' && gameState.scenario && (
        <ActingPhase scenario={gameState.scenario} onEndActing={handleEndActing} />
      )}

      {gameState.phase === 'deduction' && (
        <DeductionPhase
          allCards={gameState.distractorCards}
          selectedCards={gameState.selectedCards}
          onSelectCard={handleSelectCard}
          onRemoveCard={handleRemoveCard}
          onReveal={handleReveal}
        />
      )}

      {gameState.phase === 'result' && gameState.scenario && (
        <ResultPhase
          isCorrect={isCorrectAnswer}
          scenario={gameState.scenario}
          players={gameState.players}
          onTryAgain={handleTryAgain}
          onGiveUp={handleGiveUp}
          onNewGame={handleNewGame}
        />
      )}
    </div>
  );
}

export default App;
