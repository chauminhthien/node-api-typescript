import { Router, Response } from "express";

const router: Router = Router();

router.get('/', function(_, res: Response){
  res.json({a: 'acacas'})
})

export default router;
