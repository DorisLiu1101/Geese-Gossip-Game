import { Scenario } from '../types';
import { Card } from './Card';
import { Sparkles, EyeOff } from 'lucide-react';

interface HeadGooseMissionProps {
  scenario: Scenario | null;
  onDrawScenario: () => void;
  onStartActing: () => void;
}

export function HeadGooseMission({
  scenario,
  onDrawScenario,
  onStartActing,
}: HeadGooseMissionProps) {
  if (!scenario) {
    return (
      <div
        className="min-h-[100dvh] flex flex-col items-center justify-center p-6"
        style={{
          background: 'radial-gradient(circle at center, #5D4037 0%, #3E2723 100%)',
        }}
      >
        <div className="bg-[#FFF8E1] border-2 border-[#D7CCC8] rounded-xl shadow-xl p-8 max-w-md w-full text-center">
          <Sparkles size={64} className="mx-auto mb-4 text-[#FF9800]" />
          <h2 className="text-2xl font-bold text-[#3E2723] mb-4">
            請頭鵝抽取題目
          </h2>
          <p className="text-[#5D4037] mb-8">
            頭鵝將會看到情境與兩張卡片，並需要演出這個情境
          </p>
          <button
            onClick={onDrawScenario}
            className="w-full py-4 bg-[#FF9800] hover:bg-[#F57C00] text-white rounded-xl font-bold text-lg shadow-lg transition-all hover:scale-105"
          >
            🎲 抽取題目
          </button>
        </div>
      </div>
    );
  }

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
          <p className="text-xl font-bold text-[#3E2723]">
            {scenario.text}
          </p>
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

        <button
          onClick={onStartActing}
          className="w-full py-4 bg-[#66BB6A] hover:bg-[#4CAF50] text-white rounded-xl font-bold text-lg shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2"
        >
          <EyeOff size={24} />
          隱藏並開始表演
        </button>
      </div>
    </div>
  );
}
