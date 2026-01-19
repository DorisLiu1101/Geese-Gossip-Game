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
      <div className="min-h-[100dvh] flex flex-col items-center justify-center p-6 safe-bottom">
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
              className="w-full btn-primary flex items-center justify-center gap-3 text-xl"
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
    <div className="min-h-[100dvh] flex flex-col items-center justify-center p-6 safe-bottom">
      <div className="max-w-[430px] w-full mx-auto space-y-6 my-auto">
        <div className="card-container text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">你的身分是...</h2>
          <div className="text-4xl font-black text-white bg-gradient-to-br from-[#FF9800] to-[#F57C00] py-4 rounded-2xl shadow-lg">
            {getRoleName(currentPlayer.role)}
          </div>
        </div>

        <div onClick={handleMemorized} className="cursor-pointer">
          <RoleCard role={currentPlayer.role} className="max-w-[280px] mx-auto" />
        </div>

        <div className="chat-bubble">
          <p className="text-gray-700 font-semibold text-base">
            {isLastPlayer ? '點卡片開始遊戲' : '記住了!! 點卡片蓋牌，再往下傳'}
          </p>
        </div>
      </div>
    </div>
  );
}
