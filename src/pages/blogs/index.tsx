import * as React from 'react'
import Layout from '../../components/layout'
import { graphql } from 'gatsby'

interface BlogIndexPageProps {
  path: string
  data: any
}

interface Edge {
  node: any
}

const BlogIndexPage = (props: BlogIndexPageProps) => {
  const { data } = props

  const postList = data.allMarkdownRemark.edges.map((edge: Edge) => ({
    path: edge.node.fields.slug,
    created: edge.node.frontmatter.created,
    updated: edge.node.frontmatter.updated,
    title: edge.node.frontmatter.title,
  }))

  return (
    <Layout>
      <p>여기는 블로그 메인이다.</p>
      <ul>
      {postList.map((post: any) => <li key={post.path}>{post.path}-{post.title}</li>)}
      </ul>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___created], order: DESC }, limit: 100) {
      edges {
        node {
          excerpt(truncate: true, format: PLAIN)
          fields {
            slug
          }
          frontmatter {
            created(formatString: "MMM DD, YYYY")
            updated(formatString: "MMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`

export default BlogIndexPage
