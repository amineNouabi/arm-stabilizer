'use client';

import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggle(): React.ReactNode {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      className="justify-start"
      onClick={() => {
        setTheme(theme === 'light' ? 'dark' : 'light');
      }}
      size="sm"
      variant="ghost"
    >
      <div className="flex gap-2 dark:hidden">
        <Moon className="size-5" />
        <span className="block">Dark</span>
      </div>

      <div className="dark:flex gap-2 hidden">
        <Sun className="size-5" />
        <span className="block">Light</span>
      </div>
    </Button>
  );
}
