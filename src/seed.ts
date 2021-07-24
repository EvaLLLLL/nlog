import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { Post } from './entity/Post';

createConnection()
  .then(async connection => {
    const posts = await connection.manager.find(Post);

    if (!posts.length) {
      await connection.manager.save([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => {
        return new Post({title: `Post ${n}`, content: `这是我的第 ${n} 篇文章`})
      }))

      console.log('posts 数据填充完毕')
    }

    await connection.close();
  })
  .catch(error => console.log(error));