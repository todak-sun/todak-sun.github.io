import * as React from 'react'
import LayoutContainer from '../../components/layout'
import { getImage } from 'gatsby-plugin-image'
import { graphql, Link } from 'gatsby'
import { Avatar, List } from 'antd'

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
    thumbnail: getImage(edge.node.frontmatter.thumbnail) ,
  }))

  console.log(postList)

  return (
    <LayoutContainer>
      <p>여기는 블로그 메인이다.</p>

      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: page => {
            console.log(page)
          },
          pageSize: 10,
        }}
        dataSource={postList}
        footer={
          <div>
            <p>footer</p>
          </div>
        }
        renderItem={(item: any) => (
          <List.Item key={item.path}>
            <List.Item.Meta avatar={<Avatar src={item.thumbnail} />} />
            {item.title}
          </List.Item>
        )}
      />

      <ul>
        {postList.map((post: any) => (
          <li key={post.path}>
            <Link to={`/blogs${post.path}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </LayoutContainer>
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
            title
            thumbnail
            created(formatString: "MMM DD, YYYY")
            updated(formatString: "MMM DD, YYYY")
          }
        }
      }
    }
  }
`

export default BlogIndexPage
