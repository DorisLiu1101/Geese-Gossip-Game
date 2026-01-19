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
      <div className="min-h-[100dvh] flex flex-col items-center justify-center p-6 safe-bottom">
        <div className="max-w-[430px] w-full mx-auto my-auto">
          <div className="card-container text-center space-y-6">
            <Sparkles size={72} className="mx-auto text-[#FF9800] icon-bounce" />
            <div>
              <h2 className="text-3xl font-black text-gray-800 mb-4">
                請頭鵝抽取題目
              </h2>
              <p className="text-gray-600 text-base leading-relaxed">
                頭鵝將會看到情境與兩張卡片，並需要演出這個情境
              </p>
            </div>
            <button
              onClick={onDrawScenario}
              className="w-full btn-primary flex items-center justify-center gap-2 text-xl"
            >
              抽取題目
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center p-6 safe-bottom">
      <div className="max-w-[430px] w-full mx-auto space-y-6 my-auto">
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

        <button
          onClick={onStartActing}
          className="w-full btn-secondary flex items-center justify-center gap-3 text-xl"
        >
          <EyeOff size={24} />
          隱藏並開始表演
        </button>
      </div>
    </div>
  );
}
