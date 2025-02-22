export const generateHtmlDocument = (content: string, additionalStyles = '', title = "CodeVideo") => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>${title}</title>
      <style>
        body { 
          font-family: system-ui, sans-serif;
          line-height: 1.6;
          max-width: 800px;
          margin: 2rem auto;
          padding: 0 1rem;
        }
        pre { background: #f6f8fa; padding: 1rem; border-radius: 4px; }
        code { font-family: monospace; }
        ${additionalStyles}
      </style>
    </head>
    <body>
      ${content}
    </body>
  </html>
`;