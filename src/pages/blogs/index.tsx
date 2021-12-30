import { Col, Divider, Input, List, Row, Tag } from 'antd'
import { graphql } from 'gatsby'
import React, { useCallback, useState } from 'react'
import LayoutContainer from '../../components/layout-container'
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
  frontmatter: IFrontmatter
}

interface IFrontmatter {
  created: string
  tags: string[]
  updated: string
  title: string
  thumbnail: string
}

interface IPost {
  excerpt: string
  path: string
  created: string
  updated: string
  title: string
  thumbnail: string
  tags: string[]
}

const BlogIndexPage = (props: IBlogIndexPageProps) => {
  const { data } = props
  const edges: IEdge[] = data.allMarkdownRemark.edges
  const allPosts: IPost[] = edges.map(edge => ({
    excerpt: edge.node.excerpt,
    path: edge.node.fields.slug,
    created: edge.node.frontmatter.created,
    tags: edge.node.frontmatter.tags,
    updated: edge.node.frontmatter.updated,
    title: edge.node.frontmatter.title,
    thumbnail: imageQuery(edge.node.frontmatter.thumbnail).src,
  }))
  const [searchKeyword, setSearchKeyword] = useState<string>('')
  const targetPosts = useCallback((): IPost[] => allPosts.filter(post => post.title.includes(searchKeyword)), [searchKeyword])
  const onSearch = (value: string) => setSearchKeyword(value)

  return (
    <LayoutContainer>
      <Row>
        <Col flex="auto"></Col>
        <Col flex="300px">
          <Input.Search placeholder="검색어를 입력해주세요" onSearch={onSearch} enterButton />
        </Col>
      </Row>
      <List
        itemLayout="vertical"
        pagination={{
          onChange: page => {
            console.log(page)
          },
          pageSize: 10,
        }}
        dataSource={targetPosts()}
        renderItem={(post: IPost) => (
          <List.Item
            key={post.path}
            extra={
              <div style={{ position: 'relative', width: '250px', height: '100%' }}>
                <img alt="thumbnail" src={post.thumbnail} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
              </div>
            }
          >
            <List.Item.Meta title={post.title} description={<p>{post.updated === post.created ? post.created : `${post.created} (Updated: ${post.updated})`}</p>} />

            {post.excerpt}
            <Divider />
            <p>
              {post.tags
                .map(tag => `# ${tag}`)
                .map(tag => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
            </p>
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
            tags
            created(formatString: "YYYY.MM.DD")
            updated(formatString: "YYYY.MM.DD")
          }
        }
      }
    }
  }
`

export default BlogIndexPage
