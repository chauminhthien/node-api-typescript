import { AceGlobal } from 'app/types';
import * as appConfig from './app';
import * as databaseConfig from './database';
import * as corsConfig from './cors';

declare const global: AceGlobal;

global.config = {
  ...appConfig,
  ...databaseConfig,
  ...corsConfig
}