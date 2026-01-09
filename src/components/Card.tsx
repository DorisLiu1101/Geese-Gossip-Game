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
      className={`relative w-full aspect-[2/3] max-w-[280px] rounded-xl border-2 border-[#D7CCC8] shadow-xl overflow-hidden bg-gray-300 ${
        onClick ? 'cursor-pointer hover:scale-105 transition-transform' : ''
      } ${className}`}
      onClick={onClick}
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
          className={`absolute top-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-white font-bold text-sm shadow-lg z-10 ${labelColor}`}
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
    <div className={`w-64 aspect-[2/3] mx-auto bg-gray-200 rounded-xl overflow-hidden shadow-xl ${className}`}>
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
