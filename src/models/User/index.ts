import { Model } from 'app';
import UserSchema from './schema';

class User extends Model{
  
  constructor() {
    super(UserSchema);
  }

  async test(){
    const [err, data] = await this.to(this.model.find({}))
    console.log(err, data)
  }
}

export default new User;
export const UserModel = UserSchema