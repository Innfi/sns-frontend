import path from 'path';
import dotenv from 'dotenv';

const envPath = path.join(__dirname, '.env');
console.log(envPath);

console.log(dotenv.config({ path: path.join(__dirname, '.env')}));