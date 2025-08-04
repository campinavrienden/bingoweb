import { proxy } from 'valtio'
import useAPI from '../http/api'
import { useMQTT } from '../../hooks/useMQTT'
import { useEffect } from 'react';
import type { IAdminBingo } from '../../models/IAdminBingo';

const BROKER_URL =  `${import.meta.env.VITE_MQTTURL}`;
const BROKER_USERNAME =  `${import.meta.env.VITE_MQTTUSERNAME}`;
const BROKER_PASSWORD =  `${import.meta.env.VITE_MQTTPASSWORD}`;

const TOPIC = 'adminbingo';

const api = useAPI();
const { message } = useMQTT(BROKER_URL, TOPIC, BROKER_USERNAME, BROKER_PASSWORD);

useEffect(() => {
  if(message && JSON.parse(message.payload)) {
    try{
      const bingo: IAdminBingo = JSON.parse(message.payload)
      if(bingo) {
        if(adminstore.max != bingo.max) {
          adminstore.max = bingo.max
        }
        adminstore.drawn = bingo.values
      }
    }
    catch(reason){
      console.error(reason);
    }
  }
}, [message])

export const adminstore = proxy({
  max: 90,
  numbers: [] as number[],
  drawn: [] as number[],
  started: false,
  resetCalled: false,

  reset() {
    api.bingo.stop()
    adminstore.numbers = []
    adminstore.drawn = []
    adminstore.started = false
    adminstore.resetCalled = true
  },

  start(max: number) {
    if (!adminstore.resetCalled) return
    adminstore.max = max
    adminstore.numbers = Array.from({ length: max }, (_, i) => i + 1)
    adminstore.drawn = []
    adminstore.started = true
    adminstore.resetCalled = false
    api.bingo.start(max)
  },

  draw() {
    if (!adminstore.started || adminstore.numbers.length === 0) return
    const index = Math.floor(Math.random() * adminstore.numbers.length)
    const [picked] = adminstore.numbers.splice(index, 1)
    adminstore.drawn.push(picked)
    api.bingo.draw()
  },
})