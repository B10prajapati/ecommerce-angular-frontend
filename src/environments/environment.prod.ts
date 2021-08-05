import * as dotenv from 'dotenv';

dotenv.config();

export const environment = {
  production: true,

  baseURL: process.env.baseURL,
  cookieExpiresIn: process.env.cookieExpiresIn,
  cookiePath: process.env.cookiePath,
  cookieXsrf: process.env.cookieXsrf,
  headerXsrf: process.env.headerXsrf,
};
