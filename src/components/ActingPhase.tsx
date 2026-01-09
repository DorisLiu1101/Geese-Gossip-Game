import { useState } from 'react';
import { Scenario } from '../types';
import { Card } from './Card';
import { Eye, Theater } from 'lucide-react';

interface ActingPhaseProps {
  scenario: Scenario;
  onEndActing: () => void;
}

export function ActingPhase({ scenario, onEndActing }: ActingPhaseProps) {
  const [isPeeking, setIsPeeking] = useState(false);

  if (isPeeking) {
    return (
      <div
        className="min-h-[100dvh] flex flex-col items-center justify-center p-4"
        style={{
          background: 'radial-gradient(circle at center, #5D4037 0%, #3E2723 100%)',
        }}
      >
        <div className="w-full max-w-2xl space-y-4">
          <div className="bg-[#FFF8E1] border-2 border-[#D7CCC8] rounded-xl shadow-xl p-6 text-center">
            <h3 className="text-sm font-semibold text-[#5D4037] mb-2">
              情境
            </h3>
            <p className="text-xl font-bold text-[#3E2723]">{scenario.text}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center gap-2 w-full">
              <div className="bg-red-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-md transform translate-y-2 z-10">
                肇事鵝
              </div>
              <Card card={scenario.cardA} />
            </div>
            <div className="flex flex-col items-center gap-2 w-full">
              <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-md transform translate-y-2 z-10">
                受害鵝
              </div>
              <Card card={scenario.cardB} />
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onMouseDown={() => setIsPeeking(true)}
              onMouseUp={() => setIsPeeking(false)}
              onMouseLeave={() => setIsPeeking(false)}
              onTouchStart={() => setIsPeeking(true)}
              onTouchEnd={() => setIsPeeking(false)}
              className="flex-1 py-4 bg-[#9E9E9E] text-white rounded-xl font-bold text-lg shadow-lg"
            >
              放開隱藏
            </button>
            <button
              onClick={onEndActing}
              className="flex-1 py-4 bg-[#FF9800] hover:bg-[#F57C00] text-white rounded-xl font-bold text-lg shadow-lg transition-all"
            >
              表演結束
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-[100dvh] flex flex-col items-center justify-center p-6"
      style={{
        background: 'rgba(0, 0, 0, 0.95)',
      }}
    >
      <div className="text-center space-y-8">
        <Theater size={80} className="mx-auto text-[#FF9800] animate-pulse" />
        <h2 className="text-3xl font-bold text-white">🎭 表演進行中...</h2>
        <p className="text-[#FFF8E1] text-lg">頭鵝正在詮釋情境</p>

        <div className="space-y-4 pt-8">
          <button
            onMouseDown={() => setIsPeeking(true)}
            onMouseUp={() => setIsPeeking(false)}
            onMouseLeave={() => setIsPeeking(false)}
            onTouchStart={() => setIsPeeking(true)}
            onTouchEnd={() => setIsPeeking(false)}
            className="w-full px-8 py-4 bg-[#9E9E9E] hover:bg-[#757575] text-white rounded-xl font-bold text-lg shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <Eye size={24} />
            按住偷看
          </button>

          <button
            onClick={onEndActing}
            className="w-full px-8 py-4 bg-[#FF9800] hover:bg-[#F57C00] text-white rounded-xl font-bold text-lg shadow-lg transition-all hover:scale-105"
          >
            表演結束，進入推理
          </button>
        </div>
      </div>
    </div>
  );
}
