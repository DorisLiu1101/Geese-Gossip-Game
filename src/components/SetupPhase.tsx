import { useState } from 'react';

// 定義全牌組 ID 列表 (1 到 12)
// 這裡我們直接產生一個 [1, 2, ..., 12] 的陣列
const ALL_DECKS = Array.from({ length: 12 }, (_, i) => i + 1);

interface SetupPhaseProps {
  onStart: (playerCount: number, selectedDecks: number[], hasBadGoose: boolean) => void;
}

export function SetupPhase({ onStart }: SetupPhaseProps) {
  const [playerCount, setPlayerCount] = useState(6);
  // 移除 selectedDecks 狀態，因為我們預設就是全選
  const [hasBadGoose, setHasBadGoose] = useState(true);

  // 移除 toggleGroup 和 isGroupSelected 函式，因為不再需要手動選擇

  const handleStart = () => {
    // 直接將 ALL_DECKS 傳入 onStart
    onStart(playerCount, ALL_DECKS, hasBadGoose);
  };

  return (
    <div className="min-h-[100dvh] flex items-center justify-center p-6 safe-bottom">
      <div className="max-w-[430px] w-full mx-auto space-y-6 my-auto">
        {/* LOGO 保持不變 */}
        <img
          src="/Mark.webp"
          alt="Geese Gossip Logo"
          className="w-[320px] max-w-none mx-auto mb-[-40px] relative z-20 drop-shadow-[0_10px_20px_rgba(0,0,0,0.25)]"
        />

        {/* 設置區塊：人數與惡鵝 */}
        <div className="card-container">
          {/* 人數滑桿 */}
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
              {playerCount}P
            </span>
          </div>

          {/* 惡鵝開關 */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <span className="text-gray-800 font-medium text-base">
              😈 包含惡鵝角色
            </span>
            <button
              onClick={() => setHasBadGoose(!hasBadGoose)}
              className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF9800] focus:ring-offset-2 ${
                hasBadGoose ? 'bg-[#FF9800]' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform ${
                  hasBadGoose ? 'translate-x-8' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* 這裡移除了原本的「選擇牌組」區塊 */}

        {/* 開始按鈕區塊 */}
        <div className="space-y-3">
             {/* 方案 B：增加安心提示文字 */}
            <p className="text-center text-gray-500 text-sm font-medium flex items-center justify-center gap-1">
              ✨ 已載入全擴充卡池 (300張)
            </p>

            <button
              onClick={handleStart}
              className="w-full btn-primary flex items-center justify-center gap-2 text-xl"
            >
              開始聚會
            </button>
        </div>
      </div>
    </div>
  );
}
