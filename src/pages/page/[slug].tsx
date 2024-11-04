// import Tournament from '@/components/Tournament'

import api from '@/api/api_instance'
import { getMenus, getMetaData, getPage } from '@/resources/api-constants'
import { IAboutUs, IAppMenu, IMetadataModel } from '@/types/app-type'
import { renderPrefixLang } from '@/utility/stringToSlug'
import { GetServerSidePropsContext } from 'next'
import dynamic from 'next/dynamic'

const Default = dynamic(() => import('@/layouts/Default'))

const AboutUs = ({ data, metadata, menu }: { data: IAboutUs; metadata: IMetadataModel; menu: IAppMenu }) => {
  return (
    <Default menu={menu} metadata={metadata}>
      <>
        <h1 className="py-1 mb-2.5  border-b border-[#eee] font-bold text-red">{data?.title}</h1>
        <div className="text-sm py-2.5  my-2 *:mb-2 px-1 mb-2 custom-page" dangerouslySetInnerHTML={{ __html: data.body }}></div>
      </>
    </Default>
  )
}

export default AboutUs

export async function getServerSideProps(context: GetServerSidePropsContext) {
  api.defaults.headers.common['lang'] = context.locale
  context.res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59')
  const slug = (context.params?.['slug'] ?? '') as string
  const [metadata, menu] = await Promise.all([
    getMetaData({ type: 'page', slug: slug, url: `${renderPrefixLang(context.locale ?? '')}page/${slug}` }),
    getMenus(context.locale ?? 'en')
  ])
  // Fetch data from external API
  try {
    const result = await getPage(slug)

    // Pass data to the page via props
    return { props: { data: result.data, metadata: metadata.data, menu } }
  } catch (error) {
    return { props: { data: null, metadata: metadata.data, menu } }
  }
}
