import { useEffect, useState } from 'react';
import type { IBingo } from '../models/IBingo'

// export function useMQTTBroker() {
//   const [workerMessage, setWorkerMessage] = useState<{ topic: string; payload: IBingo, timestamp: Date } | null>(null);
  
//   useEffect(() => {
//     console.log("Opening SharedWorker");
//     const worker = new SharedWorker(new URL('../workers/mqtt-worker.ts', import.meta.url), {
//       type: 'module'
//     });
//     worker.port.start();

//     worker.port.onmessage = (event) => {
//       const { topic, payload, timestamp } = event.data;
//       const bingo = JSON.parse(payload)
//       setWorkerMessage({ topic, payload: bingo, timestamp });
//     };

//     return () => {
//       worker.port.close();
//     };
//   }, []);

//   return workerMessage;
// }


export function useMQTTBroadcast() {
  const [data, setData] = useState<{ topic: string; payload: IBingo, timestamp: Date } | null>(null);

  useEffect(() => {
    const bc = new BroadcastChannel('bingo-channel');

    const setBingo = (data: any) => {
      const topic = data.topic;
      const payload = data.payload && JSON.parse(data.payload);
      const timestamp = data.timestamp;
      setData({ topic, payload, timestamp });
    }

    bc.onmessage = (event) => {
      setBingo(event.data);
    };

    // Ask SW for latest payload
    if (navigator.serviceWorker?.controller) {
      navigator.serviceWorker.controller.postMessage('get-latest-mqtt');
    }

    navigator.serviceWorker?.addEventListener('message', (event) => {
      if (event.data?.type === 'latest-mqtt') {
        setBingo(event.data.payload);
      }
    });

    return () => {
      bc.close();
    };
  }, []);

  return data;
}
