import React from 'react'
import { graphql } from 'gatsby'

interface QueryResult {
  data: MarkdownQueryResult
}

interface MarkdownQueryResult {
  markdownRemark: MarkdownRemark
}

interface MarkdownRemark {
  frontmatter: any
  html: any
}

export default function Template({ data }: QueryResult) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  return (
    <div className="blog-post-container">
      <div className="blog-post">
        <h1>{frontmatter.title}</h1>
        <h2>{frontmatter.date}</h2>
        <div className="blog-post-content" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  )
}

export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
    }
  }
`
