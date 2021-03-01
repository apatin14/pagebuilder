import * as dotenv from 'dotenv';
dotenv.config();

export const DB_PROVIDER = 'DbConnectionToken';
export const PAGE_MODEL_PROVIDER = 'PageModelProvider';
export const SERVICE = 'DB_MONGO_SERVICE';
export const APP_NAME = process.env.APP_NAME || 'clean.architecture';
export const DATABASE_SERVICE = process.env.DATABASE_SERVICE || 'DATABASE_SERVICE';
export const APP_PORT = process.env.PORT || 4001;
export const APP_HOST = process.env.APP_HOST || '0.0.0.0';
export const ENV_DATA = {
    "company": {
      "friendlyname": "Zlivio",
      "email": "no-reply@zlivio.com",
      "emailTo": "jlopez@zlivio.com",
      "nameTo": "Jorge Lopez",
      "password": "Zlivio_no_reply_123*",
      "phone": "15164358777",
      "accountSid": "ACf881533d0d4d4dbaa58a87ca1686b3db",
      "authToken": "74040dc61a51e2b907783c21f4b45028",
      "api_twilio": "https://api.twilio.com"
    }
};
export const ENV_SEWSLETTERS = {
  "company": {
    "friendlyname": "Zlivio",
    "email": "newsletters@zlivio.com",
    "password": "&rM8uSG*",
  }
};
