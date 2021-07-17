/**
 * @file Posts-Entry
 */

import React, { useEffect, useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import UAParser from 'ua-parser-js'

type Props = {
  agent: { name: string; version: string; major: string }
}

const PostsEntry: NextPage<Props> = props => {
  const { agent } = props
  const [width, setWidth] = useState(0)
  useEffect(() => {
    setWidth(document.documentElement.clientWidth)
  }, [])
  return (
    <>
      <div>你的浏览器是：{agent.name || ''}</div>
      <div>版本是：{agent.version || ''}</div>
      <div>现在浏览器的宽度是：{width}px 像素</div>
    </>
  )
}

export default PostsEntry

export const getServerSideProps: GetServerSideProps = async context => {
  const ua = context.req.headers['user-agent']
  const result = new UAParser(ua).getResult()

  return {
    props: {
      agent: JSON.parse(JSON.stringify(result.browser)),
    },
  }
}
