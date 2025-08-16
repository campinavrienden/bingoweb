import '../App.css'
import Circle from '../components/Circle';
import { useStoreSnapshot } from '../stores/store';

function ClientPart() {
  // const [count, setCount] = useState(0);
  const store = useStoreSnapshot();
  return (
    <div className="fixed inset-0 bg-gray-100 flex flex-col gap-4 p-4">
      {/* Top 75% */}
      <div className="flex-[3] flex items-center justify-center">
        <div className="aspect-square w-full max-w-[calc(75vh-2rem)] flex items-center justify-center text-white text-4xl font-bold">
          <Circle ratio={0.5} number={store.getCurrent} bgColor='bg-blue-500' />
        </div>
      </div>

      <div className="flex-[1] flex justify-center items-center gap-4">
        {store.getOther?.map(o => <div className="h-full aspect-square rounded-full bg-red-500 flex items-center justify-center text-white text-xl font-semibold">
          <Circle ratio={0.5} number={o} bgColor='bg-red-500' />
        </div>)}
        {/* <div className="h-full aspect-square rounded-full bg-red-500 flex items-center justify-center text-white text-xl font-semibold">
          <Circle ratio={0.5} number={10} bgColor='bg-red-500' />
        </div>
        <div className="h-full aspect-square rounded-full bg-green-500 flex items-center justify-center text-white text-xl font-semibold">
          <Circle ratio={0.5} number={20} />
        </div>
        <div className="h-full aspect-square rounded-full bg-yellow-500 flex items-center justify-center text-white text-xl font-semibold">
          <Circle ratio={0.5} number={30} />
        </div> */}
      </div>
    </div>
  )
}

export default ClientPart
