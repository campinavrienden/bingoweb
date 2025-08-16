import { createContext, useContext, useEffect } from 'react';
import { proxy, useSnapshot } from 'valtio'
import useAPI from '../adminPart/http/api'
import { useMQTT } from '../hooks/useMQTT'
import type { IBingo } from '../models/IBingo';

const BROKER_URL = `${import.meta.env.VITE_MQTTURL}`;
const BROKER_USERNAME = `${import.meta.env.VITE_MQTTUSERNAME}`;
const BROKER_PASSWORD = `${import.meta.env.VITE_MQTTPASSWORD}`;

const TOPIC = 'bingo';

const api = useAPI();



const store = proxy({
  connected: false,
  max: 0,
  maxInput: 90,
  numbers: [] as number[],
  drawn: [] as number[],

  setIsConnected(connected: boolean) {
    store.connected = connected
  },

  get canStop() {
    return this.canDraw;
  },

  get canDraw() {
    return this.max > 0;
  },

  get canGenerate() {
    return this.maxInput > 0 && !this.canDraw;
  },

  get getCurrent(): number | undefined {
    return [...store.drawn].pop();
  },

  get getOther(): number[] | undefined {
    var values = [...store.drawn];
    values.pop();
    return values.slice(-3);
  },

  setMaxInput(max: number) {
    store.maxInput = max
  },

  reset() {
    if(!store.canStop)return;
    api.bingo.stop()
    // store.numbers = []
    // store.drawn = []
    // store.max = 0;
  },

  generate() {
    if (!store.canGenerate) return;
    store.max = store.maxInput;
    // store.numbers = Array.from({ length: store.max }, (_, i) => i + 1)
    // store.drawn = []
    api.bingo.start(store.max)
  },

  draw() {
    if (!store.canDraw) return;
    api.bingo.draw()
  },
});

// 🌐 Create React Context
const StoreContext = createContext(store);

export const useStore = () => useContext(StoreContext);

// 🔄 Hook to access reactive snapshot (optional)
export const useStoreSnapshot = () => useSnapshot(useStore());

// 🧩 Provider component that wires up MQTT
export const StoreProvider = ({ children }: { children: any }) => {
  const { message, connected } = useMQTT(BROKER_URL, TOPIC, BROKER_USERNAME, BROKER_PASSWORD);

  useEffect(() => {
    store.setIsConnected(connected);
    if (message && JSON.parse(message.payload)) {
      try {
        const bingo: IBingo = JSON.parse(message.payload)
        if (bingo) {
          if (store.max != bingo.max) {
            store.max = bingo.max
          }
          store.drawn = bingo.values
        }
      }
      catch (reason) {
        console.error(reason);
      }
    }
  }, [message, connected])
  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
};