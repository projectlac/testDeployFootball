import api from '@/api/api_instance'
import Default from '@/layouts/Default'
import { getMenus, getMetaData, getNationalGroupByRegion } from '@/resources/api-constants'
import { ICountryRegion, IServerProps } from '@/types/app-type'
import { renderPrefixLang } from '@/utility/stringToSlug'
import { GetServerSidePropsContext } from 'next'
import dynamic from 'next/dynamic'

interface IDataFootball {
  regionList: ICountryRegion[]
}

const NationalList = dynamic(() => import('@/components/Page/NationalList'))

const NationalListPage = ({ data, metadata, menu }: IServerProps<IDataFootball>) => {
  return (
    <Default metadata={metadata} menu={menu}>
      <NationalList data={data}></NationalList>
    </Default>
  )
}

export default NationalListPage

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const params = context.params
  const slugRaw: string = (params?.slug as string) ?? ''
  api.defaults.headers.common['lang'] = context.locale
  const metadata = await getMetaData({ type: 'national-teams', slug: slugRaw, url: `${renderPrefixLang(context.locale ?? '')}national-teams` })
  const menu = await getMenus(context.locale ?? 'en')

  //pre-render data

  try {
    const regionList = await getNationalGroupByRegion()
    return { props: { data: { regionList: regionList.data ?? [] }, metadata: metadata.data, menu } }
  } catch (error) {
    return { props: { data: [], metadata: metadata.data, menu } }
  }
}
