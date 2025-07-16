// socket.js (Singleton pattern)
import { io } from "socket.io-client";

const socketInstance = io(import.meta.env.VITE_API_URL);

export default socketInstance;