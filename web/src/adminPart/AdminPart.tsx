import React, { useState } from 'react';
import { NumbersGrid } from './NumbersGrid';
import { useStoreSnapshot } from './stores/adminstore';

const AdminPart: React.FC = () => {
  const store = useStoreSnapshot();
  const [inputMax, setInputMax] = useState(90);

  const handleReset = () => {
    store.reset();
  };

  const handleStart = () => {
    store.start(inputMax);
  };

  const handleDraw = () => {
    store.draw();
  };

  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      {/* Header */}
      <header className="bg-blue-700 text-white p-4 text-lg font-semibold">
        Bingo Admin Panel
      </header>

      {/* Main Content */}
      <main className="grid grid-cols-1 md:grid-cols-[1fr_auto]">
        {/* Numbers */}
        <div className="bg-gray-50">
          <NumbersGrid total={store.max} drawn={[...store.drawn]} />
        </div>

        {/* Control Panel */}
        <aside className="bg-white border-l p-4 flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Max Number</label>
            <input
              type="number"
              className="border px-2 py-1 w-full rounded"
              value={inputMax}
              onChange={(e) => setInputMax(Number(e.target.value))}
              min={1}
            />
          </div>
          <button
            onClick={handleReset}
            className="bg-red-600 hover:bg-red-700 text-white py-1 px-4 rounded"
          >
            Stop / Reset
          </button>
          <button
            onClick={handleStart}
            disabled={store.drawn.length > 0}
            className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white py-1 px-4 rounded"
          >
            Generate
          </button>
          <button
            onClick={handleDraw}
            className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-4 rounded"
          >
            Draw
          </button>
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