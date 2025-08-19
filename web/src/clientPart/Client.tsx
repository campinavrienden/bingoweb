// import { useEffect } from 'react';
import Circle from '../components/Circle';
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
    <div className="h-[100dvh] w-full flex justify-center align-middle">
      <div className="h-[100dvh] w-full justify-center bg-gray-100 flex flex-col gap-4 p-4 lg:max-w-[75%]">
        {/* Top 75% */}
        <div className="flex-[3] flex items-center justify-center max-h-[75%]">
          <div className="aspect-square w-full max-w-[calc(75vh-2rem)] flex items-center justify-center text-white text-4xl font-bold">
            <Circle ratio={0.5} number={store.getCurrent} bgColor='bg-amber-400' />
          </div>
        </div>

        <div className="flex-[0] flex justify-center items-center gap-4 max-h-[25%]">
          {store.getOther?.map((o, idx) =>
            <div
              key={idx}
              className="w-1/3 max-h-full aspect-square flex items-center justify-center text-white text-xl font-semibold"
            ><Circle ratio={0.5} number={o} bgColor='bg-amber-800' />
            </div>)}
        </div>
      </div>
    </div>
  )
}

export default Client
