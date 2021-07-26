import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { User } from './entity/User';
import { Post } from './entity/Post';
import { Comment } from './entity/Comment';

createConnection()
  .then(async connection => {
    const { manager } = connection;

    // 创建 user
    const u1 = new User();
    u1.username = 'eva';
    u1.passwordDigest = '123';
    await manager.save(u1);

    // 创建 post
    const p1 = new Post();
    p1.title = 'Post 1';
    p1.content = 'My First Post';
    p1.author = u1;
    await manager.save(p1);

    // 创建 comment
    const c1 = new Comment();
    c1.user = u1;
    c1.post = p1;
    c1.content = 'Awesome';
    await manager.save(c1);

    await connection.close();
    console.log('seed success!');
  })
  .catch(error => console.log(error));
