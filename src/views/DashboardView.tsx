import { statsCards, agents, statusLabels } from '@/data';
import type { StatCard, AgentInfo } from '@/types';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Cpu,
  Clock,
  ArrowLeft,
} from 'lucide-react';

const colorMap: Record<string, { bg: string; text: string; ring: string }> = {
  accent: { bg: 'bg-accent-dim', text: 'text-accent', ring: 'ring-emerald-500/20' },
  info: { bg: 'bg-blue-500/10', text: 'text-info', ring: 'ring-blue-500/20' },
  warning: { bg: 'bg-amber-500/10', text: 'text-warning', ring: 'ring-amber-500/20' },
  error: { bg: 'bg-red-500/10', text: 'text-error', ring: 'ring-red-500/20' },
};

function StatCardItem({ card }: { card: StatCard }) {
  const Icon = card.icon;
  const colors = colorMap[card.color];
  return (
    <div className="card p-5 animate-fade-up">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${colors.text}`} />
        </div>
        <div className={`flex items-center gap-1 text-xs font-medium ${card.trendUp ? 'text-accent' : 'text-error'}`}>
          {card.trendUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
          <span>{card.trendUp ? '+' : ''}{card.trend}%</span>
        </div>
      </div>
      <p className="text-sm text-muted mb-1">{card.label}</p>
      <p className="font-display font-bold text-3xl text-primary mb-1">{card.value}</p>
      <p className="text-xs text-secondary">{card.subValue}</p>
    </div>
  );
}

function AgentCard({ agent }: { agent: AgentInfo }) {
  return (
    <div className="card p-4 hover:bg-elevated transition-colors">
      <div className="flex items-center gap-3 mb-3">
        <div className="relative flex-shrink-0">
          <div className={`w-10 h-10 rounded-xl bg-elevated flex items-center justify-center border border-default`}>
            <Cpu className="w-5 h-5 text-secondary" />
          </div>
          <span className={`status-dot status-${agent.status} absolute -bottom-0.5 -left-0.5 ring-2 ring-[var(--bg-card)]`} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-primary truncate">{agent.name}</p>
          <p className="text-xs text-muted truncate">{agent.role}</p>
        </div>
        <span className={`text-xs px-2.5 py-1 rounded-lg font-medium status-${agent.status === 'active' ? 'active' : agent.status === 'error' ? 'error' : agent.status === 'idle' ? 'idle' : 'offline'} flex-shrink-0`}
          style={{
            backgroundColor: agent.status === 'active' ? 'var(--accent-dim)' : agent.status === 'error' ? 'rgba(248,113,113,0.1)' : agent.status === 'idle' ? 'rgba(251,191,36,0.1)' : 'rgba(100,116,139,0.1)',
            color: agent.status === 'active' ? 'var(--accent)' : agent.status === 'error' ? 'var(--error)' : agent.status === 'idle' ? 'var(--warning)' : 'var(--text-muted)',
          }}
        >
          {statusLabels[agent.status]}
        </span>
      </div>

      <p className="text-xs text-secondary mb-3 line-clamp-2">{agent.task}</p>

      {agent.progress > 0 && (
        <div className="mb-2">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${agent.progress}%` }} />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-muted">
        <div className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          <span>{agent.lastActive}</span>
        </div>
        {agent.progress > 0 && <span className="text-accent font-medium">{agent.progress}%</span>}
      </div>
    </div>
  );
}

export function DashboardView() {
  const activeAgents = agents.filter((a) => a.status === 'active').length;
  const errorAgents = agents.filter((a) => a.status === 'error').length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statsCards.map((card) => (
          <StatCardItem key={card.id} card={card} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card p-5">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-accent" />
                <h3 className="font-display font-bold text-base text-primary">مراقب حالة وكلاء الذكاء</h3>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-secondary">
                  <span className="status-dot status-active" /> {activeAgents} نشط
                </span>
                {errorAgents > 0 && (
                  <span className="flex items-center gap-1.5 text-error">
                    <span className="status-dot status-error" /> {errorAgents} خطأ
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {agents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card p-5">
            <h3 className="font-display font-bold text-base text-primary mb-4">نشاط النظام</h3>
            <div className="space-y-3">
              {[
                { label: 'محتوى منشور اليوم', value: '47', pct: 78 },
                { label: 'سكريبتات قيد التوليد', value: '8', pct: 52 },
                { label: 'تفاعلات معالجة', value: '1.2K', pct: 91 },
                { label: 'موافقات معلقة', value: '4', pct: 33 },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-secondary">{item.label}</span>
                    <span className="text-xs font-bold text-primary">{item.value}</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-5 bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-elevated)]">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-accent-dim flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-accent" />
              </div>
              <h3 className="font-display font-bold text-sm text-primary">أداء المنصات</h3>
            </div>
            <div className="space-y-2.5">
              {[
                { name: 'يوتيوب', engagement: '12.4%', up: true },
                { name: 'إنستغرام', engagement: '9.8%', up: true },
                { name: 'تيك توك', engagement: '15.2%', up: true },
                { name: 'إكس', engagement: '4.1%', up: false },
              ].map((p) => (
                <div key={p.name} className="flex items-center justify-between">
                  <span className="text-sm text-secondary">{p.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-primary">{p.engagement}</span>
                    {p.up ? (
                      <TrendingUp className="w-3.5 h-3.5 text-accent" />
                    ) : (
                      <TrendingDown className="w-3.5 h-3.5 text-error" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="card p-4 w-full flex items-center justify-between hover:bg-elevated transition-colors group">
            <span className="text-sm font-medium text-primary">عرض التقرير الكامل</span>
            <ArrowLeft className="w-4 h-4 text-accent group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
