import * as React from 'react'
import Layout from '../components/layout'
import { graphql } from 'gatsby'

interface BlogProps {
  data: any
  pageContext: { slug: string }
}

const Blog = (props: BlogProps) => {
  const { data } = props
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  return (
    <>
      <Layout>
        <h1>{frontmatter.title}</h1>
        <div className="blog-content" dangerouslySetInnerHTML={{ __html: html }} />
      </Layout>
    </>
  )
}

export const pageQuery = graphql`
  query ($slug: String) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt(truncate: true, format: PLAIN)
      frontmatter {
        title
      }
    }
  }
`

export default Blog;