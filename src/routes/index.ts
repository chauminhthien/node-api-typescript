import { Application, Response, Request} from 'express';

export const initRoutes = (app: Application) => {
	app.get('/', function(_: Request, res: Response){
    res.send({ message: 'apple' });
  });
};
