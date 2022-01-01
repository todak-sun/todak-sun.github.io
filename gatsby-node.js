const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const { recreateSlug, fillFrontmatter } = require(`./src/utils/gatsby-support`)

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    const frontMatter = fillFrontmatter(node.frontmatter)
    node.frontmatter = frontMatter

    createNodeField({
      name: `slug`,
      node: node,
      value: recreateSlug(slug),
    })
  }
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html' || stage === 'develop-html') {
    //TODO: Server Side Rendering 시 window 또는 document 찾지 않도록 하는 코드 삽입 예정.
  }
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const blogTemplate = require.resolve('./src/templates/Blog.tsx')
  const result = await graphql(`
    {
      allMarkdownRemark(sort: { fields: [frontmatter___created], order: DESC }, limit: 1000) {
        edges {
          node {
            fields {
              slug
            }
            fileAbsolutePath
            frontmatter {
              title
              updated(formatString: "YYYY-MM-DD")
              created(formatString: "YYYY-MM-DD")
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const { edges } = result.data.allMarkdownRemark

  edges.forEach(({ node }) => {
    const { fields, fileAbsolutePath } = node
    const { slug } = fields

    if (fileAbsolutePath.includes('_blogs')) {
      createPage({
        path: `/blogs${slug}`,
        component: blogTemplate,
        context: { slug },
        defer: true,
      })
    }
  })
}
