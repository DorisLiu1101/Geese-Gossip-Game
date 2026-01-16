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
      className={`relative w-full aspect-[2/3] max-w-[280px] rounded-xl sm:rounded-2xl border-3 sm:border-4 border-amber-800 shadow-2xl overflow-hidden bg-amber-100 ${
        onClick ? 'cursor-pointer active:scale-95 transition-all duration-300 active:shadow-amber-900/50 active:border-amber-600 touch-manipulation' : ''
      } ${className}`}
      onClick={onClick}
      style={{
        boxShadow: '0 8px 24px rgba(111, 84, 54, 0.4), inset 0 2px 4px rgba(255, 248, 225, 0.5)'
      }}
    >
      <div
        className="absolute inset-0 w-full h-full bg-no-repeat will-change-transform"
        style={{
          backgroundImage: `url('${card.imageUrl}')`,
          backgroundSize: '500% 500%',
          backgroundPosition: `${posX}% ${posY}%`,
          imageRendering: '-webkit-optimize-contrast',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          backgroundColor: '#FFF8E1',
        }}
      />
      {label && (
        <div
          className={`absolute top-1.5 sm:top-2 left-1/2 -translate-x-1/2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-white font-bold text-sm sm:text-base shadow-2xl z-10 border-2 border-white/30 ${labelColor}`}
        >
          {label}
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
  const ROLE_IMAGE = '/Role.jpg';

  const positions = {
    head: '0%',
    white: '50%',
    bad: '100%',
  };

  return (
    <div
      className={`w-full max-w-[240px] sm:max-w-[280px] aspect-[2/3] mx-auto bg-amber-100 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border-3 sm:border-4 border-amber-800 ${className}`}
      style={{
        boxShadow: '0 12px 32px rgba(111, 84, 54, 0.5), inset 0 2px 4px rgba(255, 248, 225, 0.5)'
      }}
    >
      <div
        className="w-full h-full bg-no-repeat will-change-transform"
        style={{
          backgroundImage: `url('${ROLE_IMAGE}')`,
          backgroundSize: '300% 100%',
          backgroundPosition: `${positions[role]} 0%`,
          imageRendering: '-webkit-optimize-contrast',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
        }}
      />
    </div>
  );
}
