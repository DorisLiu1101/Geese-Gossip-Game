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
      <div className="min-h-[100dvh] flex flex-col items-center justify-center p-6 safe-bottom bg-[#F0F2F5]">
        <div className="max-w-[430px] w-full mx-auto space-y-6 my-auto">
          <div className="chat-bubble">
            <h3 className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wide">
              情境
            </h3>
            <p className="text-xl font-bold text-gray-800 leading-relaxed">{scenario.text}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center">
              <div className="mb-[-10px] z-10">
                <div className="badge-red text-xs">
                  肇事鵝
                </div>
              </div>
              <Card card={scenario.cardA} />
            </div>
            <div className="flex flex-col items-center">
              <div className="mb-[-10px] z-10">
                <div className="badge-blue text-xs">
                  受害鵝
                </div>
              </div>
              <Card card={scenario.cardB} />
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-1 bg-gray-300 text-gray-600 rounded-2xl font-bold text-lg flex items-center justify-center py-4">
              放開隱藏
            </div>
            <button
              onClick={onEndActing}
              className="flex-1 btn-primary text-base py-4 transition-transform duration-100 ease-out active:scale-95 hover:scale-[1.02]"
            >
              表演結束
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center p-6 safe-bottom bg-gradient-to-br from-gray-800 to-gray-900">
      <div className="max-w-[430px] w-full mx-auto space-y-8 my-auto text-center">
        <Theater size={80} className="mx-auto text-[#FF9800] icon-bounce" />

        <div className="card-container">
          <h2 className="text-3xl font-black text-gray-800 mb-2">表演進行中...</h2>
          <p className="text-gray-600 text-lg font-semibold">頭鵝正在詮釋情境</p>
        </div>

        <div className="space-y-4">
          <button
            onMouseDown={() => setIsPeeking(true)}
            onTouchStart={() => setIsPeeking(true)}
            className="w-full btn-peek flex items-center justify-center gap-3 text-xl transition-transform duration-100 ease-out hover:scale-[1.02]"
          >
            <Eye size={24} />
            按住偷看
          </button>

          <button
            onClick={onEndActing}
            className="w-full btn-primary flex items-center justify-center gap-2 text-xl transition-transform duration-100 ease-out active:scale-95 hover:scale-[1.02]"
          >
            表演結束，進入推理
          </button>
        </div>
      </div>
    </div>
  );
}
