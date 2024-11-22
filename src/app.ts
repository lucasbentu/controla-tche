import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser';
import router from './routes';
import cors from 'cors'
import { Database } from './database';
import { errorHandler } from './middlewares/error-handler';

export class App {
  public server: express.Application;

  private corsOptions = {
    origin: ['http://localhost:3000', 'https://basic-form-tau.vercel.app'],
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };

  constructor() {
    this.server = express()
    this.databaseConnect()
    this.server.use(cors(this.corsOptions));
    this.server.use(bodyParser.json())
    this.server.use('/api', router)
    this.server.use(errorHandler)
  }

  private async databaseConnect() {
    await Database.connect()
  }
}