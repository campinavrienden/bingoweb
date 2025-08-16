// ControlsPanel.tsx
import { useStoreSnapshot } from './stores/adminstore'

export function ControlsPanel() {
  const adminstore = useStoreSnapshot();

  return (
    <div className="flex flex-col gap-4 w-full max-w-xs">
      <label className="font-medium">Max Numbers</label>
      <input
        type="number"
        className="border rounded px-2 py-1"
        min={0}
        hidden={adminstore.canDraw}
        value={adminstore.maxInput}
        disabled={adminstore.canDraw}
        onChange={(e) => adminstore.setMaxInput(parseInt(e.target.value) || 0)}
      />

      <button
        className={`px-4 py-2 rounded text-white ${adminstore.canStop
          ? 'bg-red-600 hover:bg-red-700'
          : 'bg-gray-400 cursor-not-allowed'
        }`}
        disabled={!adminstore.canStop}
        onClick={adminstore.reset}
      >
        Stop
      </button>

      <button
        className={`px-4 py-2 rounded text-white ${adminstore.canGenerate
            ? 'bg-blue-600 hover:bg-blue-700'
            : 'bg-gray-400 cursor-not-allowed'
          }`}
        onClick={() => adminstore.generate()}
        disabled={!adminstore.canGenerate}
      >
        Generate
      </button>

      <button
        className={`text-white px-4 py-2 rounded ${adminstore.canDraw
            ? 'bg-green-600 hover:bg-green-700'
            : 'bg-gray-400 cursor-not-allowed'
          }`}
        onClick={adminstore.draw}
        disabled={!adminstore.canDraw}
      >
        Draw
      </button>
    </div>
  )
}
