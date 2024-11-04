import api from '@/api/api_instance'
import Default from '@/layouts/Default'
import { getBookmakers, getMatchDetail, getMenus, getMetaData } from '@/resources/api-constants'
import { IServerProps } from '@/types/app-type'
import { renderPrefixLang } from '@/utility/stringToSlug'
import { GetServerSidePropsContext } from 'next'
import dynamic from 'next/dynamic'

interface IDataFootball {
  match: any
  bookmakerId: number
}

const MatchDetail = dynamic(() => import('@/components/Page/MatchDetail'))

const NationalListPage = ({ data, metadata, menu }: IServerProps<IDataFootball>) => {
  return (
    <Default metadata={metadata} menu={menu}>
      {data ? <MatchDetail data={data}></MatchDetail> : 'Loading'}
    </Default>
  )
}

export default NationalListPage

export async function getServerSideProps(context: GetServerSidePropsContext) {
  api.defaults.headers.common['lang'] = context.locale
  const params = context.params
  const slugRaw: string = (params?.slug as string) ?? ''
  const dateRaw: string = (params?.date as string) ?? ''

  const [metadata, menu] = await Promise.all([
    getMetaData({ type: 'fixture', slug: slugRaw, url: `${renderPrefixLang(context.locale ?? '')}${slugRaw}/${dateRaw}/match` }),
    getMenus(context.locale ?? 'en')
  ])

  //pre-render data

  try {
    const result = await getBookmakers()
    const bookmakerId = result.data[0].id
    const match = await getMatchDetail({ bookmaker_id: bookmakerId }, slugRaw, dateRaw)
    return { props: { data: { match: match.data, bookmakerId: bookmakerId }, metadata: metadata.data, menu } }
  } catch (error) {
    return { props: { data: {}, metadata: metadata.data, menu } }
  }
}
