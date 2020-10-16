'use strict'

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer({
  async redirects() {
    return [
      {
        source: '/',
        destination: '/79b255e9f2074c9691e88e40dc79f054',
        permanent: true
      }
    ]
  }
})
