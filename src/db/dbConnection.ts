/* eslint-disable no-console */
import mySql from 'mysql';

import env from '../config/envConfig';

export const connection = mySql.createConnection({
  host: env.HOST,
  user: env.USER,
  port: 3306,
  password: env.PASSWORD,
  database: env.DB_NAME,
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL database: ', err);
    console.log(env);
    return;
  }
  console.log('Connected to MySQL database');
});
