import { ENV } from "env";
import { io, Socket } from "socket.io-client";

const socket: Socket = io(ENV.WS_PATH);

export default socket;
