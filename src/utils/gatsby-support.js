exports.recreateSlug = slug => {
  let result = ''
  if (slug.endsWith('/')) {
    result = slug.slice(0, slug.length - 1)
  }
  return result
}

exports.fillFrontmatter = frontmatter => {
  const defaultFrontmatter = {
    title: '',
    updated: frontmatter.created,
    tags: [],
    categories: '',
    group: '',
    display: true,
  }

  return { ...defaultFrontmatter, ...frontmatter }
}
