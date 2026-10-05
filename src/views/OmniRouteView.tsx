import { routes, statusLabels } from '@/data';
import type { Route } from '@/types';
import {
  Network,
  ArrowLeft,
  ArrowRight,
  Play,
  Pause,
  AlertTriangle,
  Plus,
  Activity,
  Zap,
  Clock,
} from 'lucide-react';

const statusStyles: Record<string, { bg: string; color: string }> = {
  running: { bg: 'var(--accent-dim)', color: 'var(--accent)' },
  paused: { bg: 'rgba(251,191,36,0.1)', color: 'var(--warning)' },
  error: { bg: 'rgba(248,113,113,0.1)', color: 'var(--error)' },
};

const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  input: ArrowLeft,
  output: ArrowRight,
  transform: Network,
};

function RouteCard({ route }: { route: Route }) {
  const style = statusStyles[route.status] ?? statusStyles.paused;
  const TypeIcon = typeIcons[route.type] ?? Network;
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-elevated flex items-center justify-center border border-default">
            <TypeIcon className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-primary">{route.name}</h3>
            <p className="text-xs text-muted mt-0.5">
              {route.source} ← {route.destination}
            </p>
          </div>
        </div>
        <span
          className="text-xs px-2.5 py-1 rounded-lg font-medium flex-shrink-0"
          style={{ backgroundColor: style.bg, color: style.color }}
        >
          {statusLabels[route.status]}
        </span>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-muted" />
            <span className="text-secondary">{route.throughput}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-muted" />
            <span className="text-secondary">{route.latency}</span>
          </div>
        </div>

        {route.status === 'running' ? (
          <button className="flex items-center gap-1 text-xs text-warning hover:text-primary transition-colors">
            <Pause className="w-3.5 h-3.5" />
            <span>إيقاف</span>
          </button>
        ) : route.status === 'paused' ? (
          <button className="flex items-center gap-1 text-xs text-accent hover:text-primary transition-colors">
            <Play className="w-3.5 h-3.5" />
            <span>تشغيل</span>
          </button>
        ) : (
          <button className="flex items-center gap-1 text-xs text-error hover:text-primary transition-colors">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>إصلاح</span>
          </button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 rounded-full bg-elevated overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              route.status === 'running' ? 'progress-fill' : ''
            }`}
            style={{ width: route.status === 'running' ? '100%' : '0%' }}
          />
        </div>
      </div>
    </div>
  );
}

export function OmniRouteView() {
  const runningCount = routes.filter((r) => r.status === 'running').length;
  const errorCount = routes.filter((r) => r.status === 'error').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <p className="text-sm text-secondary">
          إدارة مسارات توزيع المحتوى عبر المنصات والوكلاء
        </p>
        <button className="flex items-center gap-2 bg-accent text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity glow-accent">
          <Plus className="w-4 h-4" />
          <span>مسار جديد</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-accent-dim flex items-center justify-center">
              <Activity className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-xs text-muted">المسارات النشطة</p>
              <p className="font-display font-bold text-2xl text-primary">{runningCount}</p>
            </div>
          </div>
        </div>
        <div className="card p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <Pause className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-xs text-muted">المسارات المتوقفة</p>
              <p className="font-display font-bold text-2xl text-primary">
                {routes.filter((r) => r.status === 'paused').length}
              </p>
            </div>
          </div>
        </div>
        <div className="card p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-error" />
            </div>
            <div>
              <p className="text-xs text-muted">أخطاء في المسارات</p>
              <p className="font-display font-bold text-2xl text-primary">{errorCount}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card p-5">
        <div className="flex items-center gap-2 mb-5">
          <Network className="w-5 h-5 text-accent" />
          <h3 className="font-display font-bold text-base text-primary">خريطة المسارات</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {routes.map((r) => (
            <RouteCard key={r.id} route={r} />
          ))}
        </div>
      </div>
    </div>
  );
}
