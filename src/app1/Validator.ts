import { Response, Request, NextFunction } from "express";
import { validate, SchemaLike, ValidationError, ValidationOptions } from "joi";
import { IError } from 'app/types';

export default class Validator {
  
  public static  run(schema: SchemaLike, type: string = 'body', options?: ValidationOptions) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const value = req[type];
      return validate(value, schema, options)
        .then(() => { return next()})
        .catch((errors: ValidationError) => {
          console.log(errors.details);
        
          const error: IError = {
            code: errors.name,
            message: "Data invalid",
            details: errors.details
          };
          return res.status(404).json(error);
        });
    };
  }

}
