import { useState, useEffect } from 'react'
import '../App.css'
import { useMQTT } from '../hooks/useMQTT';
import type { IBingo } from '../models/IBingo';

const BROKER_URL =  `${import.meta.env.VITE_MQTTURL}`;
const BROKER_USERNAME =  `${import.meta.env.VITE_MQTTUSERNAME}`;
const BROKER_PASSWORD =  `${import.meta.env.VITE_MQTTPASSWORD}`;

const TOPIC = 'bingo';

function ClientPart() {
  // const [count, setCount] = useState(0);
  const [bingo, setBingo] = useState<IBingo | null>(null);
  const { message, error } = useMQTT(BROKER_URL, TOPIC, BROKER_USERNAME, BROKER_PASSWORD);
  useEffect(() => {
    if (message) {
      console.log(`Ontvangen: ${message.payload}`);
      const bingo: IBingo = JSON.parse(message.payload);
      setBingo(bingo);
    }
  }, [message]);

  useEffect(() => {
    if (error) {
      console.error('MQTT-fout:', error.message);
    }
  }, [error]);

  return (
    <>
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
      <div>
        {bingo && <div>
          <h1>{bingo.current}</h1>
          {bingo.previous && <span>Vorige: {bingo.previous.join(', ')}</span>}
        </div>}
      </div >
    </>
  )
}

export default ClientPart
