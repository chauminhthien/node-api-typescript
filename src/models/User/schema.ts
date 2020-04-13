import * as mongoose from "mongoose";

export interface IApplicant extends mongoose.Document {
  email: string,
}

const Schema: mongoose.Schema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
}, { timestamps: true })

export default mongoose.model<IApplicant>('users', Schema);