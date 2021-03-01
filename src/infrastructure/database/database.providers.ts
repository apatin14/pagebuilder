import * as mongoose from 'mongoose';
import { DB_PROVIDER } from '@constants';
require('dotenv').config()

export const databaseProviders = [{
    provide: DB_PROVIDER,
    useFactory: async (): Promise<typeof mongoose> =>
      mongoose.connect(process.env.MONGO_HOSTNAME, { useNewUrlParser: true, useFindAndModify: false }),
}];


mongoose.connection.on("open", function(ref) {
  console.log("Connected to mongo server.");
  console.log(process.env.MONGO_HOSTNAME); 
});



