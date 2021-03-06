import React from 'react'
import Head from 'next/head'

import { getPageTitle, getAllPagesInSpace } from 'notion-utils'
import { NotionAPI } from 'notion-client'
import { NotionRenderer } from 'react-notion-x'

const notion = new NotionAPI()

export const getStaticProps = async (context) => {
  const pageId = context.params.pageId as string
  const recordMap = await notion.getPage(pageId)

  return {
    props: {
      recordMap
    },
    revalidate: 10
  }
}

export async function getStaticPaths() {
  const rootNotionPageId = '79b255e9f2074c9691e88e40dc79f054'
  const rootNotionSpaceId = 'f225ce83-48e1-4217-8126-c47ff80789dc'

  // This crawls all public pages starting from the given root page in order
  // for next.js to pre-generate all pages via static site generation (SSG).
  // This is a useful optimization but not necessary; you could just as easily
  // set paths to an empty array to not pre-generate any pages at build time.
  const pages = await getAllPagesInSpace(
    rootNotionPageId,
    rootNotionSpaceId,
    notion.getPage.bind(notion)
  )

  const paths = Object.keys(pages).map((pageId) => `/${pageId}`)

  return {
    paths,
    fallback: true
  }
}

export default function NotionPage({ recordMap }) {
  if (!recordMap) {
    return null
  }

  const title = getPageTitle(recordMap)
  console.log(title, recordMap)

  return (
    <>
      <Head>
        <meta name='description' content='炎炎龙虾的个人主页' />
        <title>{title}</title>
      </Head>

      <NotionRenderer recordMap={recordMap} fullPage={true} darkMode={false} />
    </>
  )
}
