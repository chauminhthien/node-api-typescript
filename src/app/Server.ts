import * as Path from 'path';
import * as BodyParser from 'body-parser';
import * as Express  from 'express';
import * as Winston from 'winston';
import * as Morgan from 'morgan';
import * as Cors from 'cors';

import { apiRouter, publicRouter } from 'routes';
import { AceGlobal } from './types';
import { Database } from 'app';

export class Server {
  public app: Express.Application;
	public log: any;
  public router: Express.Router;
	private global: AceGlobal;
	
  constructor() {
		this.app = Express();
		this.global = global;
		this.setLogger();
		this.setMiddleware()
		this.setConfig();
		this.setCors()
		this.setRoutes();
		this.setLoadDatabase();
  }
  
  public start() {
		this.app.listen(this.global.config.APP_POST || 3000);
    this.log.info(`Server started at ${this.global.config.APP_POST || 3000}`);
    console.log(`Server started at ${this.global.config.APP_POST || 3000}`)
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
		this.app.use(BodyParser.json());
  }
  
  private setRoutes() {
		console.log(`Set up application router`)
		this.app.use(`/${this.global.config.api.pathname}/${this.global.config.api.version}`, apiRouter);
		this.app.use('/', publicRouter);
	}
	
	private setLoadDatabase(){
		console.log(`load database applicant`)
		const database = this.global.config.APP_DATABASE.mongodb;
		if(!!database) new Database(database)
	}

	private setCors(){
		console.log(`set cors applicant`);
		const cors = this.global.config.APP_CORS;
		this.app.use(
			Cors({
				origin: cors.origin || '*',
				methods: cors.methods || 'GET,HEAD,PUT,PATCH,POST,DELETE',
				credentials: cors.credentials ?? true
			})
		);
	}

  private getDateNow(){
    const now = new Date();
    return `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
	}
	
	private setMiddleware(){
		console.log(`Set up middleware`);
		this.app.use(this.handlerLoggerRequest);
		this.app.use(this.handlerMiddleware);
	}

	private handlerMiddleware(error: any, _: Express.Request, res: Express.Response, next: Express.NextFunction){
		if (error) {
			console.error(error);
			return res.status(500).json({
				code: "internal",
				message: error.message,
				debugMessage: error.stack
			});
		}
		return next();
	}

	private handlerLoggerRequest(req: Express.Request, _res: Express.Response, next: Express.NextFunction){
		console.log("--------------------------- Log request ---------------------------");

		console.log("Url: " + req.url);
		console.log("Method: " + req.method);
		console.log("Headers: " + JSON.stringify(req.headers, null, 2));
		console.log("Payload: " + JSON.stringify({
			body: req.body,
			params: req.params,
			query: req.query
		}, null, 2));

		console.log("--------------------------- Log request ---------------------------");
		return next();
	}
}
