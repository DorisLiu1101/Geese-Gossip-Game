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
      <div className="min-h-[100dvh] flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-2xl space-y-6">
          <div className="paper-card rounded-2xl shadow-xl p-8 text-center leaf-shadow">
            <h3 className="text-base font-bold text-amber-700 mb-3 uppercase tracking-wider">
              情境
            </h3>
            <p className="text-2xl font-bold text-amber-900 leading-relaxed">{scenario.text}</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col items-center gap-3 w-full">
              <div className="bg-gradient-to-br from-red-600 to-red-700 text-white px-5 py-2 rounded-full text-base font-bold shadow-lg transform translate-y-2 z-10 border-2 border-red-800">
                肇事鵝
              </div>
              <Card card={scenario.cardA} />
            </div>
            <div className="flex flex-col items-center gap-3 w-full">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white px-5 py-2 rounded-full text-base font-bold shadow-lg transform translate-y-2 z-10 border-2 border-blue-800">
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
              className="flex-1 py-4 bg-gradient-to-br from-gray-500 to-gray-600 text-white rounded-2xl font-bold text-lg shadow-lg border-2 border-gray-700"
            >
              放開隱藏
            </button>
            <button
              onClick={onEndActing}
              className="flex-1 py-4 warm-glow text-white rounded-2xl font-bold text-lg shadow-lg transition-all hover:scale-105 border-2 border-amber-600"
            >
              表演結束
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="text-center space-y-10">
        <Theater size={96} className="mx-auto text-amber-500 animate-pulse drop-shadow-2xl" />
        <div className="paper-card rounded-3xl p-8 shadow-2xl">
          <h2 className="text-4xl font-bold text-amber-900 mb-4">🎭 表演進行中...</h2>
          <p className="text-amber-800 text-xl font-semibold">頭鵝正在詮釋情境</p>
        </div>

        <div className="space-y-5 pt-8 max-w-md w-full">
          <button
            onMouseDown={() => setIsPeeking(true)}
            onMouseUp={() => setIsPeeking(false)}
            onMouseLeave={() => setIsPeeking(false)}
            onTouchStart={() => setIsPeeking(true)}
            onTouchEnd={() => setIsPeeking(false)}
            className="w-full px-10 py-5 bg-gradient-to-br from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white rounded-2xl font-bold text-xl shadow-xl transition-all duration-300 active:scale-95 flex items-center justify-center gap-3 border-2 border-gray-700"
          >
            <Eye size={28} />
            按住偷看
          </button>

          <button
            onClick={onEndActing}
            className="w-full px-10 py-5 warm-glow text-white rounded-2xl font-bold text-xl shadow-xl transition-all duration-300 hover:scale-105 border-2 border-amber-600"
          >
            表演結束，進入推理
          </button>
        </div>
      </div>
    </div>
  );
}
