/**
 * @file api - posts
 */

import path from 'path'
import fs, { promises as fsPromise } from 'fs'
import matter from 'gray-matter'

export const getPosts = async () => {
  const markDownDir = path.join(process.cwd(), 'markdown')

  const fileList = await fsPromise.readdir(markDownDir)

  return fileList.map(fileName => {
    const fullPath = path.join(markDownDir, fileName)
    const text = fs.readFileSync(fullPath, 'utf8')

    const {
      data: { title, date },
      content,
    } = matter(text)

    return {
      title,
      date,
      content,
    }
  })
}
