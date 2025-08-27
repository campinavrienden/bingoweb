// import { useEffect } from 'react';
import Circle from '../../components/Circle';
import KioskButton from '../../components/KioskButton';
import { inject } from '../../components/Provider';
import type { IStore } from '../../stores/store';
// import { useNotifier } from '../hooks/notifier';

type Props = {
  store: IStore;
};

const Client = inject("store")(({store}: Props) => {
  // const [count, setCount] = useState(0);
  // const notifier = useNotifier();

  // useEffect(() => {
  //   if (store.getCurrent) {
  //     notifier.notify(`Bingonummer ${store.getCurrent?.toString()}`, `Huidig: ${store.getCurrent}\nVorige: ${store.getOther?.join(', ')}`);
  //     navigator.vibrate([200, 100, 200]);

  //   }
  // }, [store.getCurrent])

  return (
    <>
      <KioskButton />

      <div className="overflow-hidden relative h-[100dvh]  bg-bingo-lightgreen w-full flex justify-center align-middle">
        <div className="absolute inset-0 bg-bottom bg-cover scale-300 overflow-hidden  lg:bg-no-repeat  lg:bg-[url('/lg-bg.png')] lg:bg-zoom"></div>
        <div className="h-[100dvh] z-10  w-full justify-center flex flex-col gap-4 p-4 lg:max-w-[55dvw]">
          {/* Top 75% */}
          <div className="flex-[3] flex items-center justify-center max-h-[75%]">
            <div className="aspect-square w-full max-w-[calc(75vh-2rem)] flex items-center justify-center text-white text-4xl font-bold">
              <Circle className="bg-[url('/bol_alleen.png')] bg-cover bg-center shadow-round shadow-bingo-blue  text-shadow-gray-100 text-shadow-md " ratio={0.5} number={store.getCurrent} bgColor="" />
            </div> {/* shadow-[#0E2841] */}
          </div>

          <div className="flex-[0] flex justify-center items-center gap-4 max-h-[25%]">
            {store.getOther?.map((o, idx) =>
              <div
                key={idx}
                className="w-1/3 max-h-full aspect-square flex items-center justify-center text-white text-xl font-semibold"
              ><Circle className='shadow-2xl shadow-bingo-lightgreen text-shadow-white text-shadow-md' ratio={0.5} number={o} bgColor='bg-bingo-blue' />
              </div>)}
          </div>
        </div>
      </div>
    </>
  )
});

export default Client
