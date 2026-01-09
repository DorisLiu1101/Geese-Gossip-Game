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
  const availableCards = allCards.filter(
    (card) =>
      !selectedCards.some(
        (selected) =>
          selected &&
          selected.deckIndex === card.deckIndex &&
          selected.cardIndex === card.cardIndex
      )
  );

  const canReveal = selectedCards.every((card) => card !== null);

  const handleCardClick = (card: CardData) => {
    const emptySlotIndex = selectedCards.findIndex((slot) => slot === null);
    if (emptySlotIndex !== -1) {
      onSelectCard(card, emptySlotIndex);
    }
  };

  return (
    <div
      className="min-h-[100dvh] flex flex-col p-4"
      style={{
        background: 'radial-gradient(circle at center, #5D4037 0%, #3E2723 100%)',
      }}
    >
      <div className="flex-none mb-4">
        <h2 className="text-2xl font-bold text-[#FFF8E1] text-center mb-4">
          🔍 推理時間
        </h2>

        <div className="grid grid-cols-2 gap-4 w-full max-w-[340px] mx-auto mb-6">
          <div className="flex flex-col items-center gap-2 w-full">
            <div className="bg-red-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-md transform translate-y-2 z-10">
              肇事鵝
            </div>
            <div
              onClick={() => selectedCards[0] && onRemoveCard(0)}
              className={`
                relative w-full aspect-[2/3]
                rounded-xl border-2 border-dashed
                flex items-center justify-center
                transition-all duration-200
                ${selectedCards[0] ? 'border-none shadow-xl cursor-pointer hover:opacity-90' : 'border-[#FF9800]/50 bg-black/10'}
              `}
            >
              {selectedCards[0] ? (
                <Card card={selectedCards[0]} className="absolute inset-0" />
              ) : (
                <div className="text-center p-2 opacity-50">
                  <span className="text-4xl block mb-1">?</span>
                  <span className="font-bold text-[#FFF8E1] text-xs">點擊選擇</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 w-full">
            <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-md transform translate-y-2 z-10">
              受害鵝
            </div>
            <div
              onClick={() => selectedCards[1] && onRemoveCard(1)}
              className={`
                relative w-full aspect-[2/3]
                rounded-xl border-2 border-dashed
                flex items-center justify-center
                transition-all duration-200
                ${selectedCards[1] ? 'border-none shadow-xl cursor-pointer hover:opacity-90' : 'border-[#2979FF]/50 bg-black/10'}
              `}
            >
              {selectedCards[1] ? (
                <Card card={selectedCards[1]} className="absolute inset-0" />
              ) : (
                <div className="text-center p-2 opacity-50">
                  <span className="text-4xl block mb-1">?</span>
                  <span className="font-bold text-[#FFF8E1] text-xs">點擊選擇</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={onReveal}
          disabled={!canReveal}
          className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2 ${
            canReveal
              ? 'bg-[#FF9800] hover:bg-[#F57C00] text-white hover:scale-105'
              : 'bg-[#9E9E9E] text-[#BDBDBD] cursor-not-allowed'
          }`}
        >
          <CheckCircle2 size={24} />
          揭曉真相
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pb-4">
        <h3 className="text-lg font-semibold text-[#FFF8E1] mb-3">
          選擇卡片
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {availableCards.map((card, index) => (
            <Card
              key={`${card.deckIndex}-${card.cardIndex}-${index}`}
              card={card}
              onClick={() => handleCardClick(card)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
