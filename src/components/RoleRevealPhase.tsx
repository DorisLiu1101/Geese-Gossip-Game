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
      <div
        className="min-h-[100dvh] flex flex-col items-center justify-center p-6"
        style={{
          background: 'radial-gradient(circle at center, #5D4037 0%, #3E2723 100%)',
        }}
      >
        <div className="bg-[#FFF8E1] border-2 border-[#D7CCC8] rounded-xl shadow-xl p-8 max-w-md w-full text-center">
          <EyeOff size={64} className="mx-auto mb-4 text-[#5D4037]" />
          <h2 className="text-2xl font-bold text-[#3E2723] mb-4">
            請將手機交給
          </h2>
          <div className="text-4xl font-bold text-[#FF9800] mb-8">
            {currentPlayer.name}
          </div>
          <button
            onClick={handleConfirmIdentity}
            className="w-full py-4 bg-[#FF9800] hover:bg-[#F57C00] text-white rounded-xl font-bold text-lg shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2"
          >
            <Eye size={24} />
            我是 {currentPlayer.name}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-[100dvh] flex flex-col items-center justify-center p-6"
      style={{
        background: 'radial-gradient(circle at center, #5D4037 0%, #3E2723 100%)',
      }}
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-[#FFF8E1] mb-2">你的身分是...</h2>
        <div className="text-3xl font-bold text-[#FF9800]">
          {getRoleName(currentPlayer.role)}
        </div>
      </div>

      <RoleCard role={currentPlayer.role} className="mb-8" />

      <button
        onClick={handleMemorized}
        className="px-8 py-4 bg-[#66BB6A] hover:bg-[#4CAF50] text-white rounded-xl font-bold text-lg shadow-lg transition-all hover:scale-105 flex items-center gap-2"
      >
        {isLastPlayer ? '開始遊戲' : '記住了'}
        <ArrowRight size={24} />
      </button>

      {!isLastPlayer && (
        <p className="text-[#FFF8E1] text-sm mt-4">
          記住後傳給下一位玩家
        </p>
      )}
    </div>
  );
}
