import * as React from 'react'
import LayoutContainer from '../components/layout'
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
      <LayoutContainer>
        <h1>{frontmatter.title}</h1>
        <h2>{frontmatter.created}</h2>
        <h2>{frontmatter.updated}</h2>
        <div className="blog-content" dangerouslySetInnerHTML={{ __html: html }} />
      </LayoutContainer>
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
        created
        updated
      }
    }
  }
`

export default Blog;