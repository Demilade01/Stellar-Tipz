import React from 'react';
import { BadgeTier } from '@/helpers/badge';

interface BadgeProps {
  tier: BadgeTier;
  score?: number;
  className?: string;
}

const tierConfig: Record<BadgeTier, { label: string; emoji: string; bg: string }> = {
  new: { label: 'New', emoji: '*', bg: 'bg-slate-100' },
  bronze: { label: 'Bronze', emoji: '🥉', bg: 'bg-orange-100' },
  silver: { label: 'Silver', emoji: '🥈', bg: 'bg-gray-100' },
  gold: { label: 'Gold', emoji: '🥇', bg: 'bg-yellow-100' },
  diamond: { label: 'Diamond', emoji: '💎', bg: 'bg-blue-100' },
};

const Badge: React.FC<BadgeProps> = ({ tier, score, className = '' }) => {
  const config = tierConfig[tier];

  return (
    <span
      className={`inline-flex items-center gap-1 border-2 border-black px-3 py-1 text-sm font-bold uppercase ${config.bg} ${className}`}
    >
      <span>{config.emoji}</span>
      <span>{config.label}</span>
      {score !== undefined && <span className="ml-1 text-xs">({score})</span>}
    </span>
  );
};

export default Badge;
