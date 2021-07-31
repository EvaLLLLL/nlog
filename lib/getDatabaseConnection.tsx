/**
 * @file getDatabaseConnection
 */

import { createConnection, getConnectionManager } from 'typeorm';
import 'reflect-metadata';
import { Post } from 'src/entity/Post';
import { User } from 'src/entity/User';
import { Comment } from 'src/entity/Comment';
import config from 'ormconfig.json';

const create = async () => {
  // @ts-ignore
  return createConnection({
    ...config,
    entities: [Post, User, Comment],
  });
};

const promise = (async function () {
  const manager = getConnectionManager();
  if (manager.has('default')) {
    const currentConnection = manager.has('default') && manager.get('default');
    if (currentConnection) {
      await currentConnection.close();
    }
  }

  return create();
})();

export const getDatabaseConnection = async () => {
  return promise;
};
