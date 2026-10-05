export type ViewKey =
  | 'dashboard'
  | 'characters'
  | 'scripts'
  | 'omniroute'
  | 'approvals';

export interface NavItem {
  key: ViewKey;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface StatCard {
  id: string;
  label: string;
  value: string;
  subValue: string;
  trend: number;
  trendUp: boolean;
  icon: React.ComponentType<{ className?: string }>;
  color: 'accent' | 'info' | 'warning' | 'error';
}

export interface AgentInfo {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'idle' | 'error' | 'offline';
  task: string;
  progress: number;
  lastActive: string;
}

export interface Character {
  id: string;
  name: string;
  archetype: string;
  audience: string;
  tone: string;
  platforms: string[];
  contentCount: number;
  engagement: number;
  status: 'active' | 'drafting' | 'paused';
  avatarColor: string;
}

export interface Script {
  id: string;
  title: string;
  character: string;
  platform: string;
  status: 'draft' | 'review' | 'approved' | 'published';
  wordCount: number;
  updatedAt: string;
  hook: string;
  body: string;
  cta: string;
}

export interface Route {
  id: string;
  name: string;
  type: 'input' | 'output' | 'transform';
  source: string;
  destination: string;
  status: 'running' | 'paused' | 'error';
  throughput: string;
  latency: string;
}

export interface ApprovalItem {
  id: string;
  type: 'content' | 'script' | 'campaign' | 'character';
  title: string;
  submittedBy: string;
  submittedAt: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'approved' | 'rejected';
  summary: string;
}
