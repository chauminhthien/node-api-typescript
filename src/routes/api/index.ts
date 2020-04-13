import { Router } from 'express';
import routerUser from 'controllers/users/src';

const router: Router = Router();

router.use('/users', routerUser)


export default router;
