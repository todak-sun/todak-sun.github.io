const path = require(`path`)

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  createPage({
    path: '/using-dsg',
    component: require.resolve('./src/templates/using-dsg.js'),
    context: {},
    defer: true,
  })
}
