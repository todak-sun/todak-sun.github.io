import { Image, List } from 'antd'
import { graphql, Link } from 'gatsby'
import React, { useState } from 'react'
import LayoutContainer from '../../components/layout'
import { imageQuery } from '../../utils/gatsby-graphql-supporter'

interface IBlogIndexPageProps {
  path: string
  data: any
}

interface IEdge {
  node: Inode
}

interface Inode {
  excerpt: string
  fields: { slug: string }
  frontmatter: any
}

interface IPost {
  excerpt: string
  path: string
  created: string
  updated: string
  title: string
  thumbnail: string
}

const BlogIndexPage = (props: IBlogIndexPageProps) => {
  const { data } = props

  const [postList, setPostList] = useState<IPost[]>(
    data.allMarkdownRemark.edges.map((edge: IEdge) => ({
      excerpt: edge.node.excerpt,
      path: edge.node.fields.slug,
      created: edge.node.frontmatter.created,
      updated: edge.node.frontmatter.updated,
      title: edge.node.frontmatter.title,
      thumbnail: imageQuery(edge.node.frontmatter.thumbnail).src,
    }))
  )

  return (
    <LayoutContainer>
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
        renderItem={(post: IPost) => (
          <List.Item
            key={post.path}
            extra={
              <Image
                width={272}
                alt="thumbnail"
                src={post.thumbnail}
                onClick={e => {
                  console.log(e)
                }}
              />
            }
          >
            {/* <List.Item.Meta avatar={<Avatar src={post.thumbnail} />} /> */}
            <Link to={`/blogs${post.path}`}>{post.title}</Link>
            <p>{post.excerpt}</p>
            <p>{post.created}</p>
            <p>{post.updated}</p>
          </List.Item>
        )}
      />
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
            created(formatString: "YYYY년 MM월 DD일")
            updated(formatString: "YYYY년 MM월 DD일")
          }
        }
      }
    }
  }
`

export default BlogIndexPage
