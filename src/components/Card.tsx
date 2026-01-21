import { CardData } from '../types';

interface CardProps {
  card: CardData;
  onClick?: () => void;
  className?: string;
}

export function Card({ card, onClick, className = '' }: CardProps) {
  const row = Math.floor(card.cardIndex / 5);
  const col = card.cardIndex % 5;

  const posX = col * 25;
  const posY = row * 25;

  return (
    <div
      className={`relative w-full aspect-[2/3] rounded-2xl border-4 border-white shadow-md overflow-hidden bg-gray-100 ${
        onClick ? 'cursor-pointer active:scale-95 transition-all duration-150' : ''
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
      className={`w-full max-w-[280px] aspect-[2/3] mx-auto bg-gray-100 rounded-2xl overflow-hidden shadow-lg border-4 border-white ${className}`}
    >
      <div
        className="w-full h-full bg-no-repeat"
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
