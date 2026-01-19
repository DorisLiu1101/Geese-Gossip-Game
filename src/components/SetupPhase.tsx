import { useState } from 'react';

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
    <div className="min-h-[100dvh] flex items-center justify-center p-6 safe-bottom">
      <div className="max-w-[430px] w-full mx-auto space-y-6 my-auto">
        <img
          src="/Mark.webp"
          alt="Geese Gossip Logo"
          className="w-[320px] max-w-none mx-auto mb-[-40px] relative z-20 drop-shadow-[0_10px_20px_rgba(0,0,0,0.25)]"
        />

        <div className="card-container">
          <div className="flex items-center justify-between gap-6">
            <input
              type="range"
              min="5"
              max="10"
              value={playerCount}
              onChange={(e) => setPlayerCount(Number(e.target.value))}
              className="flex-grow w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#FF9800] [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-3 [&::-webkit-slider-thumb]:border-white"
            />
            <span className="text-4xl font-black text-[#FF9800] whitespace-nowrap min-w-[80px] text-right">
              {playerCount} 人
            </span>
          </div>
        </div>

        <div className="card-container">
          <label className="text-gray-800 font-bold mb-4 block text-lg">
            選擇牌組
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map((groupNum) => (
              <button
                key={groupNum}
                onClick={() => toggleGroup(groupNum)}
                className={`h-24 rounded-2xl font-bold text-lg transition-all shadow-md ${
                  isGroupSelected(groupNum)
                    ? 'group-btn active'
                    : 'group-btn'
                }`}
              >
                群組 {groupNum}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleStart}
          className="w-full btn-primary flex items-center justify-center gap-2 text-xl"
        >
          開始聚會
        </button>
      </div>
    </div>
  );
}
