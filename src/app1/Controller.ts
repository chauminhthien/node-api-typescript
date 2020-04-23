import toAwait from 'await-to-js';
import { IOptionError, IError } from 'app/types';
import { Response, Request } from 'express';

class Controller {
  protected model: any;
  
  constructor(modelName: any) {
    if(!!modelName) this.model = modelName;
  }

  public to(query: any): any {
    return toAwait(query)
  }

  protected ReE(
    _: Request, res: Response, error: any,
    options: IOptionError = { statusCode: 400 }
  ): any {
    const statusCode = options.statusCode;
    return res.status(statusCode).json(this.parseError(error));
  }

  protected ReS( _: Request, res: Response, data: any): any {
    return res.status(200).json(data);
  }

  private parseError(error: any): IError {
    let result: IError = {
      code: error.code || "internal_error",
      message: error.message || "INTERNAL ERROR",
      details: error.details || "INTERNAL ERROR"
    };
    return result;
  }
  
}

export default Controller