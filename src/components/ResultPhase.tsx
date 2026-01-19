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
      <div className="min-h-[100dvh] flex items-center justify-center p-6 safe-bottom">
        <div className="max-w-[430px] w-full mx-auto my-auto">
          <div className="card-container text-center space-y-6">
            <X size={80} className="mx-auto text-red-500" />
            <div>
              <h2 className="text-4xl font-black text-gray-800 mb-2">
                推理錯誤
              </h2>
              <p className="text-gray-600 text-xl font-semibold">Objection!</p>
            </div>

            <div className="space-y-3">
              <button
                onClick={onTryAgain}
                className="w-full btn-primary text-xl transition-transform duration-100 ease-out active:scale-95 hover:scale-[1.02]"
              >
                繼續推理
              </button>
              <button
                onClick={onGiveUp}
                className="w-full btn-secondary text-xl transition-transform duration-100 ease-out active:scale-95 hover:scale-[1.02]"
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
    <div className="min-h-[100dvh] flex flex-col p-6 overflow-y-auto safe-bottom safe-top">
      <div className="max-w-[430px] mx-auto w-full space-y-6 py-4">
        <div className="card-container text-center">
          <PartyPopper size={80} className="mx-auto text-[#FF9800] icon-bounce mb-4" />
          <h2 className="text-4xl font-black text-gray-800 mb-2">
            真相大白
          </h2>
          <p className="text-gray-600 text-xl font-semibold tracking-wide">Truth Revealed</p>
        </div>

        <div className="chat-bubble">
          <h3 className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wide">
            情境
          </h3>
          <p className="text-xl font-bold text-gray-800 leading-relaxed">
            {scenario.text}
          </p>
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

        {badGoose && (
          <div className="card-container text-center">
            <h3 className="text-xl font-bold text-gray-700 mb-3">
              惡鵝身分揭曉
            </h3>
            <p className="text-3xl font-black text-gray-800 mb-2">
              {badGoose.name}
            </p>
            <p className="text-lg text-gray-600 font-semibold">
              就是你在搞鬼！
            </p>
          </div>
        )}

        <button
          onClick={onNewGame}
          className="w-full btn-primary flex items-center justify-center gap-3 text-xl transition-transform duration-100 ease-out active:scale-95 hover:scale-[1.02]"
        >
          <RotateCcw size={24} />
          再來一局
        </button>
      </div>
    </div>
  );
}
