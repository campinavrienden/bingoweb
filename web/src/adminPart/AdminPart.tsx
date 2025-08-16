import React from 'react';
import { NumbersGrid } from './NumbersGrid';
import { useStoreSnapshot } from './stores/adminstore';
import { ControlsPanel } from './ControlsPanel';

export const AdminPart: React.FC = () => {
  const store = useStoreSnapshot();

  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      {/* Header */}
      <header className="bg-blue-700 text-white p-4 text-lg font-semibold">
        Bingo Admin Panel
      </header>

      {/* Main Content */}
      <main className="grid grid-cols-1 md:grid-cols-[1fr_auto]">
        {/* Numbers */}
        <div className="bg-white dark:bg-gray-950">
          <NumbersGrid total={store.max} drawn={[...store.drawn]} />
        </div>

        {/* Control Panel */}
        <aside className="bg-white dark:bg-gray-950 w-64 border-l border-gray-950 dark:border-white p-4 flex flex-col gap-4">
         <ControlsPanel />
        </aside>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-center text-sm p-2 text-gray-600">
        &copy; 2025 Bingo Admin
      </footer>
    </div>
  );
};

export default AdminPart