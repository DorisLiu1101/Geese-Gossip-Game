import { CardData } from '../types';
import { Card } from './Card';
import { CheckCircle2 } from 'lucide-react';

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
    <div className="min-h-[100dvh] flex flex-col p-6 safe-bottom safe-top">
      <div className="max-w-[430px] w-full mx-auto flex flex-col h-full">
        <div className="flex-none mb-6">
          <div className="chat-bubble mb-6">
            <h2 className="text-3xl font-black text-gray-800">
              推理時間
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex flex-col items-center">
              <div className="mb-[-10px] z-10">
                <div className="badge-red text-xs">
                  肇事鵝
                </div>
              </div>
              <div
                onClick={() => selectedCards[0] && onRemoveCard(0)}
                className={`
                  relative w-full aspect-[2/3] rounded-2xl border-4 flex items-center justify-center transition-all
                  ${selectedCards[0] ? 'border-[#FF9800] bg-orange-50 cursor-pointer active:scale-95 shadow-lg' : 'border-dashed border-gray-300 bg-gray-50'}
                `}
              >
                {selectedCards[0] ? (
                  <Card card={selectedCards[0]} className="absolute inset-0" />
                ) : (
                  <div className="text-center">
                    <span className="text-5xl block mb-2">?</span>
                    <span className="font-bold text-gray-500 text-xs">點擊選擇</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="mb-[-10px] z-10">
                <div className="badge-blue text-xs">
                  受害鵝
                </div>
              </div>
              <div
                onClick={() => selectedCards[1] && onRemoveCard(1)}
                className={`
                  relative w-full aspect-[2/3] rounded-2xl border-4 flex items-center justify-center transition-all
                  ${selectedCards[1] ? 'border-[#FF9800] bg-orange-50 cursor-pointer active:scale-95 shadow-lg' : 'border-dashed border-gray-300 bg-gray-50'}
                `}
              >
                {selectedCards[1] ? (
                  <Card card={selectedCards[1]} className="absolute inset-0" />
                ) : (
                  <div className="text-center">
                    <span className="text-5xl block mb-2">?</span>
                    <span className="font-bold text-gray-500 text-xs">點擊選擇</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={onReveal}
            disabled={!canReveal}
            className={`w-full flex items-center justify-center gap-3 text-xl ${
              canReveal
                ? 'btn-primary'
                : 'bg-gray-300 text-gray-400 rounded-2xl font-bold min-h-[56px] cursor-not-allowed'
            }`}
          >
            <CheckCircle2 size={24} />
            揭曉真相
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="chat-bubble mb-4">
            <h3 className="text-lg font-bold text-gray-800">
              選擇卡片
            </h3>
          </div>
          <div className="grid grid-cols-3 gap-2">
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
    </div>
  );
}
