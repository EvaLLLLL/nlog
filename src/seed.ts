import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { User } from './entity/User';

createConnection()
  .then(async connection => {
    const { manager } = connection;

    const user1 = new User();
    user1.username = 'eva';
    user1.passwordDigest = '123';
    await manager.save(user1);

    console.log(user1);

    await connection.close();
  })
  .catch(error => console.log(error));
