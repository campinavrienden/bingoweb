/// <reference types="vite/client" />
/// <reference lib="webworker" />
// ✅ Vite env variabelen
import mqtt from 'mqtt';
declare const self: ServiceWorkerGlobalScope;

const BROKER_URL = `${import.meta.env.VITE_MQTTURL}`;
const BROKER_USERNAME = `${import.meta.env.VITE_MQTTUSERNAME}`;
const BROKER_PASSWORD = `${import.meta.env.VITE_MQTTPASSWORD}`;

const TOPIC = 'bingo';
let latestPayload: any = null;
const channel = new BroadcastChannel('bingo-channel');

self.addEventListener('install', _ => {
    console.log('[SW] Installed');
    self.skipWaiting(); // activeer direct
});

self.addEventListener('activate', event => {
    console.log('[SW] Activated');
    (event as ExtendableEvent).waitUntil(connectToMQTT());
});

// Respond to client asking for latest payload
self.addEventListener('message', (event) => {
    if (event.data === 'get-latest-mqtt') {
        event.source?.postMessage({
            type: 'latest-mqtt',
            payload: latestPayload,
        });
    }
});

function connectToMQTT(): Promise<void> {
    return new Promise((resolve, reject) => {
        const client = mqtt.connect(BROKER_URL, {
            username: BROKER_USERNAME,
            password: BROKER_PASSWORD
        });
        client.on('connect', () => {
            console.log('Verbonden met MQTT');
            client.subscribe(TOPIC, (err) => {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });

        client.on('message', (topic, message) => {
            latestPayload = { topic, payload: message.toString(), timestamp: Date.now() };
            channel.postMessage(latestPayload);
        });

        client.on('error', err => {
            console.error('[SW] MQTT error:', err);
            reject(err);
        });
    });
}
