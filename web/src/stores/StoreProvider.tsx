import { useEffect } from "react";
import { StoreContext, store } from './store'
import { useMQTT } from "../hooks/mqtt";
import type { IBingo } from "../models/IBingo";

const BROKER_URL = `${import.meta.env.VITE_MQTTURL}`;
const BROKER_USERNAME = `${import.meta.env.VITE_MQTTUSERNAME}`;
const BROKER_PASSWORD = `${import.meta.env.VITE_MQTTPASSWORD}`;

const TOPIC = 'bingo';

export const StoreProvider = ({ children }: { children: any }) => {
    const { message, connected } = useMQTT(BROKER_URL, TOPIC, BROKER_USERNAME, BROKER_PASSWORD);
  
    useEffect(() => {
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