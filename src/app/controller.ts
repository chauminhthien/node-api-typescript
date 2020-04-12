class Controller {
  protected model: any;
  
  constructor(modelName: any) {
    if(!!modelName) this.model = modelName;
  }
  
}

module.exports = Controller