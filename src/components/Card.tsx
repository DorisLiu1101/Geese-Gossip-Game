import { CardData } from '../types';

interface CardProps {
  card: CardData;
  label?: string;
  labelColor?: string;
  onClick?: () => void;
  className?: string;
}

export function Card({ card, label, labelColor, onClick, className = '' }: CardProps) {
  const row = Math.floor(card.cardIndex / 5);
  const col = card.cardIndex % 5;

  const posX = col * 25;
  const posY = row * 25;

  return (
    <div
      className={`relative w-full aspect-[2/3] rounded-2xl border-4 border-white shadow-[0_15px_35px_rgba(0,0,0,0.15)] overflow-hidden bg-gray-100 ${
        onClick ? 'cursor-pointer transition-transform duration-100 ease-out active:scale-95 hover:scale-[1.02]' : ''
      } ${className}`}
      onClick={onClick}
    >
      <div
        className="absolute inset-0 w-full h-full bg-no-repeat"
        style={{
          backgroundImage: `url('${card.imageUrl}')`,
          backgroundSize: '500% 500%',
          backgroundPosition: `${posX}% ${posY}%`,
          imageRendering: 'high-quality',
        }}
      />
      {label && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10">
          <div className={`${labelColor} px-4 py-2 rounded-full text-white font-black text-sm shadow-lg border-2 border-white`}>
            {label}
          </div>
        </div>
      )}
    </div>
  );
}

interface RoleCardProps {
  role: 'head' | 'white' | 'bad';
  className?: string;
}

export function RoleCard({ role, className = '' }: RoleCardProps) {
  const ROLE_IMAGE = '/Role.webp';

  const positions = {
    head: '0%',
    white: '50%',
    bad: '100%',
  };

  return (
    <div
      className={`w-full max-w-[280px] aspect-[2/3] mx-auto bg-gray-100 rounded-2xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.15)] border-[6px] border-white animate-in zoom-in duration-300 ${className}`}
    >
      <div
        className="w-full h-full bg-no-repeat border-4 border-white/30 rounded-xl"
        style={{
          backgroundImage: `url('${ROLE_IMAGE}')`,
          backgroundSize: '300% 100%',
          backgroundPosition: `${positions[role]} 0%`,
          imageRendering: 'high-quality',
        }}
      />
    </div>
  );
}
