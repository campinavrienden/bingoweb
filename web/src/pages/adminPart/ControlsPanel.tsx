// ControlsPanel.tsx
import { useState, useEffect } from 'react';
import Circle from '../../components/Circle';
import { type IStore } from '../../stores/store'
import ConfirmModal from '../../components/ConfirmModel';
import { inject } from '../../components/Provider';
import { useKeyPress } from './useKeyPress'


type Props = {
  store: IStore;
};

export const ControlsPanel = inject("store")(({ store }: Props) => {
  const [stopModalIsOpen, setStopModalIsOpen] = useState(false);
  const pageDown = useKeyPress("PageDown");

  useEffect(() => {
    if (pageDown) {
      if (store.canDraw) {
        const draw = async () => {
          await store.draw();
        }
        draw();
      }
    }
  }, [pageDown])

  const stopClick = () => {
    setStopModalIsOpen(true);
  }
  const stopModalOnClose = (confirmed: boolean) => {
    setStopModalIsOpen(false);
    if (confirmed) {
      store.reset();
    }
  }
  return (
    <>
      <ConfirmModal isOpen={stopModalIsOpen} onClose={stopModalOnClose}
        cancelLabel='Annuleren' confirmLabel='Bevestigen' description='Weet je zeker dat je wil stoppen?' title='Stoppen' />
      <div className="flex flex-col gap-4 w-full">
        {store.canDraw && <Circle className="bg-[url('/bol_alleen.png')] bg-cover bg-center shadow-round shadow-bingo-blue  text-shadow-gray-100 text-shadow-md " number={store.getCurrent} size='max-w' />}
        <label hidden={store.canDraw} className="font-medium dark:text-white">Max. nummers</label>
        <input
          type="number"
          className="border  dark:text-white dark:border-gray-700 rounded px-2 py-1"
          min={0}
          hidden={store.canDraw}
          value={store.maxInput}
          disabled={store.canDraw}
          onChange={(e) => store.setMaxInput(parseInt(e.target.value) || 0)}
        />
        <div className="flex justify-end">
          <div hidden={store.canDraw} className="grid grid-cols-2 gap-4 w-[8dvw]">
            <button onClick={() => store.startWith(75)}
              className="py-2 aspect-square h-16 px-4 rounded bg-amber-800 text-white">
              75
            </button>
            <button onClick={() => store.startWith(90)}
              className="py-2 aspect-square h-16 px-4 rounded bg-amber-800 text-white">
              90
            </button>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4 w-full">
          <button
            className={`text-white py-4 md:px-4 md:aspect-square  rounded ${store.canGenerate
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-400 cursor-not-allowed'
              }`}
            onClick={() => store.generate()}
            disabled={!store.canGenerate}
          >
            Genereer nummers
          </button>

          <button
            className={`text-white md:px-4 md:py-2 md:aspect-square rounded ${store.canDraw
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-gray-400 cursor-not-allowed'
              }`}
            onClick={store.draw}
            disabled={!store.canDraw}
          >
            Nummer trekken
          </button>

          <button
            className={`text-white md:px-4 md:py-2 md:aspect-square  rounded ${store.canStop
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-gray-400 cursor-not-allowed'
              }`}
            disabled={!store.canStop}
            onClick={stopClick}
          >
            Stop
          </button>
        </div>
        <div className="grid md:grid-cols-2 gap-4 w-full">
          <button
            className={`text-white font-bingo-overlay py-4 md:px-4  rounded bg-yellow-500 hover:bg-yellow-600 ${store.isBingo && 'animate-wiggle' }`}
            onClick={() => store.doBingo()}
          >BINGO!</button>
          <button
            className={`text-white font-bingo-overlay py-4 md:px-4  rounded bg-yellow-600 hover:bg-yellow-700 ${store.isBreak && 'animate-wiggle' }`}
            onClick={() => store.doBreak()}
          >Pauze</button>
        </div>
      </div>
    </>
  )
})