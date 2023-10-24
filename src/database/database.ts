import mongoose from 'mongoose';
import { AppEnvs } from '../configs';

export class Database {
  static async connect() {
    try {
      const connectionString = AppEnvs.DATABASE_URL;
      
      await mongoose.connect(connectionString);
  
      console.log('Connection to MongoDB established successfully');
    } catch (error) {
      console.error('Erro ao conectar ao MongoDB:', error);
    }
  }
}
