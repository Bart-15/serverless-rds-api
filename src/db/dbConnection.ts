/* eslint-disable no-console */
import mySql from 'mysql';

export const connection = mySql.createConnection({
  host: '127.0.0.1',
  user: '',
  password: '',
  database: '',
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL database: ', err);
    return;
  }
  console.log('Connected to MySQL database');
});
