import { Router } from "express";
import UserController from './UserController';
import { serializersUserCreate } from './serializers';
import { Validator } from 'app';
import { UserCreate } from './schemas';

const router: Router = Router();

router.route('/')
  .get(UserController.getUser)
  .post(
    serializersUserCreate,
    Validator.run(UserCreate),
    UserController.createUser
  )

export default router;