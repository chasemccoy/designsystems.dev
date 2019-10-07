require('dotenv').config()

module.exports = {
  siteMetadata: {
    title: `designsystems.dev`,
    siteUrl: `https://designsystems.dev`,
    description: `Tools and resources for developing design systems.`,
  },
  plugins: [
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-layout',
      options: {
        component: require.resolve('./src/components/Layout'),
      },
    },
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: process.env.AIRTABLE_API_KEY,
        tables: [
          {
            baseId: 'appj22sdZFlI6FzjI',
            tableName: 'Table 1',
            queryName: 'data',
          },
        ],
      },
    },
  ],
}
