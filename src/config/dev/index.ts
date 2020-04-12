import { AceGlobal } from './../../app/types';

import * as appConfig from './app';

declare const global: AceGlobal;

global.config = {
  ...appConfig
}