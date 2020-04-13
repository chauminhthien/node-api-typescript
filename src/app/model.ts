import toAwait from 'await-to-js';
import * as mongoose from "mongoose";

class Model {
  protected schema: mongoose.Schema;
  protected collection: string;

  protected to(query: any): any {
    return toAwait(query)
  }
}

export default Model;