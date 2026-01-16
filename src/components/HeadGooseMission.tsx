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
      <div className="min-h-[100dvh] flex flex-col items-center justify-center p-6">
        <div className="wood-panel wood-border rounded-3xl shadow-2xl p-10 max-w-md w-full text-center relative overflow-hidden nature-glow">
          <div className="absolute top-0 left-0 w-full h-2 grass-texture"></div>
          <div className="absolute bottom-0 left-0 w-full h-2 grass-texture"></div>

          <div className="paper-card rounded-2xl p-8">
            <Sparkles size={72} className="mx-auto mb-6 text-amber-600 drop-shadow-lg animate-pulse" />
            <h2 className="text-3xl font-bold text-amber-900 mb-6 drop-shadow-sm">
              請頭鵝抽取題目
            </h2>
            <p className="text-amber-800 mb-8 text-lg leading-relaxed">
              頭鵝將會看到情境與兩張卡片，並需要演出這個情境
            </p>
            <button
              onClick={onDrawScenario}
              className="w-full py-5 warm-glow text-white rounded-2xl font-bold text-xl shadow-lg transition-all duration-300 hover:scale-105 border-2 border-amber-600"
            >
              🎲 抽取題目
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        <div className="paper-card rounded-2xl shadow-xl p-8 text-center leaf-shadow">
          <h3 className="text-base font-bold text-amber-700 mb-3 uppercase tracking-wider">
            情境
          </h3>
          <p className="text-2xl font-bold text-amber-900 leading-relaxed">
            {scenario.text}
          </p>
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

        <button
          onClick={onStartActing}
          className="w-full py-5 grass-texture text-white rounded-2xl font-bold text-xl shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 border-2 border-green-800"
        >
          <EyeOff size={28} />
          隱藏並開始表演
        </button>
      </div>
    </div>
  );
}
