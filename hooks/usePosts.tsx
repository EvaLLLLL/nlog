/**
 * @file usePosts 获取 posts
 */

import React, { useEffect, useState } from 'react'
import axios from 'axios'

export const usePosts = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios
      .get('/api/posts')
      .then(({ data }) => setPosts(data))
      .finally(() => setLoading(false))
  }, [])

  return { posts, loading }
}
