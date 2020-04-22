import * as mongoose from "mongoose";

export interface IApplicant extends mongoose.Document {
  email: string,
}

export const UserSchemaName = 'users';

const Schema: mongoose.Schema = new mongoose.Schema({
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