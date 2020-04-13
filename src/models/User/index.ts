import { Model } from 'app';
import Schema from './schema';

class User extends Model{
  schema      = Schema;
  collection  = 'users';

  constructor() {
    super();
  }
}

export default new User;