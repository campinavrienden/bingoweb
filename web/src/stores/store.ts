import { proxy } from 'valtio'

import useAPI from '../pages/adminPart/http/api'
import { useMQTT } from '../hooks/mqtt';
import { useEffect } from 'react';
import type { IBingo, IBingoInfo } from '../models/IBingo';

const api = useAPI();

const BROKER_URL = `${import.meta.env.VITE_MQTTURL}`;
const BROKER_USERNAME = `${import.meta.env.VITE_MQTTUSERNAME}`;
const BROKER_PASSWORD = `${import.meta.env.VITE_MQTTPASSWORD}`;
const TOPIC = 'bingo';
const INFOTOPIC = 'bingo-info';

export interface IStore {
  max: number;
  isBingo: boolean | undefined;
  isBreak: boolean | undefined;
  nextBingo: Date | undefined;
  maxInput: number;
  numbers: number[];
  drawn: number[];
  canStop: boolean;
  canDraw: boolean;
  canGenerate: boolean;
  hasOverlay: boolean;
  hasNextBingo: boolean;
  getCurrent: number | undefined;
  getOther: number[] | undefined;
  setMaxInput: (max: number) => void;
  startWith: (max: number) => void;
  reset: () => void;
  generate: () => void;
  draw: () => Promise<void>;
}

const store = {
  max: 0,
  maxInput: 90,
  numbers: [] as number[],
  drawn: [] as number[],
  isBingo: undefined as boolean | undefined,
  isBreak: undefined as boolean | undefined,
  nextBingo: undefined as Date | undefined,


  get canStop() {
    return this.canDraw;
  },

  get canDraw() {
    return this.max > 0;
  },

  get canGenerate() {
    return this.maxInput > 0 && !this.canDraw;
  },

  get hasOverlay(): boolean {
    return !!store.isBingo || !!store.isBreak;
  },

  get hasNextBingo(): boolean {
    return !!store.isBingo || !!store.isBreak;
  },

  get getCurrent(): number | undefined {
    return [...store.drawn].pop();
  },

  get getOther(): number[] | undefined {
    var values = [...store.drawn];
    values.pop();
    return values.slice(-3);
  },

  setMaxInput(max: number) {
    store.maxInput = max
  },

  startWith(max: number) {
    store.setMaxInput(max);
    store.generate();
  },

  reset() {
    if (!store.canStop) return;
    api.bingo.stop()
    // store.numbers = []
    // store.drawn = []
    // store.max = 0;
  },

  generate() {
    if (!store.canGenerate) return;
    store.max = store.maxInput;
    // store.numbers = Array.from({ length: store.max }, (_, i) => i + 1)
    // store.drawn = []
    api.bingo.start(store.max)
  },

  async draw() {
    if (!store.canDraw) return;
    await api.bingo.draw()
  },
}

export const useStore = (): IStore => {
  const { message } = useMQTT(BROKER_URL, TOPIC, BROKER_USERNAME, BROKER_PASSWORD);
  const { message: infomessage } = useMQTT(BROKER_URL, INFOTOPIC, BROKER_USERNAME, BROKER_PASSWORD);
  const proxyStore = proxy(store);
  useEffect(() => {
    if (message && JSON.parse(message.payload)) {
      try {
        const bingo: IBingo = JSON.parse(message.payload)
        if (bingo) {
          if (proxyStore.max != bingo.max) {
            proxyStore.max = bingo.max
          }
          if (proxyStore.max != bingo.max) {
            proxyStore.max = bingo.max
          }
          if (proxyStore.isBingo != bingo.isBingo) {
            proxyStore.isBingo = bingo.isBingo
          }
          proxyStore.drawn = bingo.values
        }
      }
      catch (reason) {
        console.error(reason);
      }
      if (infomessage && JSON.parse(infomessage.payload)) {
        console.log("Infomessage", infomessage);
        try {
          const bingo: IBingoInfo = JSON.parse(infomessage.payload)
          if (bingo) {
            if (proxyStore.isBreak != bingo.isBreak) {
              proxyStore.isBreak = bingo.isBreak
            }
            if (proxyStore.nextBingo != bingo.nextBingo) {
              proxyStore.nextBingo = bingo.nextBingo
            }
          }
        }
        catch (reason) {
          console.error(reason);
        }
      }
    }
  }, [message, infomessage]);

  return proxyStore;
}