import toAwait from 'await-to-js';
import { AceError, AceOptionError } from 'app/types';
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
    options: AceOptionError = { statusCode: 400 }
  ): any {

    const statusCode = options.statusCode;
    return res.status(statusCode).json(this.parseError({
      code: error.code || 'error_unknown',
      message: error.message || 'error_unknown',
      debugMessage: error.message || 'error_unknown'
    }));
  }

  protected ReS( _: Request, res: Response, data: any): any {
    return res.status(200).json(data);
  }

  private parseError(error: any): AceError {
    const result: AceError = {};
    result.code = error.code || "internal_error";
    result.message = error.message || "INTERNAL ERROR";
    if (error.debugMessage) {
      result.debugMessage = error.debugMessage;
    }
    return result;
  }
  
}

export default Controller