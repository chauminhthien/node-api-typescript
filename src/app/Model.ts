import toAwait from 'await-to-js';

export class Model{
  protected model: any;

  constructor(UserModel: any) {
    this.model = UserModel;
    return this;
  }

  protected to(query: any): any {
    return toAwait(query)
  }

  TE(error) {
    throw(error);
  }

}
