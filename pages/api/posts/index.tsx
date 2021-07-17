/**
 * @file api - posts
 */

import React from 'react'
import { NextApiHandler } from 'next'
import { getPosts } from './getPosts'

const Index: NextApiHandler = async (req, res) => {
  const posts = await getPosts()
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.write(JSON.stringify(posts))
  res.end()
}

export default Index
