import { UserModel } from 'models/User';
import { Response, Request } from "express";
import { Controller } from 'app';

import { IUserCreateForm } from './model';

class UserController extends Controller {
  constructor(){
    super(UserModel);
  }

  public getUser = async (req: Request, res: Response) => {
    try {

      const [err, users] = await this.to(this.model.find({}));
      if(err) return this.ReE(req, res, err);
      return this.ReS(req, res, users);

    }catch(error){
      this.ReE(req, res, error)
    }
  }

  public createUser = async (req: Request, res: Response) => {
    try {
      const form: IUserCreateForm = req.body;
      const [err, user] = await this.to(this.model.create(form));

      if(err) return this.ReE(req, res, err);
      return this.ReS(req, res, user);

    }catch(error){
      this.ReE(req, res, error)
    }
  }
}


export default new UserController();