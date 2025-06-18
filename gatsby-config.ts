import type { GatsbyConfig } from "gatsby"

const config: GatsbyConfig = {
  flags: {
    DEV_SSR: true
  },
  developMiddleware: app => {
    app.use((req: any, res: { set: (arg0: string, arg1: string) => void; }, next: () => void) => {
     res.set('Cross-Origin-Embedder-Policy', 'require-corp');
     res.set('Cross-Origin-Opener-Policy', 'same-origin');
     next();
   });
 },
  siteMetadata: {
    title: `CodeVideo`,
    description: `Convert code snippets into videos.`,
    author: `Chris Frewin`,
    siteUrl: `https://codevideo.io`, // Add your site URL here
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `CodeVideo`,
        short_name: `CodeVideo`,
        start_url: `/`,
        background_color: `#23ffb2`,
        theme_color: `#23ffb2`,
        display: `minimal-ui`,
        icon: `src/images/favicon.svg`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark'
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/src/content`
      }
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        // Exclude dev pages and other non-public pages
        excludes: [`/dev-404-page/`, `/404/`, `/offline-plugin-app-shell-fallback/`],
        // Custom query to get lastmod dates from your markdown files
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allSitePage {
              nodes {
                path
              }
            }
            allMarkdownRemark {
              nodes {
                frontmatter {
                  date
                }
                fields {
                  slug
                }
              }
            }
          }
        `,
        resolvePages: ({
          allSitePage: { nodes: allPages },
          allMarkdownRemark: { nodes: allMarkdownNodes },
        }: any) => {
          const markdownNodeMap = allMarkdownNodes.reduce((acc: any, node: any) => {
            const { fields, frontmatter } = node
            if (fields?.slug) {
              acc[fields.slug] = frontmatter
            }
            return acc
          }, {})

          return allPages.map((page: any) => {
            return { ...page, ...markdownNodeMap[page.path] }
          })
        },
        serialize: ({ path, date }: any) => {
          return {
            url: path,
            lastmod: date || new Date().toISOString(),
          }
        },
      },
    },
  ],
}

export default config
