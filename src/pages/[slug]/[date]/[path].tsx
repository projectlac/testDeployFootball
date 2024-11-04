// import Tournament from '@/components/Tournament'

import { getMenus, getMetaData } from '@/resources/api-constants'
import { IAppMenu, IMetadataModel } from '@/types/app-type'
import { renderPrefixLang } from '@/utility/stringToSlug'
import { GetServerSidePropsContext } from 'next'
import dynamic from 'next/dynamic'

const Default = dynamic(() => import('@/layouts/Default'))

const HomePage = ({ metadata, menu }: { metadata: IMetadataModel; menu: IAppMenu }) => {
  return (
    <Default menu={menu} metadata={metadata}>
      <>1234</>
    </Default>
  )
}

export default HomePage

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Fetch data from external API
  try {
    const slug = ''
    const [metadata, menu] = await Promise.all([
      getMetaData({ type: 'home', slug: slug, url: `${renderPrefixLang(context.locale ?? '')}` }),
      getMenus(context.locale ?? 'en')
    ])
    // Pass data to the page via props
    return { props: { data: null, metadata: metadata.data, menu } }
  } catch (error) {
    return {
      redirect: {
        permanent: true,
        destination: '/not-found'
      }
    }
  }
}
