import { useEffect, useState } from 'react';
import type { IBingo } from '../models/IBingo'

export function useMQTTBroker() {
  const [workerMessage, setWorkerMessage] = useState<{ topic: string; payload: IBingo, timestamp: Date } | null>(null);
  
  useEffect(() => {
    console.log("Opening SharedWorker");
    const worker = new SharedWorker(new URL('../workers/mqtt-worker.ts', import.meta.url), {
      type: 'module'
    });
    worker.port.start();

    worker.port.onmessage = (event) => {
      const { topic, payload, timestamp } = event.data;
      const bingo = JSON.parse(payload)
      setWorkerMessage({ topic, payload: bingo, timestamp });
    };

    return () => {
      worker.port.close();
    };
  }, []);

  return workerMessage;
}
