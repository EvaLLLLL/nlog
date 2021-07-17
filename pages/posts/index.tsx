/**
 * @file Posts-Entry
 */

import React from 'react'
import { NextPage } from 'next'
import Markdown from 'react-markdown'
import { usePosts } from '../../hooks/usePosts'

const PostsEntry: NextPage = () => {
  const { posts, loading } = usePosts()

  return (
    <>
      {loading ? (
        <div>...加载中</div>
      ) : (
        <ul>
          {!posts.length ? (
            <>暂无文章</>
          ) : (
            <>
              {posts.map(({ title, date, content }) => (
                <li key={title}>
                  <h1>标题：{title}</h1>
                  <p>日期：{date}</p>

                  <Markdown>{content}</Markdown>
                </li>
              ))}
            </>
          )}
        </ul>
      )}
    </>
  )
}

export default PostsEntry
