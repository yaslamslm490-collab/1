import { navItems } from '@/data';
import type { ViewKey } from '@/types';
import { X } from 'lucide-react';

interface SidebarProps {
  activeView: ViewKey;
  onNavigate: (view: ViewKey) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ activeView, onNavigate, isOpen, onClose }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 right-0 h-full w-72 bg-secondary border-l border-default z-50 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:z-0 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-default">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center glow-accent">
              <span className="font-display font-bold text-lg text-white">ع</span>
            </div>
            <div>
              <h1 className="font-display font-bold text-base text-primary leading-tight">
                نظام الوسائط
              </h1>
              <p className="text-xs text-muted">AI Media OS</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-muted hover:text-primary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          <p className="text-xs text-muted px-4 mb-3 font-medium">القائمة الرئيسية</p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.key;
            return (
              <button
                key={item.key}
                onClick={() => {
                  onNavigate(item.key);
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'nav-item-active'
                    : 'text-secondary hover:bg-elevated hover:text-primary'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.label}</span>
                {isActive && (
                  <span className="mr-auto w-1.5 h-1.5 rounded-full bg-accent" />
                )}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-default">
          <div className="card p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">م</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-primary truncate">مدير النظام</p>
              <p className="text-xs text-muted truncate">admin@media-os.ai</p>
            </div>
            <div className="status-dot status-active flex-shrink-0" />
          </div>
        </div>
      </aside>
    </>
  );
}
