import { Router } from "express";
import UserController from './UserController';
import { serializersUserCreate } from './serializers';

const router: Router = Router();

router.route('/')
  .get(UserController.getUser)
  .post(serializersUserCreate, UserController.createUser)

export default router;
