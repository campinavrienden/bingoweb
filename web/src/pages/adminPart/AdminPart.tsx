import React from 'react';
import { NumbersGrid } from './NumbersGrid';
import { type IStore } from '../../stores/store';
import { ControlsPanel } from './ControlsPanel';
import { inject } from '../../components/Provider';

type Props = {
  store: IStore;
};

export const AdminPart: React.FC = inject("store")(({store}: Props) => {

  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      {/* Header */}
      <header className="bg-pink-700 text-white p-4 text-lg font-semibold">
        <img src='logo_alleen_wit.svg' className='max-h-full inline-block h-8 px-3 translate-y-[-0.2rem]' />Bingo Admin Panel
      </header>

      {/* Main Content */}
      <main className="grid grid-cols-1 md:grid-cols-[1fr_auto]">
        {/* Numbers */}
        <div className="bg-bingo-lightgreen dark:bg-gray-950">
          <NumbersGrid total={store.max} drawn={[...store.drawn || []]} />
        </div>

        {/* Control Panel */}
        <aside className="bg-bingo-lightgreen dark:bg-gray-950 w-[60dvh] border-l border-gray-400 dark:border-white p-4 flex flex-col gap-4">
         <ControlsPanel />
        </aside>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-center text-sm p-2 text-gray-600">
        &copy; 2025 Campinavrienden vzw
      </footer>
    </div>
  );
});

export default AdminPart