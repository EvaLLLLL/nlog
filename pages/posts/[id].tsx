/**
 * @file posts 文章
 */

import { GetServerSideProps, NextPage } from 'next';
import Markdown from 'react-markdown';
import Link from 'next/link';
import { getDatabaseConnection } from '../../lib/getDatabaseConnection';
import { Post } from '../../src/entity/Post';

type Props = {
  post: Post;
};

const postsShow: NextPage<Props> = props => {
  const { post } = props;
  console.log(post);

  return (
    <>
      <Link href={'/posts'} passHref={true}>
        <button>回到文章列表</button>
      </Link>
      <hr />
      <h1>文章详情</h1>
      <h2>{post.title}</h2>
      <div>{post.createdAt}</div>
      <Markdown>{post.content}</Markdown>
    </>
  );
};

export default postsShow;

export const getServerSideProps: GetServerSideProps<any, { id: string }> =
  async context => {
    const connection = await getDatabaseConnection();
    const post = await connection.manager.findOne(Post, context.params.id);
    return {
      props: {
        post: JSON.parse(JSON.stringify(post)),
      },
    };
  };
