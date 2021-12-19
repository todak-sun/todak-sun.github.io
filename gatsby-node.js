const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
 
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })

    if (!node.frontmatter.updated) {
      node.frontmatter.updated = `-`
    }

    createNodeField({
      name: `slug`,
      node: node,
      value: slug,
    })
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
    const { fields, frontmatter } = node
    const { slug } = fields
    const { created, updated } = frontmatter

    createPage({
      path: `/blogs${slug}`,
      component: blogTemplate,
      context: { slug },
      defer: true,
    })
  })
}


