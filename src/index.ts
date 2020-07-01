import { Server } from 'app';
require('dotenv').config({ path: process.env.NODE_ENV === 'development' ? '.env.development' : '.env.production' });

const app = new Server;
app.start();