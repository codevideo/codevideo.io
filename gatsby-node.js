const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

// AllActionDescriptions data from codevideo-types package
const AllActionDescriptions = [
    // from AuthorActions
    { name: "author-speak-before", description: "Author speaks before the next action", valueDescription: "The content the author speaks before." },
    { name: "author-speak-after", description: "Author speaks after the next action", valueDescription: "The content the author speaks after." },
    { name: "author-speak-during", description: "Author speaks during the next action", valueDescription: "The content the author speaks during." },
    { name: "author-wait", description: "Author waits for given amount of time in milliseconds.", valueDescription: "The amount of time to wait in milliseconds." },
    // from EditorActions
    { name: "editor-type", description: "Type in the currently active editor.", valueDescription: "The text to type in the editor." },
    { name: "editor-save", description: "Save the currently active editor.", valueDescription: "The file to save." },
    { name: "editor-arrow-up", description: "Move the editor caret up one row.", valueDescription: "The number of rows to move up." },
    { name: "editor-arrow-down", description: "Move the editor caret down one row.", valueDescription: "The number of rows to move down." },
    { name: "editor-arrow-left", description: "Move the editor caret left one column.", valueDescription: "The number of columns to move left." },
    { name: "editor-arrow-right", description: "Move the editor caret right one column.", valueDescription: "The number of columns to move right." },
    { name: "editor-enter", description: "Press the Enter key in the editor.", valueDescription: "The number of times to press Enter." },
    { name: "editor-tab", description: "Press the Tab key in the editor.", valueDescription: "The number of times to press Tab." },
    { name: "editor-shift+arrow-left", description: "Hold Shift and move the editor caret left.", valueDescription: "The number of columns to move left." },
    { name: "editor-shift+arrow-right", description: "Hold Shift and move the editor caret right.", valueDescription: "The number of columns to move right." },
    { name: "editor-shift+arrow-down", description: "Hold Shift and move the editor caret down.", valueDescription: "The number of rows to move down." },
    { name: "editor-shift+arrow-up", description: "Hold Shift and move the editor caret up.", valueDescription: "The number of rows to move up." },
    { name: "editor-cmd+d", description: "Press Cmd+D in the editor.", valueDescription: "The number of times to press Cmd+D." },
    { name: "editor-backspace", description: "Press the Backspace key in the editor.", valueDescription: "The number of times to press Backspace." },
    { name: "editor-space", description: "Press the Space key in the editor.", valueDescription: "The number of times to press Space." },
    { name: "editor-highlight-code", description: "Highlight code in the editor.", valueDescription: "The code to highlight." },
    { name: "editor-delete-line", description: "Delete the current line in the editor.", valueDescription: "The line to delete." },
    { name: "editor-command-left", description: "Hold Command and move the editor caret left.", valueDescription: "The number of columns to move left." },
    { name: "editor-command-right", description: "Hold Command and move the editor caret right.", valueDescription: "The number of columns to move right." },
    { name: "editor-command-d", description: "Hold Command and press D in the editor.", valueDescription: "The number of times to press Cmd+D." },
    { name: "editor-command-c", description: "Hold Command and press C in the editor.", valueDescription: "The number of times to press Cmd+C." },
    { name: "editor-command-v", description: "Hold Command and press V in the editor.", valueDescription: "The number of times to press Cmd+V." },
    { name: "editor-shift-down-arrow", description: "Hold Shift and move the editor caret down.", valueDescription: "The number of rows to move down." },
    { name: "editor-shift-up-arrow", description: "Hold Shift and move the editor caret up.", valueDescription: "The number of rows to move up." },
    { name: "editor-scroll-up", description: "Scroll the editor up.", valueDescription: "The number of pixels to scroll up." },
    { name: "editor-scroll-down", description: "Scroll the editor down.", valueDescription: "The number of pixels to scroll down." },
    { name: "editor-show-context-menu", description: "Show the context menu in the editor.", valueDescription: "The number of times to show the context menu - should typically be '1'." },
    { name: "editor-hide-context-menu", description: "Hide the context menu in the editor.", valueDescription: "The number of times to hide the context menu - should typically be '1'." },
    // from MouseActions
    { name: "mouse-move-file-explorer", description: "Move the mouse to the middle of the file explorer.", valueDescription: "The number of times to move to the middle of the file explorer - should typically be '1'." },
    { name: "mouse-move-editor", description: "Move the mouse in the editor.", valueDescription: "The number of times to move in the editor." },
    { name: "mouse-move-editor-tab", description: "Move the mouse over an editor tab.", valueDescription: "The file name of the tab to move over." },
    { name: "mouse-move-editor-tab-close", description: "Move the mouse over the close button of an editor tab.", valueDescription: "The name of the tab to move over." },
    { name: "mouse-move-terminal", description: "Move the mouse in the terminal.", valueDescription: "The number of times to move in the terminal." },
    { name: "mouse-move-terminal-tab", description: "Move the mouse over a terminal tab.", valueDescription: "The name of the tab to move over." },
    { name: "mouse-move-terminal-tab-close", description: "Move the mouse over the close button of a terminal tab.", valueDescription: "The name of the tab to move over." },
    { name: "mouse-move-file-explorer-file", description: "Move the mouse over a file in the file explorer.", valueDescription: "The name of the file to move over." },
    { name: "mouse-move-file-explorer-folder", description: "Move the mouse over a folder in the file explorer.", valueDescription: "The name of the folder to move over." },
    { name: "mouse-move-to-coordinates-pixels", description: "Move the mouse to specific coordinates in pixels.", valueDescription: "The coordinates in pixels to move to." },
    { name: "mouse-move-to-coordinates-percent", description: "Move the mouse to specific coordinates in percent.", valueDescription: "The coordinates in percent to move to." },
    { name: "mouse-left-click", description: "Move the mouse performs a left click.", valueDescription: "The number of times to perform a left click - should typically be '1'." },
    { name: "mouse-double-left-click", description: "Move the mouse performs a double left click.", valueDescription: "The number of times to perform a double left click - should typically be '1'." },
    { name: "mouse-triple-left-click", description: "Move the mouse performs a triple left click.", valueDescription: "The number of times to perform a triple left click - should typically be '1'." },
    { name: "mouse-right-click", description: "Move the mouse performs a right click.", valueDescription: "The number of times to perform a right click - should typically be '1'." },
    { name: "mouse-right-double-click", description: "Move the mouse performs a double right click.", valueDescription: "The number of times to perform a double right click - should typically be '1'." },
    { name: "mouse-right-triple-click", description: "Move the mouse performs a triple right click.", valueDescription: "The number of times to perform a triple right click - should typically be '1'." },
    // from FileExplorerActions
    { name: "file-explorer-set-present-working-directory", description: "Sets the present working directory in the file explorer.", valueDescription: "The path to set as the present working directory." },
    { name: "file-explorer-set-file-contents", description: "Set file contents of a file in the file explorer.", valueDescription: "The contents to set for the file." },
    { name: "file-explorer-set-file-caret-position", description: "Sets the caret position of a file in the file explorer.", valueDescription: "The file name, row, and col to set the caret position." },
    { name: "file-explorer-create-file", description: "Create a file in the file explorer.", valueDescription: "The name of the file to create." },
    { name: "file-explorer-open-file", description: "Open a file in the file explorer.", valueDescription: "The name of the file to open." },
    { name: "file-explorer-close-file", description: "Close a file in the file explorer.", valueDescription: "The name of the file to close." },
    { name: "file-explorer-rename-file", description: "Rename a file in the file explorer.", valueDescription: "The old and new names for the file." },
    { name: "file-explorer-delete-file", description: "Delete a file in the file explorer.", valueDescription: "The name of the file to delete." },
    { name: "file-explorer-move-file", description: "Move a file in the file explorer.", valueDescription: "The old and new paths for the file." },
    { name: "file-explorer-copy-file", description: "Copy a file in the file explorer.", valueDescription: "The old and new paths for the file." },
    { name: "file-explorer-create-folder", description: "Create a new folder in the file explorer.", valueDescription: "The name of the folder to create." },
    { name: "file-explorer-expand-folder", description: "Expand a folder in the file explorer.", valueDescription: "The name of the folder to expand." },
    { name: "file-explorer-collapse-folder", description: "Collapse a folder in the file explorer.", valueDescription: "The name of the folder to collapse." },
    { name: "file-explorer-rename-folder", description: "Rename a folder in the file explorer.", valueDescription: "The old and new names for the folder." },
    { name: "file-explorer-delete-folder", description: "Delete a folder in the file explorer.", valueDescription: "The name of the folder to delete." },
    { name: "file-explorer-toggle-folder", description: "Toggle a folder in the file explorer.", valueDescription: "The name of the folder to toggle." },
    { name: "file-explorer-move-folder", description: "Move a folder in the file explorer.", valueDescription: "The old and new paths for the folder." },
    { name: "file-explorer-copy-folder", description: "Copy a folder in the file explorer.", valueDescription: "The old and new paths for the folder." },
    // from TerminalActions
    { name: "terminal-open", description: "Opens the terminal.", valueDescription: "The number of times to open the terminal - should typically be '1'." },
    { name: "terminal-type", description: "Types in the terminal.", valueDescription: "The text to type in the terminal." },
    { name: "terminal-arrow-up", description: "Arrow up in the terminal. Shows the previous command, if any.", valueDescription: "The number of times to press arrow up in the terminal - should typically be '1'." },
    { name: "terminal-arrow-down", description: "Arrow down in the terminal.", valueDescription: "The number of times to press arrow down in the terminal." },
    { name: "terminal-arrow-left", description: "Arrow left in the terminal.", valueDescription: "The number of times to press arrow left in the terminal." },
    { name: "terminal-arrow-right", description: "Arrow right in the terminal.", valueDescription: "The number of times to press arrow right in the terminal." },
    { name: "terminal-enter", description: "Enter key in the terminal. Submits the command.", valueDescription: "The number of times to press enter in the terminal - should typically be '1'." },
    { name: "terminal-tab", description: "Tab key in the terminal.", valueDescription: "The number of times to press tab in the terminal - should typically be '1'." },
    { name: "terminal-shift+arrow-right", description: "Shift + arrow right in the terminal.", valueDescription: "The number of times to press shift + arrow right in the terminal - should typically be '1'." },
    { name: "terminal-shift+arrow-left", description: "Shift + arrow left in the terminal.", valueDescription: "The number of times to press shift + arrow left in the terminal - should typically be '1'." },
    { name: "terminal-backspace", description: "Backspace key in the terminal.", valueDescription: "The number of times to press backspace in the terminal - should typically be '1'." },
    { name: "terminal-space", description: "Space key in the terminal.", valueDescription: "The number of times to press space in the terminal - should typically be '1'." },
    { name: "terminal-command-left", description: "Command + arrow left in the terminal.", valueDescription: "The number of times to press command + arrow left in the terminal - should typically be '1'." },
    { name: "terminal-command-right", description: "Command + arrow right in the terminal.", valueDescription: "The number of times to press command + arrow right in the terminal - should typically be '1'." },
    { name: "terminal-command-c", description: "Command + c in the terminal.", valueDescription: "The number of times to press command + c in the terminal - should typically be '1'." },
    { name: "terminal-command-v", description: "Command + v in the terminal.", valueDescription: "The number of times to press command + v in the terminal - should typically be '1'." },
    { name: "terminal-set-output", description: "Sets the output in the terminal.", valueDescription: "The output to set in the terminal. Used to simulate terminal output." },
    { name: "terminal-set-prompt", description: "Sets the prompt in the terminal.", valueDescription: "The prompt to set in the terminal. Can be used for custom terminal prompts." },
    { name: "terminal-set-present-working-directory", description: "Sets the present working directory in the terminal.", valueDescription: "The directory to set as the present working directory in the terminal." },
    // from ExternalActions
    { name: "external-browser", description: "Show a browser. The value can be any valid URL. Won't work for URLs that have blocked iframe usage.", valueDescription: "The URL to open in the external browser." },
    { name: "external-browser-scroll", description: "Scrolls the external browser.", valueDescription: "The number of pixels offset to scroll in the external browser." },
    { name: "external-web-preview", description: "Preview the current codebase in an external web browser", valueDescription: "The number of times to open the preview - should typically be '1'." },
    // from SlideActions
    { name: "slide-display", description: "Show a slide. The value can be any valid markdown representing the slide.", valueDescription: "The markdown content of the slide." }
];

// This function creates a schema for the frontmatter fields
// including the relatedTerms nested object
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  
  // Define the schema for relatedTerms and actions
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

    type ActionData implements Node {
      name: String!
      description: String!
      valueDescription: String!
    }
  `
  createTypes(typeDefs)
}

exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions

  // Create nodes for each action
  AllActionDescriptions.forEach(action => {
    const nodeId = createNodeId(`action-${action.name}`)
    const nodeData = {
      ...action,
      id: nodeId,
      internal: {
        type: 'ActionData',
        contentDigest: createContentDigest(action),
      },
    }
    createNode(nodeData)
  })
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
  const actionTemplate = path.resolve(`./src/templates/action.tsx`)
  const actionsIndexTemplate = path.resolve(`./src/templates/actions-index.tsx`)

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
        allActionData {
          nodes {
            name
            description
            valueDescription
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

  // Create individual action pages
  const actionNodes = result.data.allActionData.nodes
  actionNodes.forEach((action) => {
    createPage({
      path: `/actions/${action.name}`,
      component: actionTemplate,
      context: {
        actionName: action.name
      }
    })
  })

  // Create the actions index page
  createPage({
    path: '/actions/',
    component: actionsIndexTemplate,
    context: {}
  })
  
  // Log information about created pages
  console.log(`Created ${blogPosts.length} blog posts`)
  console.log(`Created ${posts.filter(post => post.node.fields.contentType === 'feature').length} feature pages`)
  console.log(`Created ${posts.filter(post => post.node.fields.contentType === 'guide').length} guide pages`)
  console.log(`Created ${glossaryNodes.length} glossary pages`)
  console.log(`Created ${actionNodes.length} action pages`)
  console.log('Created glossary index page')
  console.log('Created actions index page')
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