import { useEffect } from "react";
import { StoreContext, store } from './store'
import { useMQTTBroker } from "../hooks/useMQTTBroker";

export const StoreProvider = ({ children }: { children: any }) => {
    const message = useMQTTBroker();
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