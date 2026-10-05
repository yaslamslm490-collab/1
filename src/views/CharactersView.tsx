import { characters, statusLabels } from '@/data';
import type { Character } from '@/types';
import { Plus, MoreVertical, FileText, Heart, Users2 } from 'lucide-react';

const statusStyles: Record<string, { bg: string; color: string }> = {
  active: { bg: 'var(--accent-dim)', color: 'var(--accent)' },
  drafting: { bg: 'rgba(251,191,36,0.1)', color: 'var(--warning)' },
  paused: { bg: 'rgba(100,116,139,0.1)', color: 'var(--text-muted)' },
};

function CharacterCard({ character }: { character: Character }) {
  const style = statusStyles[character.status] ?? statusStyles.paused;
  return (
    <div className="card p-5 group hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${character.avatarColor} flex items-center justify-center flex-shrink-0`}>
            <span className="text-white font-display font-bold text-lg">
              {character.name.charAt(0)}
            </span>
          </div>
          <div>
            <h3 className="font-display font-bold text-base text-primary">{character.name}</h3>
            <p className="text-xs text-muted">{character.archetype}</p>
          </div>
        </div>
        <button className="text-muted hover:text-primary transition-colors p-1">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-2.5 mb-4">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted">الجمهور</span>
          <span className="text-secondary font-medium">{character.audience}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted">النبرة</span>
          <span className="text-secondary font-medium">{character.tone}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {character.platforms.map((p) => (
          <span key={p} className="text-xs px-2.5 py-1 rounded-lg bg-elevated text-secondary border border-default">
            {p}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4 pt-4 border-t border-default">
        <div className="text-center">
          <FileText className="w-4 h-4 text-muted mx-auto mb-1" />
          <p className="font-display font-bold text-sm text-primary">{character.contentCount}</p>
          <p className="text-xs text-muted">محتوى</p>
        </div>
        <div className="text-center">
          <Heart className="w-4 h-4 text-muted mx-auto mb-1" />
          <p className="font-display font-bold text-sm text-primary">{character.engagement}%</p>
          <p className="text-xs text-muted">تفاعل</p>
        </div>
        <div className="text-center">
          <Users2 className="w-4 h-4 text-muted mx-auto mb-1" />
          <p className="font-display font-bold text-sm text-primary">{character.platforms.length}</p>
          <p className="text-xs text-muted">منصات</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span
          className="text-xs px-3 py-1.5 rounded-lg font-medium"
          style={{ backgroundColor: style.bg, color: style.color }}
        >
          {statusLabels[character.status]}
        </span>
        <button className="text-xs text-accent font-medium hover:underline">
          تعديل الشخصية
        </button>
      </div>
    </div>
  );
}

export function CharactersView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="text-sm text-secondary">
            إدارة وتطوير شخصيات الذكاء الاصطناعي الخاصة بشركتك الإعلامية
          </p>
        </div>
        <button className="flex items-center gap-2 bg-accent text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity glow-accent">
          <Plus className="w-4 h-4" />
          <span>شخصية جديدة</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {characters.map((c) => (
          <CharacterCard key={c.id} character={c} />
        ))}
      </div>
    </div>
  );
}
