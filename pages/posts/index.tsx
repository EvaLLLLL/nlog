/**
 * @file Posts-Entry
 */

import React from 'react'
import { GetStaticProps, NextPage } from 'next'
import { getPosts } from '../api/posts/getPosts'
import Markdown from 'react-markdown'
import Link from 'next/link'

type Props = {
  posts: {
    title: string
    date: string
    content: string
  }[]
}

const PostsEntry: NextPage<Props> = props => {
  const { posts } = props
  return (
    <>
      <ul>
        {posts.map(({ title, date, content }) => (
          <li key={title}>
            <Link href={`/posts/${title}`} passHref={true}>
              {title}
            </Link>
            <p>{date}</p>

            <Markdown>{content}</Markdown>
          </li>
        ))}
      </ul>
    </>
  )
}

export default PostsEntry

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPosts()
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  }
}
