import * as mongoose from "mongoose";

class Database {
  private config: any;
  private mongoose: any;
  private options = {
    useNewUrlParser: true, 
    useUnifiedTopology: true
  }
  
  constructor(config: any){
    this.config = config;
    this.createMongo();
    this.connect();
  }

  private createMongo(){
    this.mongoose = mongoose;
    this.mongoose.set('useCreateIndex', true);
  }

  private connect(){
    let url = `mongodb://${ this.config.hostname }:${ this.config.port }/${ this.config.database }`;
    if(this.config.url && this.config.url !== '') url = this.config.url;
    
    try{
      this.mongoose.connect(url, this.options)
      .then(() => console.log('Database connected'))
      .catch(() => console.log('Connect database fail.'))
    } catch(e){
      console.log(e)
    }
  }
}

export default Database;