/**
 * @file Posts-Entry
 */

import React from 'react'
import { GetStaticProps, NextPage } from 'next'
import { getPosts } from '../api/posts/getPosts'
import Markdown from 'react-markdown'

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
            <h1>{title}</h1>
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
