import useHTTP from './http'

// const BASE_URI = import.meta.env.DEV ? 'https://us-central1-bingoweb-466208.cloudfunctions.net/' : "/api/";
const BASE_URI = "/api/";

const createURL = (path: string) => {
    return new URL(BASE_URI + path.replace(/^\//, '').replace(/\/$/, ''), window.location.origin).toString();
}

export interface IBingoAPI {
    stop: () => Promise<void>
    start: (max: number) => Promise<void>
    draw: () => Promise<void>
}

const bingo_stop = async () => {
    const {post} = useHTTP();
    await post(createURL("/bingo/stop"), {});
}

const bingo_start = async (max: number) => {
    const {post} = useHTTP();
    await post(createURL("/bingo/start/" + max.toString()), {});
}

const bingo_draw = async () => {
    const {post} = useHTTP();
    await post(createURL("/bingo/draw"), {});
}

const bingo: IBingoAPI = {
  stop: bingo_stop,
  start: bingo_start,
  draw: bingo_draw
}

const get = async () => {
    const {get} = useHTTP();
    return (await get(createURL("/"))).text();
}

export default function useAPI() {
    return { get, bingo }
}