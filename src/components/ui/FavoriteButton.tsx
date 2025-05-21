import { Heart } from 'lucide-react';
import React from 'react';

interface FavoriteButtonProps {
  favorited: boolean;
  onClick: () => void;
  className?: string;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ favorited, onClick, className }) => (
  <button
    type="button"
    aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
    onClick={onClick}
    className={`transition-colors ${className || ''}`}
  >
    <Heart
      fill={favorited ? '#ea384c' : 'none'}
      color={favorited ? '#ea384c' : 'currentColor'}
      className={`w-6 h-6 ${favorited ? 'text-red-500' : 'text-gray-400'} hover:text-red-500`}
    />
  </button>
); 