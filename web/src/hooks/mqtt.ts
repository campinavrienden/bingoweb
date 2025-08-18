import { useEffect, useRef, useState } from 'react';
import mqtt from 'mqtt';

export function useMQTT(brokerUrl: string, topic: string, userName: string, password: string) {
  const [message, setMessage] = useState<{ topic: string; payload: string } | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [connected, setConnected] = useState(false);
  const clientRef = useRef<mqtt.MqttClient | null>(null);

  useEffect(() => {
    const client = mqtt.connect(brokerUrl, {
      username: userName,
      password: password
    });
    clientRef.current = client;

    client.on('connect', () => {
      setConnected(true);
      console.log('Verbonden met MQTT');
      client.subscribe(topic, (err) => {
        if (err) setError(err);
      });
    });

    client.on('disconnect', () => {
      setConnected(false);
      console.log('Connectie met MQTT afgesloten');
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

  return { client: clientRef.current, message, error, connected };
}
