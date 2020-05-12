import * as mongoose from "mongoose";
import { BaseSchema } from 'app';
export interface IApplicant extends mongoose.Document {
  email: string,
  fullname: string
}

export const UserSchemaName = 'users';

const Schema: mongoose.Schema = new BaseSchema({
  email: {
    type: String,
    required: true
  },
  fullname: {
    type: String,
    required: true
  }
}, { timestamps: true })

export default mongoose.model<IApplicant>(UserSchemaName, Schema);