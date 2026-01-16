import { Player, Scenario } from '../types';
import { Card } from './Card';
import { X, PartyPopper, RotateCcw } from 'lucide-react';

interface ResultPhaseProps {
  isCorrect: boolean;
  scenario: Scenario;
  players: Player[];
  onTryAgain: () => void;
  onGiveUp: () => void;
  onNewGame: () => void;
}

export function ResultPhase({
  isCorrect,
  scenario,
  players,
  onTryAgain,
  onGiveUp,
  onNewGame,
}: ResultPhaseProps) {
  const badGoose = players.find((p) => p.role === 'bad');

  if (!isCorrect) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center p-4">
        <div className="wood-panel wood-border rounded-3xl shadow-2xl p-10 max-w-md w-full relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 grass-texture"></div>
          <div className="absolute bottom-0 left-0 w-full h-2 grass-texture"></div>

          <div className="paper-card rounded-2xl p-8">
            <div className="text-center mb-8">
              <X size={96} className="mx-auto text-red-600 mb-6 drop-shadow-lg" />
              <h2 className="text-4xl font-bold text-amber-900 mb-3 drop-shadow-sm">
                推理錯誤
              </h2>
              <p className="text-amber-700 text-xl font-semibold">Objection!</p>
            </div>

            <div className="space-y-4">
              <button
                onClick={onTryAgain}
                className="w-full py-5 warm-glow text-white rounded-2xl font-bold text-xl shadow-lg transition-all duration-300 hover:scale-105 border-2 border-amber-600"
              >
                繼續推理
              </button>
              <button
                onClick={onGiveUp}
                className="w-full py-5 bg-transparent hover:bg-amber-900/10 text-amber-900 border-4 border-amber-800 rounded-2xl font-bold text-xl transition-all duration-300 hover:scale-105"
              >
                太難了...看答案
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] flex flex-col p-5 overflow-y-auto">
      <div className="max-w-2xl mx-auto w-full space-y-7 py-6">
        <div className="paper-card rounded-3xl shadow-2xl p-10 text-center leaf-shadow">
          <PartyPopper
            size={96}
            className="mx-auto text-amber-600 mb-6 drop-shadow-lg animate-pulse"
          />
          <h2 className="text-4xl font-bold text-amber-900 mb-3 drop-shadow-sm">
            真相大白
          </h2>
          <p className="text-amber-700 text-xl font-semibold tracking-wide">Truth Revealed</p>
        </div>

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

        {badGoose && (
          <div className="wood-panel wood-border rounded-2xl shadow-xl p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 grass-texture"></div>
            <div className="absolute bottom-0 left-0 w-full h-2 grass-texture"></div>

            <div className="paper-card rounded-xl p-6">
              <h3 className="text-xl font-bold text-amber-800 mb-3">
                惡鵝身分揭曉
              </h3>
              <p className="text-3xl font-bold text-amber-900 mb-2">
                {badGoose.name}
              </p>
              <p className="text-lg text-amber-700 font-semibold">
                就是你在搞鬼！
              </p>
            </div>
          </div>
        )}

        <button
          onClick={onNewGame}
          className="w-full py-5 grass-texture text-white rounded-2xl font-bold text-xl shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 border-2 border-green-800"
        >
          <RotateCcw size={28} />
          再來一局
        </button>
      </div>
    </div>
  );
}
