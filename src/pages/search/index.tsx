import api from '@/api/api_instance'
import { getMenus, getMetaData } from '@/resources/api-constants'
import { IAppMenu, ILeagueMatches, IMetadataModel } from '@/types/app-type'
import { renderPrefixLang } from '@/utility/stringToSlug'
import { GetServerSidePropsContext } from 'next'
import dynamic from 'next/dynamic'

const Default = dynamic(() => import('@/layouts/Default'))

type StaticProps = {
  data: ILeagueMatches
  metadata: IMetadataModel
  menu: IAppMenu
}
const Search = ({ metadata, menu }: StaticProps) => {
  return (
    <>
      <Default menu={menu} metadata={metadata}>
        <div className="gcse-search"></div>
      </Default>
    </>
  )
}

export default Search

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const params = context.params
  const slugRaw: string = (params?.slug as string) ?? ''
  api.defaults.headers.common['lang'] = context.locale
  // fetch data
  const metadata = await getMetaData({
    slug: slugRaw,
    url: `${renderPrefixLang(context.locale ?? '')}search`,
    type: 'search'
  })

  //pre-render data
  const menu = await getMenus(context.locale ?? 'en')
  //pre-render data
  return { props: { data: null, metadata: metadata.data, menu } }
}
