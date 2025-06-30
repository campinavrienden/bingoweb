export { };

declare global {
    interface Window {
        RUNTIME_ENV: RUNTIME_ENV;  // or a specific type instead of any
    }

    interface RUNTIME_ENV {
        MQTTURL
    }
}