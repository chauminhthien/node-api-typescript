import * as Path from 'path';
import * as BodyParser from 'body-parser';
import * as Express  from 'express';
import * as Winston from 'winston';
import * as Morgan from 'morgan';
import * as Cors from 'cors';

import { apiRouter, publicRouter } from 'routes';
import { Database } from 'app';

export class Server {
  public app: Express.Application;
	public log: any;
  public router: Express.Router;
	
  constructor() {
		this.app = Express();
		this.setLogger();
		this.setMiddleware()
		this.setConfig();
		this.setCors()
		this.setRoutes();
		this.setLoadDatabase();
  }
  
  public start() {
		this.app.listen(process.env.PORT || 3001);
    this.log.info(`Server started at ${process.env.PORT || 3001}`);
    console.log(`Server started at ${process.env.PORT || 3001}`)
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
		console.log(`/${process.env.API_PATH_NAME}/${process.env.API_PATH_VERSION}`)
		this.app.use(`/${process.env.API_PATH_NAME}/${process.env.API_PATH_VERSION}`, apiRouter);
		this.app.use('/', publicRouter);
	}
	
	private setLoadDatabase(){
		console.log(`load database applicant`)
		if(process.env.DB_USED === 'true') new Database()
	}

	private setCors(){
		console.log(`set cors applicant`);
		this.app.use(
			Cors({
				origin:  process.env.APP_CORS_ORIGIN || '*',
				methods: process.env.APP_CORS_METHOD || 'GET,HEAD,PUT,PATCH,POST,DELETE',
				credentials: process.env.APP_CORS_CREDENTIALS === 'true'
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
