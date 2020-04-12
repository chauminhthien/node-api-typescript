import toAwait from 'await-to-js';

class Model {

  protected to(query: any): any {
    return toAwait(query)
  }
}

export default Model;