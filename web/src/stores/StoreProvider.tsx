import { useEffect } from "react";
import { StoreContext, store } from './store'
import { useMQTTBroadcast } from "../hooks/useMQTTBroadcast";

export const StoreProvider = ({ children }: { children: any }) => {
    const message = useMQTTBroadcast();
    useEffect(() => {
        if (message) {
            try {
                const bingo = message.payload;
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
    }, [message])
    return (
        <StoreContext.Provider value={store}>
            {children}
        </StoreContext.Provider>
    );
};