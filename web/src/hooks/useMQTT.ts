import { useEffect, useRef, useState } from 'react';
import mqtt from 'mqtt';

export function useMQTT(brokerUrl: string, topic: string) {
  const [message, setMessage] = useState<{ topic: string; payload: string } | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const clientRef = useRef<mqtt.MqttClient | null>(null);

  useEffect(() => {
    const client = mqtt.connect(brokerUrl);
    clientRef.current = client;

    client.on('connect', () => {
      console.log('Verbonden met MQTT');
      client.subscribe(topic, (err) => {
        if (err) setError(err);
      });
    });

    client.on('message', (t, p) => {
      setMessage({ topic: t, payload: p.toString() });
    });

    client.on('error', (err) => {
      setError(err);
    });

    return () => {
      client.end();
    };
  }, [brokerUrl, topic]);

  return { client: clientRef.current, message, error };
}
