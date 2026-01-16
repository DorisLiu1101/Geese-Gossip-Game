import { CardData } from '../types';
import { Card } from './Card';
import { CheckCircle2, X } from 'lucide-react';

interface DeductionPhaseProps {
  allCards: CardData[];
  selectedCards: (CardData | null)[];
  onSelectCard: (card: CardData, slotIndex: number) => void;
  onRemoveCard: (slotIndex: number) => void;
  onReveal: () => void;
}

export function DeductionPhase({
  allCards,
  selectedCards,
  onSelectCard,
  onRemoveCard,
  onReveal,
}: DeductionPhaseProps) {
  const canReveal = selectedCards.every((card) => card !== null);

  const handleCardClick = (card: CardData) => {
    const emptySlotIndex = selectedCards.findIndex((slot) => slot === null);
    if (emptySlotIndex !== -1) {
      onSelectCard(card, emptySlotIndex);
    }
  };

  const isCardSelected = (card: CardData) => {
    return selectedCards.some(
      (selected) =>
        selected &&
        selected.deckIndex === card.deckIndex &&
        selected.cardIndex === card.cardIndex
    );
  };

  return (
    <div className="min-h-[100dvh] flex flex-col p-4 pb-6 safe-bottom safe-top">
      <div className="flex-none mb-4">
        <div className="paper-card rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 mb-4 sm:mb-6 leaf-shadow">
          <h2 className="text-2xl sm:text-3xl font-bold text-amber-900 text-center drop-shadow-sm">
            🔍 推理時間
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 w-full max-w-[380px] mx-auto mb-4 sm:mb-6">
          <div className="flex flex-col items-center gap-2 sm:gap-3 w-full">
            <div className="bg-gradient-to-br from-red-600 to-red-700 text-white px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-sm sm:text-base font-bold shadow-lg transform translate-y-2 z-10 border-2 border-red-800">
              肇事鵝
            </div>
            <div
              onClick={() => selectedCards[0] && onRemoveCard(0)}
              className={`
                relative w-full aspect-[2/3]
                rounded-xl sm:rounded-2xl border-4
                flex items-center justify-center
                transition-all duration-300
                ${selectedCards[0] ? 'border-amber-600 shadow-2xl cursor-pointer active:scale-95 leaf-shadow' : 'border-dashed border-amber-400/60 paper-card'}
              `}
            >
              {selectedCards[0] ? (
                <Card card={selectedCards[0]} className="absolute inset-0" />
              ) : (
                <div className="text-center p-2">
                  <span className="text-4xl sm:text-5xl block mb-1 sm:mb-2">?</span>
                  <span className="font-bold text-amber-800 text-xs sm:text-sm">點擊選擇</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 sm:gap-3 w-full">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-sm sm:text-base font-bold shadow-lg transform translate-y-2 z-10 border-2 border-blue-800">
              受害鵝
            </div>
            <div
              onClick={() => selectedCards[1] && onRemoveCard(1)}
              className={`
                relative w-full aspect-[2/3]
                rounded-xl sm:rounded-2xl border-4
                flex items-center justify-center
                transition-all duration-300
                ${selectedCards[1] ? 'border-amber-600 shadow-2xl cursor-pointer active:scale-95 leaf-shadow' : 'border-dashed border-blue-400/60 paper-card'}
              `}
            >
              {selectedCards[1] ? (
                <Card card={selectedCards[1]} className="absolute inset-0" />
              ) : (
                <div className="text-center p-2">
                  <span className="text-4xl sm:text-5xl block mb-1 sm:mb-2">?</span>
                  <span className="font-bold text-amber-800 text-xs sm:text-sm">點擊選擇</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={onReveal}
          disabled={!canReveal}
          className={`w-full py-4 sm:py-5 rounded-2xl font-bold text-lg sm:text-xl shadow-xl transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 border-2 touch-manipulation ${
            canReveal
              ? 'warm-glow text-white active:scale-95 border-amber-600'
              : 'bg-gradient-to-br from-gray-400 to-gray-500 text-gray-200 cursor-not-allowed border-gray-600'
          }`}
        >
          <CheckCircle2 size={24} />
          揭曉真相
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pb-2">
        <div className="paper-card rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-4 mb-3 sm:mb-4">
          <h3 className="text-lg sm:text-xl font-bold text-amber-900 text-center">
            選擇卡片
          </h3>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {allCards.map((card, index) => {
            const isSelected = isCardSelected(card);

            if (isSelected) {
              return <div key={`${card.deckIndex}-${card.cardIndex}-${index}`} className="w-full aspect-[2/3]" />;
            }

            return (
              <Card
                key={`${card.deckIndex}-${card.cardIndex}-${index}`}
                card={card}
                onClick={() => handleCardClick(card)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
