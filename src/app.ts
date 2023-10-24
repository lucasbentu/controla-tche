import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser';
import router from './routes';
import { Database } from './database';

export class App {
  public server: express.Application;

  constructor() {
    this.server = express()
    this.databaseConnect()
    this.server.use(bodyParser.json())
    this.server.use('/api', router)
  }

  private async databaseConnect() {
    await Database.connect()
  }
}