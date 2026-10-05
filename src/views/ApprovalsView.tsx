import { useState } from 'react';
import { approvalItems, statusLabels, priorityLabels, typeLabels } from '@/data';
import type { ApprovalItem } from '@/types';
import {
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  FileText,
  Users,
  Megaphone,
  MessageSquare,
} from 'lucide-react';

const priorityStyles: Record<string, { bg: string; color: string }> = {
  low: { bg: 'rgba(100,116,139,0.1)', color: 'var(--text-muted)' },
  medium: { bg: 'rgba(96,165,250,0.1)', color: 'var(--info)' },
  high: { bg: 'rgba(251,191,36,0.1)', color: 'var(--warning)' },
  urgent: { bg: 'rgba(248,113,113,0.1)', color: 'var(--error)' },
};

const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  content: MessageSquare,
  script: FileText,
  campaign: Megaphone,
  character: Users,
};

type FilterKey = 'all' | 'pending' | 'approved' | 'rejected';

function ApprovalRow({
  item,
  onApprove,
  onReject,
}: {
  item: ApprovalItem;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}) {
  const Icon = typeIcons[item.type] ?? FileText;
  const prioStyle = priorityStyles[item.priority] ?? priorityStyles.low;
  return (
    <div className="card p-5 hover:bg-elevated transition-colors">
      <div className="flex items-start gap-4">
        <div className="w-11 h-11 rounded-xl bg-elevated flex items-center justify-center border border-default flex-shrink-0">
          <Icon className="w-5 h-5 text-secondary" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="min-w-0">
              <h3 className="text-sm font-medium text-primary truncate">{item.title}</h3>
              <p className="text-xs text-muted mt-0.5">{item.summary}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span
                className="text-xs px-2.5 py-1 rounded-lg font-medium"
                style={{ backgroundColor: prioStyle.bg, color: prioStyle.color }}
              >
                {priorityLabels[item.priority]}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-muted mb-3">
            <span>{typeLabels[item.type]}</span>
            <span>•</span>
            <span>{item.submittedBy}</span>
            <span>•</span>
            <span>{item.submittedAt}</span>
          </div>

          {item.status === 'pending' ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onApprove(item.id)}
                className="flex items-center gap-1.5 bg-accent text-white px-4 py-2 rounded-lg text-xs font-medium hover:opacity-90 transition-opacity"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>موافقة</span>
              </button>
              <button
                onClick={() => onReject(item.id)}
                className="flex items-center gap-1.5 bg-elevated text-error px-4 py-2 rounded-lg text-xs font-medium border border-default hover:bg-red-500/10 transition-colors"
              >
                <XCircle className="w-3.5 h-3.5" />
                <span>رفض</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span
                className="text-xs px-3 py-1.5 rounded-lg font-medium"
                style={{
                  backgroundColor: item.status === 'approved' ? 'var(--accent-dim)' : 'rgba(248,113,113,0.1)',
                  color: item.status === 'approved' ? 'var(--accent)' : 'var(--error)',
                }}
              >
                {statusLabels[item.status]}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function ApprovalsView() {
  const [items, setItems] = useState(approvalItems);
  const [filter, setFilter] = useState<FilterKey>('all');

  const handleApprove = (id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status: 'approved' } : i)));
  };
  const handleReject = (id: string) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status: 'rejected' } : i)));
  };

  const filtered = items.filter((i) => filter === 'all' || i.status === filter);
  const pendingCount = items.filter((i) => i.status === 'pending').length;
  const approvedCount = items.filter((i) => i.status === 'approved').length;
  const urgentCount = items.filter((i) => i.priority === 'urgent' && i.status === 'pending').length;

  const filters: { key: FilterKey; label: string; count: number }[] = [
    { key: 'all', label: 'الكل', count: items.length },
    { key: 'pending', label: 'بانتظار', count: pendingCount },
    { key: 'approved', label: 'موافق عليه', count: approvedCount },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card p-5 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-amber-500/10 flex items-center justify-center">
            <Clock className="w-5 h-5 text-warning" />
          </div>
          <div>
            <p className="text-xs text-muted">بانتظار المراجعة</p>
            <p className="font-display font-bold text-2xl text-primary">{pendingCount}</p>
          </div>
        </div>
        <div className="card p-5 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-accent-dim flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-accent" />
          </div>
          <div>
            <p className="text-xs text-muted">تمت الموافقة</p>
            <p className="font-display font-bold text-2xl text-primary">{approvedCount}</p>
          </div>
        </div>
        <div className="card p-5 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-red-500/10 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-error" />
          </div>
          <div>
            <p className="text-xs text-muted">عاجلة</p>
            <p className="font-display font-bold text-2xl text-primary">{urgentCount}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              filter === f.key
                ? 'bg-accent text-white'
                : 'bg-elevated text-secondary border border-default hover:text-primary'
            }`}
          >
            {f.label}
            <span className={`mr-1.5 text-xs ${filter === f.key ? 'text-white/70' : 'text-muted'}`}>
              ({f.count})
            </span>
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="card p-12 text-center">
            <CheckCircle2 className="w-10 h-10 text-accent mx-auto mb-3" />
            <p className="text-secondary text-sm">لا توجد عناصر في هذه الفئة</p>
          </div>
        ) : (
          filtered.map((item) => (
            <ApprovalRow
              key={item.id}
              item={item}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          ))
        )}
      </div>
    </div>
  );
}
