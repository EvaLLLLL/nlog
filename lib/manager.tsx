/**
 * @file manager
 */

import { Connection, createConnection } from 'typeorm';

let connection: Connection = null;
const create = async () => {
  connection = await createConnection();
  return connection;
};

const get = () => {
  return connection;
};

const has = () => {
  return connection !== null;
};
