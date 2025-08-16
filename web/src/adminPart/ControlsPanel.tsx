// ControlsPanel.tsx
import { useState } from 'react'
import { useStoreSnapshot } from './stores/adminstore'

export function ControlsPanel() {
  const adminstore = useStoreSnapshot();
  const [inputMax, setInputMax] = useState(adminstore.max)

  return (
    <div className="flex flex-col gap-4 w-full max-w-xs">
      <label className="font-medium">Max Numbers</label>
      <input
        type="number"
        className="border rounded px-2 py-1"
        min={1}
        value={inputMax}
        onChange={(e) => setInputMax(parseInt(e.target.value) || 1)}
      />

      <button
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        onClick={adminstore.reset}
      >
        Stop
      </button>

      <button
        className={`px-4 py-2 rounded text-white ${
          adminstore.resetCalled
            ? 'bg-blue-600 hover:bg-blue-700'
            : 'bg-gray-400 cursor-not-allowed'
        }`}
        onClick={() => adminstore.start(inputMax)}
        disabled={!adminstore.resetCalled}
      >
        Generate
      </button>

      <button
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        onClick={adminstore.draw}
        disabled={!adminstore.started}
      >
        Draw
      </button>
    </div>
  )
}
