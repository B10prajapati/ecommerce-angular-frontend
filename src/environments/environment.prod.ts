import 'dotenv/path';
export const environment = {
  production: true,

  baseURL: process.env.baseURL,
  cookieExpiresIn: process.env.cookieExpiresIn,
  cookiePath: process.env.cookiePath,
  cookieXsrf: process.env.cookieXsrf,
  headerXsrf: process.env.headerXsrf,
};
