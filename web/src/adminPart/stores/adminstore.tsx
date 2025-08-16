import { createContext, useContext, useEffect } from 'react';
import { proxy, useSnapshot } from 'valtio'
import useAPI from '../http/api'
import { useMQTT } from '../../hooks/useMQTT'
import type { IAdminBingo } from '../../models/IAdminBingo';

const BROKER_URL = `${import.meta.env.VITE_MQTTURL}`;
const BROKER_USERNAME = `${import.meta.env.VITE_MQTTUSERNAME}`;
const BROKER_PASSWORD = `${import.meta.env.VITE_MQTTPASSWORD}`;

const TOPIC = 'adminbingo';

const api = useAPI();



const adminstore = proxy({
  max: 0,
  maxInput: 90,
  numbers: [] as number[],
  drawn: [] as number[],

  get canStop() {
    return this.canDraw;
  },

  get canDraw() {
    return this.max > 0;
  },

  get canGenerate() {
    return this.maxInput > 0 && !this.canDraw;
  },

  setMaxInput(max: number) {
    adminstore.maxInput = max
  },

  reset() {
    if(!adminstore.canStop)return;
    api.bingo.stop()
    adminstore.numbers = []
    adminstore.drawn = []
    adminstore.max = 0;
  },

  generate() {
    if (!adminstore.canGenerate) return;
    adminstore.max = adminstore.maxInput;
    adminstore.numbers = Array.from({ length: adminstore.max }, (_, i) => i + 1)
    adminstore.drawn = []
    api.bingo.start(adminstore.max)
  },

  draw() {
    if (!adminstore.canDraw) return;
    api.bingo.draw()
  },
});

// 🌐 Create React Context
const StoreContext = createContext(adminstore);

export const useStore = () => useContext(StoreContext);

// 🔄 Hook to access reactive snapshot (optional)
export const useStoreSnapshot = () => useSnapshot(useStore());

// 🧩 Provider component that wires up MQTT
export const StoreProvider = ({ children }: { children: any }) => {
  const { message } = useMQTT(BROKER_URL, TOPIC, BROKER_USERNAME, BROKER_PASSWORD);

  useEffect(() => {
    if (message && JSON.parse(message.payload)) {
      try {
        const bingo: IAdminBingo = JSON.parse(message.payload)
        if (bingo) {
          if (adminstore.max != bingo.max) {
            adminstore.max = bingo.max
          }
          adminstore.drawn = bingo.values
        }
      }
      catch (reason) {
        console.error(reason);
      }
    }
  }, [message])
  return (
    <StoreContext.Provider value={adminstore}>
      {children}
    </StoreContext.Provider>
  );
};