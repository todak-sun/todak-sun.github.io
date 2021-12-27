const path = require(`path`);

exports.recreateSlug = slug => {
  let result = ''
  if (slug.endsWith('/')) {
    result = slug.slice(0, slug.length - 1)
  }
  return result
}

exports.fillFrontmatter = (frontmatter) => {
  console.log(frontmatter)
  const defaultFrontmatter = {
    title: '',
    updated: frontmatter.created,
    tags: [],
    categories: '',
    display: true,
    thumbnail : 'defaults/NULL.png',
  }

  return { ...defaultFrontmatter, ...frontmatter }
}
