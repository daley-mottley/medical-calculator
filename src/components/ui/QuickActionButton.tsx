
import { ComponentType } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface QuickActionButtonProps {
  icon: ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost';
  className?: string;
}

export function QuickActionButton({
  icon: Icon,
  label,
  onClick,
  variant = 'outline',
  className,
}: QuickActionButtonProps) {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      className={cn("flex flex-col items-center h-auto py-3 px-4 space-y-1 text-center", className)}
    >
      <Icon className="h-5 w-5" />
      <span className="text-xs">{label}</span>
    </Button>
  );
}
