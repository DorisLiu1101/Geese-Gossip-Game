import { CardData } from '../types';

interface CardProps {
  card: CardData;
  // 刪除 label 和 labelColor
  onClick?: () => void;
  className?: string;
}

// 移除 props 中的 label, labelColor
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
      {/* 刪除這裡原本關於 label 的渲染代碼 */}
    </div>
  );
}

// RoleCard 保持不變...
export function RoleCard({ role, className = '' }: RoleCardProps) {
    // ...略
}
