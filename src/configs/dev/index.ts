import { AceGlobal } from 'app/types';
import * as appConfig from './app';
import * as databaseConfig from './database';

declare const global: AceGlobal;

global.config = {
  ...appConfig,
  ...databaseConfig
}