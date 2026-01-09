import { useState } from 'react';
import { Users, Plus } from 'lucide-react';

interface SetupPhaseProps {
  onStart: (playerCount: number, selectedDecks: number[], customDeckUrl: string | null) => void;
}

export function SetupPhase({ onStart }: SetupPhaseProps) {
  const [playerCount, setPlayerCount] = useState(6);
  const [selectedDecks, setSelectedDecks] = useState<number[]>([1, 2, 3]);
  const [customDeckInput, setCustomDeckInput] = useState('');
  const [customDeckUrl, setCustomDeckUrl] = useState<string | null>(null);

  const toggleDeck = (deckNum: number) => {
    if (selectedDecks.includes(deckNum)) {
      setSelectedDecks(selectedDecks.filter((d) => d !== deckNum));
    } else {
      setSelectedDecks([...selectedDecks, deckNum]);
    }
  };

  const handleMountCustomDeck = () => {
    if (customDeckInput.trim()) {
      setCustomDeckUrl(customDeckInput.trim());
    }
  };

  const handleStart = () => {
    if (selectedDecks.length === 0 && !customDeckUrl) {
      alert('請至少選擇一個牌組！');
      return;
    }
    onStart(playerCount, selectedDecks, customDeckUrl);
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
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <button
                  key={num}
                  onClick={() => toggleDeck(num)}
                  className={`aspect-square rounded-lg border-2 font-bold text-lg transition-all ${
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
            <label className="text-[#3E2723] font-semibold mb-2 block">
              自訂牌組 9
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customDeckInput}
                onChange={(e) => setCustomDeckInput(e.target.value)}
                placeholder="輸入圖片網址..."
                className="flex-1 px-3 py-2 rounded-lg border-2 border-[#D7CCC8] bg-white text-[#3E2723] focus:outline-none focus:border-[#FF9800]"
              />
              <button
                onClick={handleMountCustomDeck}
                className="px-4 py-2 bg-[#66BB6A] hover:bg-[#4CAF50] text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                <Plus size={18} />
                掛載
              </button>
            </div>
            {customDeckUrl && (
              <p className="text-sm text-[#66BB6A] mt-2">✓ 牌組 9 已掛載</p>
            )}
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
