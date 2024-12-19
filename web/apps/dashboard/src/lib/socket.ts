import socketIOClient from 'socket.io-client';
import config from './config';

const socket = socketIOClient(config.api.baseUrl);

export default socket;
