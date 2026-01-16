import { useState, useEffect } from 'react';
import { Scenario } from '../types';
import { Card } from './Card';
import { Eye, Theater } from 'lucide-react';

interface ActingPhaseProps {
  scenario: Scenario;
  onEndActing: () => void;
}

export function ActingPhase({ scenario, onEndActing }: ActingPhaseProps) {
  const [isPeeking, setIsPeeking] = useState(false);

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsPeeking(false);
    const handleGlobalTouchEnd = () => setIsPeeking(false);

    if (isPeeking) {
      window.addEventListener('mouseup', handleGlobalMouseUp);
      window.addEventListener('touchend', handleGlobalTouchEnd);
      window.addEventListener('touchcancel', handleGlobalTouchEnd);
    }

    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchend', handleGlobalTouchEnd);
      window.removeEventListener('touchcancel', handleGlobalTouchEnd);
    };
  }, [isPeeking]);

  if (isPeeking) {
    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center p-4 pb-8 safe-bottom">
        <div className="w-full max-w-2xl space-y-5 my-auto">
          <div className="paper-card rounded-2xl shadow-xl p-5 sm:p-8 text-center leaf-shadow">
            <h3 className="text-sm sm:text-base font-bold text-amber-700 mb-2 sm:mb-3 uppercase tracking-wider">
              情境
            </h3>
            <p className="text-lg sm:text-2xl font-bold text-amber-900 leading-relaxed">{scenario.text}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-6">
            <div className="flex flex-col items-center gap-2 sm:gap-3 w-full">
              <div className="bg-gradient-to-br from-red-600 to-red-700 text-white px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-sm sm:text-base font-bold shadow-lg transform translate-y-2 z-10 border-2 border-red-800">
                肇事鵝
              </div>
              <Card card={scenario.cardA} />
            </div>
            <div className="flex flex-col items-center gap-2 sm:gap-3 w-full">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-sm sm:text-base font-bold shadow-lg transform translate-y-2 z-10 border-2 border-blue-800">
                受害鵝
              </div>
              <Card card={scenario.cardB} />
            </div>
          </div>

          <div className="flex gap-3 sm:gap-4">
            <div className="flex-1 py-4 bg-gradient-to-br from-gray-500 to-gray-600 text-white rounded-2xl font-bold text-base sm:text-lg shadow-lg border-2 border-gray-700 flex items-center justify-center">
              放開隱藏
            </div>
            <button
              onClick={onEndActing}
              className="flex-1 py-4 warm-glow text-white rounded-2xl font-bold text-base sm:text-lg shadow-lg transition-all active:scale-95 border-2 border-amber-600 touch-manipulation"
            >
              表演結束
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center p-5 pb-10 safe-bottom bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="text-center space-y-8 my-auto max-w-md w-full">
        <Theater size={80} className="mx-auto text-amber-500 animate-pulse drop-shadow-2xl" />
        <div className="paper-card rounded-3xl p-6 sm:p-8 shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-amber-900 mb-3 sm:mb-4">🎭 表演進行中...</h2>
          <p className="text-amber-800 text-lg sm:text-xl font-semibold">頭鵝正在詮釋情境</p>
        </div>

        <div className="space-y-4">
          <button
            onMouseDown={() => setIsPeeking(true)}
            onTouchStart={() => setIsPeeking(true)}
            className="w-full px-8 py-4 sm:py-5 bg-gradient-to-br from-gray-500 to-gray-600 active:from-gray-600 active:to-gray-700 text-white rounded-2xl font-bold text-lg sm:text-xl shadow-xl transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 sm:gap-3 border-2 border-gray-700 touch-manipulation"
          >
            <Eye size={24} />
            按住偷看
          </button>

          <button
            onClick={onEndActing}
            className="w-full px-8 py-4 sm:py-5 warm-glow text-white rounded-2xl font-bold text-lg sm:text-xl shadow-xl transition-all duration-300 active:scale-95 border-2 border-amber-600 touch-manipulation"
          >
            表演結束，進入推理
          </button>
        </div>
      </div>
    </div>
  );
}
