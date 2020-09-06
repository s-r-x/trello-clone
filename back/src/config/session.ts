import { SessionOptions } from 'express-session';

const SESSION_SECRET = process.env.SESSION_SECRET;

export const sessionConfig: SessionOptions = {
  resave: false,
  saveUninitialized: false,
  secret: SESSION_SECRET,
};
