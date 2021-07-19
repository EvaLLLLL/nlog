/**
 * @file posts 文章
 */

import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { getPosts } from '../api/posts/getPosts'
import Markdown from 'react-markdown'
import Link from 'next/link'

type Props = {
  post: {
    title: string
    date: string
    content: string
  }
}

const postsShow: NextPage<Props> = props => {
  const { title, content, date } = props.post
  return (
    <>
      <Link href={'/posts'} passHref={true}>
        <button>回到文章列表</button>
      </Link>

      <hr />

      <h2>文章详情</h2>

      <h3>{title}</h3>
      <div>{date}</div>

      <Markdown>{content}</Markdown>
    </>
  )
}

export default postsShow

export const getStaticPaths: GetStaticPaths<{ title: string }> = async () => {
  const posts = await getPosts()

  return {
    paths: posts.map(({ title }) => ({
      params: { title },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async props => {
  const title = props.params.title as string
  const posts = await getPosts([title])
  return {
    props: {
      post: JSON.parse(JSON.stringify(posts[0])),
    },
  }
}
