import { Server } from './app/server';

require('./config')

const app = new Server;
app.start();