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
      <div className="min-h-[100dvh] flex flex-col items-center justify-center p-5 pb-8 safe-bottom">
        <div className="wood-panel wood-border rounded-3xl shadow-2xl p-6 sm:p-10 max-w-md w-full text-center relative overflow-hidden my-auto">
          <div className="absolute top-0 left-0 w-full h-2 grass-texture"></div>
          <div className="absolute bottom-0 left-0 w-full h-2 grass-texture"></div>

          <div className="paper-card rounded-2xl p-6 sm:p-8">
            <EyeOff size={64} className="mx-auto mb-5 text-amber-800 drop-shadow-lg" />
            <h2 className="text-2xl sm:text-3xl font-bold text-amber-900 mb-3 drop-shadow-sm">
              請將手機交給
            </h2>
            <div className="text-4xl sm:text-5xl font-bold mb-6 sm:mb-8 text-amber-900 drop-shadow-sm">
              {currentPlayer.name}
            </div>
            <button
              onClick={handleConfirmIdentity}
              className="w-full py-4 sm:py-5 warm-glow text-white rounded-2xl font-bold text-lg sm:text-xl shadow-lg transition-all duration-300 active:scale-95 flex items-center justify-center gap-3 border-2 border-amber-600 touch-manipulation"
            >
              <Eye size={24} />
              我是 {currentPlayer.name}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center p-5 pb-10 safe-bottom">
      <div className="paper-card rounded-3xl shadow-2xl p-6 sm:p-8 mb-6 sm:mb-8 max-w-md w-full leaf-shadow">
        <h2 className="text-2xl sm:text-3xl font-bold text-amber-900 mb-4 text-center drop-shadow-sm">你的身分是...</h2>
        <div className="text-3xl sm:text-4xl font-bold text-center warm-glow text-white py-3 sm:py-4 rounded-2xl border-2 border-amber-600">
          {getRoleName(currentPlayer.role)}
        </div>
      </div>

      <RoleCard role={currentPlayer.role} className="mb-8 leaf-shadow max-w-[240px] sm:max-w-[280px] w-full" />

      <button
        onClick={handleMemorized}
        className="px-8 sm:px-10 py-4 sm:py-5 grass-texture text-white rounded-2xl font-bold text-lg sm:text-xl shadow-lg transition-all duration-300 active:scale-95 flex items-center gap-2 sm:gap-3 border-2 border-green-800 touch-manipulation"
      >
        {isLastPlayer ? '開始遊戲' : '記住了'}
        <ArrowRight size={24} />
      </button>

      {!isLastPlayer && (
        <p className="paper-card rounded-xl px-5 py-2.5 text-amber-900 font-semibold text-sm sm:text-base mt-5">
          記住後傳給下一位玩家
        </p>
      )}
    </div>
  );
}
