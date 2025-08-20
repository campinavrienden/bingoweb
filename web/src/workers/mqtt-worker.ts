// import mqtt from 'mqtt';

// export { }; // Ensures this file is treated as a module

// declare global {
//     var onconnect: (e: MessageEvent) => void;
// }


// const BROKER_URL = `${import.meta.env.VITE_MQTTURL}`;
// const BROKER_USERNAME = `${import.meta.env.VITE_MQTTUSERNAME}`;
// const BROKER_PASSWORD = `${import.meta.env.VITE_MQTTPASSWORD}`;
// const TOPIC = 'bingo';

// let ports: MessagePort[] = [];
// let lastPayload: any = null;

// const client = mqtt.connect(BROKER_URL, {
//     username: BROKER_USERNAME,
//     password: BROKER_PASSWORD
// });

// client.on('connect', () => {
//     console.log('✅ MQTT connected');
//     client.subscribe(TOPIC);
// });

// client.on('message', (topic, message) => {
//     const payload = {
//         topic,
//         payload: message.toString(),
//         timestamp: Date.now()
//     };
//     lastPayload = payload;
//     ports.forEach(port => port.postMessage(payload));
// });

// onconnect = (e: MessageEvent) => {
//     const port = e.ports[0];
//     ports.push(port);
//     port.start();

//     if (lastPayload) {
//         port.postMessage(lastPayload);
//     }
// };