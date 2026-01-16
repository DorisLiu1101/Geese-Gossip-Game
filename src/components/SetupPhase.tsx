import { useState } from 'react';
import { Users } from 'lucide-react';

interface SetupPhaseProps {
  onStart: (playerCount: number, selectedDecks: number[]) => void;
}

export function SetupPhase({ onStart }: SetupPhaseProps) {
  const [playerCount, setPlayerCount] = useState(6);
  const [selectedDecks, setSelectedDecks] = useState<number[]>([1, 2, 3]);

  const toggleGroup = (groupNum: number) => {
    const groupDecks = {
      1: [1, 2, 3, 4],
      2: [5, 6, 7, 8],
      3: [9, 10, 11, 12],
    }[groupNum] || [];

    const allSelected = groupDecks.every((deck) => selectedDecks.includes(deck));

    if (allSelected) {
      setSelectedDecks(selectedDecks.filter((d) => !groupDecks.includes(d)));
    } else {
      const newDecks = [...selectedDecks];
      groupDecks.forEach((deck) => {
        if (!newDecks.includes(deck)) {
          newDecks.push(deck);
        }
      });
      setSelectedDecks(newDecks);
    }
  };

  const isGroupSelected = (groupNum: number) => {
    const groupDecks = {
      1: [1, 2, 3, 4],
      2: [5, 6, 7, 8],
      3: [9, 10, 11, 12],
    }[groupNum] || [];

    return groupDecks.every((deck) => selectedDecks.includes(deck));
  };

  const handleStart = () => {
    if (selectedDecks.length === 0) {
      alert('請至少選擇一個牌組！');
      return;
    }
    onStart(playerCount, selectedDecks);
  };

  return (
    <div className="min-h-[100dvh] flex items-center justify-center p-4 pb-8 safe-bottom">
      <div className="wood-panel wood-border rounded-3xl shadow-2xl p-6 sm:p-10 max-w-lg w-full relative overflow-hidden nature-glow my-auto">
        <div className="absolute top-0 left-0 w-full h-2 grass-texture"></div>
        <div className="absolute bottom-0 left-0 w-full h-2 grass-texture"></div>

        <div className="paper-card rounded-2xl p-6 sm:p-8 mb-5">
          <h1 className="text-3xl sm:text-4xl font-bold text-amber-900 text-center mb-2 drop-shadow-sm">
            🦢 以鵝傳鵝
          </h1>
          <p className="text-sm sm:text-base text-amber-700 text-center tracking-wide">Geese Gossip</p>
        </div>

        <div className="space-y-5">
          <div className="paper-card rounded-xl p-4 sm:p-5">
            <label className="flex items-center gap-2 text-amber-900 font-bold mb-3 text-base sm:text-lg">
              <Users size={20} className="text-green-700" />
              玩家人數
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="5"
                max="10"
                value={playerCount}
                onChange={(e) => setPlayerCount(Number(e.target.value))}
                className="flex-1 h-3 bg-amber-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-br [&::-webkit-slider-thumb]:from-green-500 [&::-webkit-slider-thumb]:to-green-700 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white"
              />
              <span className="text-3xl sm:text-4xl font-bold text-green-700 w-12 sm:w-14 text-center drop-shadow-sm">
                {playerCount}
              </span>
            </div>
          </div>

          <div className="paper-card rounded-xl p-4 sm:p-5">
            <label className="text-amber-900 font-bold mb-3 block text-base sm:text-lg">
              選擇牌組
            </label>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {[1, 2, 3].map((groupNum) => (
                <button
                  key={groupNum}
                  onClick={() => toggleGroup(groupNum)}
                  className={`h-20 sm:h-24 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 transform active:scale-95 ${
                    isGroupSelected(groupNum)
                      ? 'warm-glow text-white scale-105 border-2 border-amber-600'
                      : 'grass-texture text-white hover:scale-105 hover:brightness-110 border-2 border-green-800'
                  }`}
                >
                  群組 {groupNum}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleStart}
            className="w-full py-4 sm:py-5 warm-glow text-white rounded-2xl font-bold text-lg sm:text-xl transition-all duration-300 active:scale-95 hover:shadow-2xl border-2 border-amber-600 touch-manipulation"
          >
            🎉 開始聚會
          </button>
        </div>
      </div>
    </div>
  );
}
