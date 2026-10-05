import { useState } from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { DashboardView } from '@/views/DashboardView';
import { CharactersView } from '@/views/CharactersView';
import { ScriptsView } from '@/views/ScriptsView';
import { OmniRouteView } from '@/views/OmniRouteView';
import { ApprovalsView } from '@/views/ApprovalsView';
import type { ViewKey } from '@/types';

function App() {
  const [activeView, setActiveView] = useState<ViewKey>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView />;
      case 'characters':
        return <CharactersView />;
      case 'scripts':
        return <ScriptsView />;
      case 'omniroute':
        return <OmniRouteView />;
      case 'approvals':
        return <ApprovalsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <ThemeProvider>
      <div className="flex min-h-screen bg-primary" dir="rtl">
        <Sidebar
          activeView={activeView}
          onNavigate={setActiveView}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <div className="flex-1 flex flex-col min-w-0">
          <Header
            activeView={activeView}
            onMenuClick={() => setSidebarOpen(true)}
          />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
            {renderView()}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
