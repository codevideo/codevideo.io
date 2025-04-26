const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

// This function creates a schema for the frontmatter fields
// including the relatedTerms nested object
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  
  // Define the schema for relatedTerms
  const typeDefs = `
    type MarkdownRemarkFrontmatter {
      title: String
      date: Date @dateformat
      description: String
      author: String
      relatedTerms: [RelatedTerm]
    }
    
    type RelatedTerm {
      title: String
      slug: String
    }
  `
  createTypes(typeDefs)
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  // resolve templates
  const blogPost = path.resolve(`./src/templates/blog-post.tsx`)
  // Initially, we can reuse the blog post template for features
  const featureTemplate = blogPost
  const guideTemplate = blogPost
  const glossaryTemplate = path.resolve(`./src/templates/glossary-term.tsx`)
  const glossaryIndexTemplate = path.resolve(`./src/templates/glossary-index.tsx`)

  const result = await graphql(
    `
      {
        allMarkdownRemark(sort: {frontmatter: {title: ASC}}) {
          edges {
            node {
              id
              fields {
                slug
                contentType
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create pages for different content types
  const posts = result.data.allMarkdownRemark.edges
  const blogPosts = posts.filter(post => post.node.fields.contentType === 'blog')
  
  // Create blog posts with previous/next navigation
  blogPosts.forEach((post, index) => {
    const previous = index === blogPosts.length - 1 ? null : blogPosts[index + 1].node
    const next = index === 0 ? null : blogPosts[index - 1].node
    
    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        id: post.node.id,
        previous,
        next
      }
    })
  })
  
  // Create feature pages
  posts.filter(post => post.node.fields.contentType === 'feature').forEach(post => {
    createPage({
      path: post.node.fields.slug,
      component: featureTemplate,
      context: {
        slug: post.node.fields.slug,
        id: post.node.id
      }
    })
  })

  // Create guide pages
  posts.filter(post => post.node.fields.contentType === 'guide').forEach(post => {
    createPage({
      path: post.node.fields.slug,
      component: guideTemplate,
      context: {
        slug: post.node.fields.slug,
        id: post.node.id
      }
    })
  })

  // Create glossary term pages
  const glossaryNodes = posts.filter(post => post.node.fields.contentType === 'glossary')
  
  glossaryNodes.forEach((post) => {
    createPage({
      path: post.node.fields.slug,
      component: glossaryTemplate,
      context: {
        slug: post.node.fields.slug,
        id: post.node.id
      }
    })
  })

  // Create the glossary index page
  createPage({
    path: '/glossary/',
    component: glossaryIndexTemplate,
    context: {}
  })
  
  // Log information about created pages
  console.log(`Created ${blogPosts.length} blog posts`)
  console.log(`Created ${posts.filter(post => post.node.fields.contentType === 'feature').length} feature pages`)
  console.log(`Created ${glossaryNodes.length} glossary pages`)
  console.log('Created glossary index page')
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    
    // Determine content type based on file path
    let contentType = 'blog'
    if (value.includes('/guides/')) {
      contentType = 'guide'
    } else if (value.includes('/features/')) {
      contentType = 'feature'
    } else if (value.includes('/glossary/')) {
      contentType = 'glossary'
    }
    
    // If it's a glossary item, ensure the slug is properly formed
    let slug = value
    if (contentType === 'glossary' && !slug.startsWith('/glossary/')) {
      slug = `/glossary${value}`
    }
    
    createNodeField({
      name: `slug`,
      node,
      value: slug
    })
    
    // Add contentType field
    createNodeField({
      name: `contentType`,
      node,
      value: contentType
    })
  }
}