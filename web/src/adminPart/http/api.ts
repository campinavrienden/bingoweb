import useHTTP from './http'

const BASE_URI = "/api/";

const createURL = (path: string) => {
    return new URL(BASE_URI + path.replace(/^\//, '').replace(/\/$/, ''), window.location.origin).toString();
}

interface IBingo {
    stop: () => Promise<void>
}

const bingo_stop = async () => {
    const {post} = useHTTP();
    await post(createURL("/bingo/stop"), {});
}

const bingo: IBingo = {
  stop: bingo_stop
}

const get = async () => {
    const {get} = useHTTP();
    return (await get(createURL("/"))).text();
}

export default function useAPI() {
    return { get, bingo }
}