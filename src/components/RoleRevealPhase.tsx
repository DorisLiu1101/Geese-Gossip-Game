import { useState } from 'react';
import { Player } from '../types';
import { RoleCard } from './Card';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';

interface RoleRevealPhaseProps {
  players: Player[];
  currentIndex: number;
  onNext: () => void;
  onComplete: () => void;
}

export function RoleRevealPhase({
  players,
  currentIndex,
  onNext,
  onComplete,
}: RoleRevealPhaseProps) {
  const [step, setStep] = useState<'handoff' | 'reveal'>('handoff');
  const currentPlayer = players[currentIndex];
  const isLastPlayer = currentIndex === players.length - 1;

  const handleConfirmIdentity = () => {
    setStep('reveal');
  };

  const handleMemorized = () => {
    if (isLastPlayer) {
      onComplete();
    } else {
      setStep('handoff');
      onNext();
    }
  };

  const getRoleName = (role: string) => {
    switch (role) {
      case 'head':
        return '頭鵝';
      case 'white':
        return '白鵝';
      case 'bad':
        return '惡鵝';
      default:
        return '';
    }
  };

  if (step === 'handoff') {
    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center p-6">
        <div className="wood-panel wood-border rounded-3xl shadow-2xl p-10 max-w-md w-full text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 grass-texture"></div>
          <div className="absolute bottom-0 left-0 w-full h-2 grass-texture"></div>

          <div className="paper-card rounded-2xl p-8">
            <EyeOff size={72} className="mx-auto mb-6 text-amber-800 drop-shadow-lg" />
            <h2 className="text-3xl font-bold text-amber-900 mb-6 drop-shadow-sm">
              請將手機交給
            </h2>
            <div className="text-5xl font-bold mb-8 warm-glow text-white py-4 rounded-2xl border-2 border-amber-600">
              {currentPlayer.name}
            </div>
            <button
              onClick={handleConfirmIdentity}
              className="w-full py-5 warm-glow text-white rounded-2xl font-bold text-xl shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 border-2 border-amber-600"
            >
              <Eye size={28} />
              我是 {currentPlayer.name}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center p-6">
      <div className="paper-card rounded-3xl shadow-2xl p-8 mb-8 max-w-md w-full leaf-shadow">
        <h2 className="text-3xl font-bold text-amber-900 mb-4 text-center drop-shadow-sm">你的身分是...</h2>
        <div className="text-4xl font-bold text-center warm-glow text-white py-4 rounded-2xl border-2 border-amber-600">
          {getRoleName(currentPlayer.role)}
        </div>
      </div>

      <RoleCard role={currentPlayer.role} className="mb-10 leaf-shadow" />

      <button
        onClick={handleMemorized}
        className="px-10 py-5 grass-texture text-white rounded-2xl font-bold text-xl shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-3 border-2 border-green-800"
      >
        {isLastPlayer ? '開始遊戲' : '記住了'}
        <ArrowRight size={28} />
      </button>

      {!isLastPlayer && (
        <p className="paper-card rounded-xl px-6 py-3 text-amber-900 font-semibold text-base mt-6">
          記住後傳給下一位玩家
        </p>
      )}
    </div>
  );
}
