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
    `gatsby-plugin-sass`
  ],
}

export default config
