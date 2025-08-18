import { createContext, useContext, useEffect } from "react";

export interface INotifier {
    notify: (message: string, body: string) => void;
}

const notifier: INotifier = {
    notify: (message: string, body: string) => {
        const options = {
            body: body,
            icon: '/logo_alleen_zwart.svg',
            badge: "/logo_alleen_zwart.svg",       // small monochrome icon for status bar (Android)
            image: "/logo_alleen_zwart.svg",   // large image (some platforms only)
            silent: true,
            tag: 'bingo',
            renotify: true,
            requireInteraction: true,  // keeps notification until user dismisses
            actions: [                 // buttons (desktop + Android)
                { action: "open", title: "Open App" },
                { action: "dismiss", title: "Dismiss" }
            ],
        }
        if (Notification.permission === "granted") {
            navigator.serviceWorker.ready.then(reg => {
                navigator.vibrate([200, 100, 200]);
                reg.showNotification(message, options);
            });
            try {
                new Notification(message, options);
            }
            catch {

            }
        }
    }
}

const NotifierContext = createContext(notifier);

export const useNotifier = () => useContext(NotifierContext);

export const Notifier = ({ children }: { children: any }) => {
    useEffect(() => {
        Notification.requestPermission();
    });
    return (
        <NotifierContext.Provider value={notifier}>
            {children}
        </NotifierContext.Provider>
    )
};