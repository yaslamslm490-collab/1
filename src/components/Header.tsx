import { useTheme } from '@/context/ThemeContext';
import type { ViewKey } from '@/types';
import { navItems } from '@/data';
import { Menu, Moon, Sun, Bell, Search } from 'lucide-react';

interface HeaderProps {
  activeView: ViewKey;
  onMenuClick: () => void;
}

export function Header({ activeView, onMenuClick }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const currentNav = navItems.find((n) => n.key === activeView);

  return (
    <header className="sticky top-0 z-30 bg-secondary/80 backdrop-blur-xl border-b border-default">
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onMenuClick}
            className="lg:hidden text-secondary hover:text-primary transition-colors flex-shrink-0"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="min-w-0">
            <h2 className="font-display font-bold text-lg sm:text-xl text-primary truncate">
              {currentNav?.label}
            </h2>
            <p className="text-xs text-muted hidden sm:block">
              {new Date().toLocaleDateString('ar-EG', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <div className="hidden md:flex items-center gap-2 bg-elevated rounded-xl px-4 py-2.5 border border-default">
            <Search className="w-4 h-4 text-muted" />
            <input
              type="text"
              placeholder="بحث..."
              className="bg-transparent text-sm text-primary placeholder:text-muted outline-none w-40"
            />
          </div>

          <button className="relative p-2.5 rounded-xl bg-elevated border border-default text-secondary hover:text-primary transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 left-2 w-2 h-2 rounded-full bg-accent" />
          </button>

          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-elevated border border-default text-secondary hover:text-primary transition-colors"
            aria-label="تبديل الوضع"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
}
