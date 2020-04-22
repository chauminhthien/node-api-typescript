import { Router } from 'express';
import { router as routerUser } from 'controllers/users';

const router: Router = Router();

router.use('/users', routerUser)


export default router;
