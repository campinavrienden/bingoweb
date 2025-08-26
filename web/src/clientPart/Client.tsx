// import { useEffect } from 'react';
import Circle from '../components/Circle';
import KioskButton from '../components/KioskButton';
// import { useNotifier } from '../hooks/notifier';
import { useStoreSnapshot } from '../stores/store';

function Client() {
  // const [count, setCount] = useState(0);
  const store = useStoreSnapshot();
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

      <div className="h-[100dvh]  bg-[#d0e0e3] w-full flex justify-center align-middle lg:bg-cover lg:bg-no-repeat  lg:bg-[url('/lg-bg.png')] lg:bg-zoom">
        <div className="h-[100dvh] w-full justify-center flex flex-col gap-4 p-4 lg:max-w-[55dvw]">
          {/* Top 75% */}
          <div className="flex-[3] flex items-center justify-center max-h-[75%]">
            <div className="aspect-square w-full max-w-[calc(75vh-2rem)] flex items-center justify-center text-white text-4xl font-bold">
              <Circle className="bg-[url('/bol_alleen.png')] bg-cover bg-center shadow-round shadow-[#0E2841]  text-shadow-gray-100 text-shadow-md " ratio={0.5} number={store.getCurrent} bgColor="" />
            </div> {/* shadow-[#0E2841] */}
          </div>

          <div className="flex-[0] flex justify-center items-center gap-4 max-h-[25%]">
            {store.getOther?.map((o, idx) =>
              <div
                key={idx}
                className="w-1/3 max-h-full aspect-square flex items-center justify-center text-white text-xl font-semibold"
              ><Circle className='shadow-2xl shadow-[#d0e0e3] text-shadow-white text-shadow-md' ratio={0.5} number={o} bgColor='bg-[#0E2841]' />
              </div>)}
          </div>
        </div>
      </div>
    </>
  )
}

export default Client
