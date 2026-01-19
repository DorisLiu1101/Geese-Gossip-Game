import { useState } from 'react';
import { Player } from '../types';
import { RoleCard } from './Card';
import { Eye, EyeOff } from 'lucide-react';

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
      <div className="min-h-[100dvh] bg-gradient-to-b from-[#FFF3E0] to-[#F5F5F5] flex flex-col items-center justify-center p-6 safe-bottom">
        <div className="max-w-[430px] w-full mx-auto my-auto">
          <div className="card-container text-center space-y-6">
            <EyeOff size={72} className="mx-auto text-gray-400" />
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                請將手機交給
              </h2>
              <div className="text-5xl font-black text-gray-800">
                {currentPlayer.name}
              </div>
            </div>
            <button
              onClick={handleConfirmIdentity}
              className="w-full btn-primary flex items-center justify-center gap-3 text-xl transition-transform duration-100 ease-out active:scale-95 hover:scale-[1.02]"
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
    <div className="min-h-[100dvh] bg-gradient-to-b from-[#FFF3E0] to-[#F5F5F5] flex flex-col items-center justify-center p-6 safe-bottom">
      <div className="max-w-[430px] w-full mx-auto space-y-6 my-auto">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-bold text-gray-600">你的身分是...</h2>
          <div className="inline-block bg-[#FF9800] text-white px-8 py-3 rounded-full shadow-lg font-black text-2xl tracking-widest transform -rotate-1">
            {getRoleName(currentPlayer.role)}
          </div>
        </div>

        <div onClick={handleMemorized} className="cursor-pointer transition-transform duration-100 ease-out active:scale-95 hover:scale-[1.02]">
          <RoleCard role={currentPlayer.role} className="max-w-[280px] mx-auto" />
        </div>

        <div className="bg-white px-6 py-3 rounded-2xl shadow-sm text-gray-600 font-bold border-2 border-gray-100 text-center">
          <p className="text-base">
            {isLastPlayer ? '點卡片開始遊戲' : '記住了!! 點卡片蓋牌，再往下傳'}
          </p>
        </div>
      </div>
    </div>
  );
}
