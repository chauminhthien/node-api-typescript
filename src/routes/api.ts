import { Router, Response, Request } from 'express';
const router: Router = Router();

router.route('/')
  .get(function(_: Request, res: Response){
      res.send({ message: 'apple' });
    });


export default router;
