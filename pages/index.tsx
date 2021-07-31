/**
 * @file page - index
 */

import { GetServerSideProps } from 'next';
import { getDatabaseConnection } from '../lib/getDatabaseConnection';
import { Post } from 'src/entity/Post';

type Props = {
  posts: Post[];
};

export default function Home(Props) {
  const { posts } = Props;
  const parsedPosts = JSON.parse(posts);
  return (
    <div>
      {parsedPosts.map(post => {
        return <div key={post.id}>{post.title}</div>;
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
