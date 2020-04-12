import toAwait from 'await-to-js';
class Controller {
  protected model: any;
  
  constructor(modelName: any) {
    if(!!modelName) this.model = modelName;
  }

  protected to(query: any): any {
    return toAwait(query)
  }
  
}

module.exports = Controller