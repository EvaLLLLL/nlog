/**
 * @file Posts-Entry
 */

import React from 'react';
import { GetStaticProps, NextPage } from 'next';
import Markdown from 'react-markdown';
import Link from 'next/link';
import { getDatabaseConnection } from '../../lib/getDatabaseConnection';
import { Post } from '../../src/entity/Post';

type Props = {
  posts: Post[];
};

const PostsEntry: NextPage<Props> = props => {
  const { posts } = props;
  return (
    <>
      <ul>
        {posts.map(({ id, title, createdAt, content }) => (
          <li key={title}>
            <Link href={`/posts/${id}`} passHref={true}>
              {title}
            </Link>
            <p>{createdAt}</p>

            <Markdown>{content}</Markdown>
          </li>
        ))}
      </ul>
    </>
  );
};

export default PostsEntry;

export const getStaticProps: GetStaticProps = async () => {
  const connection = await getDatabaseConnection();
  const posts = await connection.manager.find(Post);
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
};
