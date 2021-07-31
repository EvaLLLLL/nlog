/**
 * @file page - index
 */

import { GetServerSideProps } from 'next';
import { getDatabaseConnection } from '../lib/getDatabaseConnection';
import { Post } from 'src/entity/Post';
import Link from 'next/link';

type Props = {
  posts: Post[];
};

export default function Home(Props) {
  const { posts } = Props;
  const parsedPosts = JSON.parse(posts);
  return (
    <div>
      <h1>文章列表</h1>
      {parsedPosts.map(post => {
        return (
          <Link key={post.id} passHref={true} href={`/posts/${post.id}`}>
            <a>{post.title}</a>
          </Link>
        );
      })}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const connection = await getDatabaseConnection();
  const posts = await connection.manager.find(Post);
  return {
    props: {
      posts: JSON.stringify(posts),
    },
  };
};
