import { Link } from 'gatsby'
import * as React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'

const IndexPage = () => {
  return (
    <Layout>
      <Seo title="Home" />
      <h1>블로그 개설중</h1>
      <p>올해안에 대충이라도 만들어보고 싶은 페이지!</p>
      <p>
        <Link to="/blogs">블로그 글들</Link> <br />
      </p>
    </Layout>
  )
}

export default IndexPage
