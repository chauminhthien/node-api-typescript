import * as Path from 'path';

import * as BodyParser from 'body-parser';
import * as Express  from 'express';
import * as Winston from 'winston';
import * as Morgan from 'morgan';
import { initRoutes } from '../routes';

export class Server {
  public app: Express.Application;
	public log: any;
  public router: Express.Router;
  
  constructor() {
		this.app = Express();
		this.setLogger();
		this.setConfig();
		this.setRoutes();
  }
  
  public start() {
		this.app.listen(3000);
    this.log.info(`Server started at ${3000}`);
    console.log(`Server started at ${3000}`)
  }

  private setLogger() {
		// Set up application logging
    console.log(`Set up application logging`);
    
    this.log = Winston.createLogger({
      level: 'info',
      format: Winston.format.json(),
      transports: [
        new Winston.transports.File({
					level: 'info',
					filename: Path.resolve('./logs', this.getDateNow(), 'server.log'),
					handleExceptions: true,
					// json: true,
					maxsize: 5242880, // 5MB
					maxFiles: 5,
					// colorize: false,
				}),
				new Winston.transports.Console({
					level: 'debug',
					handleExceptions: true,
					// json: false,
					// colorize: true,
				}),
      ],
      exitOnError: false
    });

		// Set up HTTP request logging
		const morganOptions: Morgan.Options = {
			stream: {
				write: (message) => {
					this.log.info(message);
				},
			},
		};
		this.app.use(Morgan('combined', morganOptions));
  }
  
  private setConfig() {
    console.log(`Set up application config`)
		this.app.use('/', Express.static('./public'));
		this.app.use(BodyParser.json());
  }
  
  private setRoutes() {
    console.log(`Set up application router`)
		initRoutes(this.app);
  }

  private getDateNow(){
    const now = new Date();
    return `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
  }
}
