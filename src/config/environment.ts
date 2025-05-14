import dotenv from 'dotenv';

dotenv.config();


export const config = {
    PORT: process.env.PORT,     
    DB_URL: process.env.MONGODB_URI,
}