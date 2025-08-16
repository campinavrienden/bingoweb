// ControlsPanel.tsx
import Circle from '../components/Circle';
import { useStoreSnapshot } from '../stores/store'

export function ControlsPanel() {
  const store = useStoreSnapshot();

  return (

    <div className="flex flex-col gap-4 w-full max-w-xs">
      <Circle number={store.getCurrent} />
      {!store.canDraw && <label className="font-medium dark:text-white">Max. nummers</label>}
      <input
        type="number"
        className="border  dark:text-white dark:border-gray-700 rounded px-2 py-1"
        min={0}
        hidden={store.canDraw}
        value={store.maxInput}
        disabled={store.canDraw}
        onChange={(e) => store.setMaxInput(parseInt(e.target.value) || 0)}
      />

      <button
        className={`px-4 py-2 rounded text-white ${store.canStop
          ? 'bg-red-600 hover:bg-red-700'
          : 'bg-gray-400 cursor-not-allowed'
          }`}
        disabled={!store.canStop}
        onClick={store.reset}
      >
        Stop
      </button>

      <button
        className={`px-4 py-2 rounded text-white ${store.canGenerate
          ? 'bg-blue-600 hover:bg-blue-700'
          : 'bg-gray-400 cursor-not-allowed'
          }`}
        onClick={() => store.generate()}
        disabled={!store.canGenerate}
      >
        Nummers genereren
      </button>

      <button
        className={`text-white px-4 py-2 rounded ${store.canDraw
          ? 'bg-green-600 hover:bg-green-700'
          : 'bg-gray-400 cursor-not-allowed'
          }`}
        onClick={store.draw}
        disabled={!store.canDraw}
      >
        Nummer trekken
      </button>
    </div>
  )
}
