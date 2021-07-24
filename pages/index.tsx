/**
 * @file page - index
 */

import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import png from 'assets/images/flight.jpg'

export default function Home() {
  return (
    <>
      第一篇文章：
      <Link href="/posts/first-post" passHref={true}>
        <Title>点击查看</Title>
      </Link>
      
      <Image src={png} alt=""/>
    </>
  )
}

const Title = styled.p`
  cursor: pointer;
  border: 1px solid pink;
  width: 100px;
  text-align: center;
  &:hover {
    background: lightgray;
  }
`
