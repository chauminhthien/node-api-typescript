import { AceGlobal } from 'app/types';

declare const global: AceGlobal;

global.config = {
  api: {
    pathname : 'api',
    version : 'v1',
  }
}