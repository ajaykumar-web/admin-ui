/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Admin UI`,
    siteUrl: `https://www.yourdomain.tld`
  },
  flags: {
    DEV_SSR: true
  },
  plugins: ["gatsby-plugin-sass"]
};