import dotenv from "dotenv";
dotenv.config();

export const config = {
  persistence: process.env.PERSISTENCE,
  port: process.env.PORT,
  dbUrl: process.env.DB_URL,
};

/*export default {
  mongo: {
    url: process.env.DB_URL,
  },
  jwt: {
    cookieName: process.env.JWT_COOKIE_NAME,
    secret: process.env.JWT_SECRET,
  },
  githubAuth: {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackUrl: process.env.CALLBACK_URL,
  },
};
*/
