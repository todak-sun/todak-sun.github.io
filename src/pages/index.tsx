import * as React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/layout'
import Seo from '../components/seo'

interface IndexPageProps {
  path: string
  data: any
}

const IndexPage = (props: IndexPageProps) => {
  const { data } = props
  console.log(data);
  return (
    <Layout>
      <Seo title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>

      <p>
        <Link to="/page-2/">Go to page 2</Link> <br />
        <Link to="/using-dsg">Go to "Using DSG"</Link>
      </p>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            slug
          }
        }
      }
    }
  }
`
