import * as mongoose from "mongoose";

export class Database {
  private mongoose: any;
  private options = {
    useNewUrlParser: true, 
    useUnifiedTopology: true
  }
  
  constructor(){
    this.createMongo();
    this.connect();
  }

  private createMongo(){
    this.mongoose = mongoose;
    this.mongoose.set('useCreateIndex', true);
  }

  private connect(){
    let user = `${process.env.DB_USERNAME}`;
    if(!!user.length) user = `${user}:${process.env.DB_PASS}@`
    let url = `mongodb://${user}${ process.env.DB_HOST }:${ process.env.DB_PORT }/${ process.env.DB_DATABASE }`;
    if(process.env.DB_URL && (process.env.DB_URL !== '')) url = process.env.DB_URL;
    console.log(url)
    
    try{
      if (process.env.IS_OFFLINE) {
        this.mongoose.set("debug", true);
        console.log("state connection mongoose", this.mongoose.connection.readyState);
      }

      this.mongoose.connect(url, this.options)
      .then(() => console.log('Database connected'))
      .catch(() => console.log('Connect database fail.'))
    } catch(e){
      console.log(e)
    }
  }
}
