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
      <div
        className="min-h-[100dvh] flex items-center justify-center p-4"
        style={{
          background: 'radial-gradient(circle at center, #5D4037 0%, #3E2723 100%)',
        }}
      >
        <div className="bg-[#FFF8E1] border-2 border-[#D7CCC8] rounded-xl shadow-xl p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <X size={80} className="mx-auto text-red-500 mb-4" />
            <h2 className="text-3xl font-bold text-[#3E2723] mb-2">
              推理錯誤
            </h2>
            <p className="text-[#5D4037]">Objection!</p>
          </div>

          <div className="space-y-3">
            <button
              onClick={onTryAgain}
              className="w-full py-4 bg-[#FF9800] hover:bg-[#F57C00] text-white rounded-xl font-bold text-lg shadow-lg transition-all hover:scale-105"
            >
              繼續推理
            </button>
            <button
              onClick={onGiveUp}
              className="w-full py-4 bg-transparent hover:bg-[#9E9E9E]/10 text-[#9E9E9E] border-2 border-[#9E9E9E] rounded-xl font-bold text-lg transition-all"
            >
              太難了...看答案
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-[100dvh] flex flex-col p-4 overflow-y-auto"
      style={{
        background: 'radial-gradient(circle at center, #5D4037 0%, #3E2723 100%)',
      }}
    >
      <div className="max-w-2xl mx-auto w-full space-y-6 py-6">
        <div className="text-center">
          <PartyPopper
            size={80}
            className="mx-auto text-[#FF9800] mb-4"
          />
          <h2 className="text-3xl font-bold text-[#FFF8E1] mb-2">
            真相大白
          </h2>
          <p className="text-[#D7CCC8]">Truth Revealed</p>
        </div>

        <div className="bg-[#FFF8E1] border-2 border-[#D7CCC8] rounded-xl shadow-xl p-6">
          <h3 className="text-sm font-semibold text-[#5D4037] mb-2 text-center">
            情境
          </h3>
          <p className="text-xl font-bold text-[#3E2723] text-center">
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

        {badGoose && (
          <div className="bg-[#FFF8E1] border-2 border-[#D7CCC8] rounded-xl shadow-xl p-6 text-center">
            <h3 className="text-lg font-semibold text-[#5D4037] mb-2">
              惡鵝身分揭曉
            </h3>
            <p className="text-2xl font-bold text-[#3E2723]">
              {badGoose.name}
            </p>
            <p className="text-sm text-[#5D4037] mt-2">
              就是你在搞鬼！
            </p>
          </div>
        )}

        <button
          onClick={onNewGame}
          className="w-full py-4 bg-[#66BB6A] hover:bg-[#4CAF50] text-white rounded-xl font-bold text-lg shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2"
        >
          <RotateCcw size={24} />
          再來一局
        </button>
      </div>
    </div>
  );
}
