/**
 * @file page - first-post
 */

import Link from 'next/link';
import {useCallback} from 'react';

export default function FirstPost() {
  console.log('执行了')
  
  const clickMe = useCallback(() => {
    console.log('you clicked me')
  }, [])
  
  return (
    <>
    First Post
    <hr/>
    
    <button onClick={clickMe}>click me</button>
    
    <hr/>
    <Link href="/"><button>回到首页</button></Link>
  </>
  )
 }
