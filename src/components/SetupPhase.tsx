import { useState } from 'react';
import { Users } from 'lucide-react';

interface SetupPhaseProps {
  onStart: (playerCount: number, selectedDecks: number[]) => void;
}

export function SetupPhase({ onStart }: SetupPhaseProps) {
  const [playerCount, setPlayerCount] = useState(6);
  const [selectedDecks, setSelectedDecks] = useState<number[]>([1, 2, 3]);

  const toggleDeck = (deckNum: number) => {
    if (selectedDecks.includes(deckNum)) {
      setSelectedDecks(selectedDecks.filter((d) => d !== deckNum));
    } else {
      setSelectedDecks([...selectedDecks, deckNum]);
    }
  };

  const handleStart = () => {
    if (selectedDecks.length === 0) {
      alert('請至少選擇一個牌組！');
      return;
    }
    onStart(playerCount, selectedDecks);
  };

  return (
    <div
      className="min-h-[100dvh] flex items-center justify-center p-4"
      style={{
        background: 'radial-gradient(circle at center, #5D4037 0%, #3E2723 100%)',
      }}
    >
      <div className="bg-[#FFF8E1] border-2 border-[#D7CCC8] rounded-xl shadow-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-[#3E2723] text-center mb-2">
          🦢 以鵝傳鵝
        </h1>
        <p className="text-sm text-[#5D4037] text-center mb-6">Geese Gossip</p>

        <div className="space-y-6">
          <div>
            <label className="flex items-center gap-2 text-[#3E2723] font-semibold mb-2">
              <Users size={20} />
              玩家人數
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="5"
                max="10"
                value={playerCount}
                onChange={(e) => setPlayerCount(Number(e.target.value))}
                className="flex-1"
              />
              <span className="text-2xl font-bold text-[#3E2723] w-12 text-center">
                {playerCount}
              </span>
            </div>
          </div>

          <div>
            <label className="text-[#3E2723] font-semibold mb-3 block">
              選擇牌組
            </label>
            <div className="space-y-3">
              <div>
                <div className="text-xs text-[#5D4037] mb-1 font-medium">群組 1</div>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((num) => (
                    <button
                      key={num}
                      onClick={() => toggleDeck(num)}
                      className={`h-12 rounded-lg border-2 font-bold text-sm transition-all ${
                        selectedDecks.includes(num)
                          ? 'bg-[#FF9800] border-[#F57C00] text-white shadow-lg scale-105'
                          : 'bg-[#D7CCC8] border-[#BCAAA4] text-[#5D4037] hover:bg-[#C5B8B1]'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs text-[#5D4037] mb-1 font-medium">群組 2</div>
                <div className="grid grid-cols-4 gap-2">
                  {[5, 6, 7, 8].map((num) => (
                    <button
                      key={num}
                      onClick={() => toggleDeck(num)}
                      className={`h-12 rounded-lg border-2 font-bold text-sm transition-all ${
                        selectedDecks.includes(num)
                          ? 'bg-[#FF9800] border-[#F57C00] text-white shadow-lg scale-105'
                          : 'bg-[#D7CCC8] border-[#BCAAA4] text-[#5D4037] hover:bg-[#C5B8B1]'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs text-[#5D4037] mb-1 font-medium">群組 3</div>
                <div className="grid grid-cols-4 gap-2">
                  {[9, 10, 11, 12].map((num) => (
                    <button
                      key={num}
                      onClick={() => toggleDeck(num)}
                      className={`h-12 rounded-lg border-2 font-bold text-sm transition-all ${
                        selectedDecks.includes(num)
                          ? 'bg-[#FF9800] border-[#F57C00] text-white shadow-lg scale-105'
                          : 'bg-[#D7CCC8] border-[#BCAAA4] text-[#5D4037] hover:bg-[#C5B8B1]'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleStart}
            className="w-full py-4 bg-[#FF9800] hover:bg-[#F57C00] text-white rounded-xl font-bold text-lg shadow-lg transition-all hover:scale-105"
          >
            🎉 開始聚會
          </button>
        </div>
      </div>
    </div>
  );
}
