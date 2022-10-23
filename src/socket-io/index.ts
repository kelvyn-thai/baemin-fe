import { ENV } from "env";
import { io, Socket } from "socket.io-client";

const socket: Socket = io(ENV.REACT_APP_WS_PATH);

export default socket;
