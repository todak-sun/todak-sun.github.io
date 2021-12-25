import * as React from 'react'
import LayoutContainer from '../components/layout-container'
import { graphql } from 'gatsby'
import { imageQuery } from '../utils/gatsby-graphql-supporter'
import { Descriptions, PageHeader } from 'antd'

interface BlogProps {
  data: any
  pageContext: { slug: string }
}

const Blog = (props: BlogProps) => {
  const { data } = props
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  return (
    <LayoutContainer>
      <PageHeader title={frontmatter.title} style={{ backgroundImage: `${imageQuery(frontmatter.thumbnail).src}` }}>
        <Descriptions>
          <Descriptions.Item label="created">{frontmatter.created}</Descriptions.Item>
          <Descriptions.Item label="updated">{frontmatter.updated}</Descriptions.Item>
        </Descriptions>
      </PageHeader>
      <img src={imageQuery(frontmatter.thumbnail).src} />
      <div className="blog-content" dangerouslySetInnerHTML={{ __html: html }} />
    </LayoutContainer>
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
        thumbnail
      }
    }
  }
`

export default Blog
