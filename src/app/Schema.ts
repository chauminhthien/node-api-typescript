import { Schema } from 'mongoose';

export class BaseSchema extends Schema {
  constructor(schema: any, options?: any, ){
    super(schema, {
      toJSON: {
        transform : (_, ret, __) => {
          ret.id = ret._id;
          delete ret._id;
          delete ret.__v;
        }
      },
      ...options
    })
  }
}