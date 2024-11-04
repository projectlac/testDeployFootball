import api from '@/api/api_instance'
import Default from '@/layouts/Default'
import { getMenus, getMetaData, getTeamsByPopularLeagues } from '@/resources/api-constants'
import { IListOfLeague, IServerProps } from '@/types/app-type'
import { GetServerSidePropsContext } from 'next'
import dynamic from 'next/dynamic'

interface IDataFootball {
  leagues: IListOfLeague
}

const Club = dynamic(() => import('@/components/Page/Club'))

const ClubPage = ({ data, metadata, menu }: IServerProps<IDataFootball>) => {
  return (
    <Default metadata={metadata} menu={menu}>
      <Club data={data}></Club>
    </Default>
  )
}

export default ClubPage

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const params = context.params
  const slugRaw: string = (params?.slug as string) ?? ''
  api.defaults.headers.common['lang'] = context.locale
  const url = context.locale == 'vi' ? '/vi/club' : '/club'
  const metadata = await getMetaData({ type: 'club', slug: slugRaw, url: url })
  const menu = await getMenus(context.locale ?? 'en')

  //pre-render data

  try {
    const leagues = await getTeamsByPopularLeagues()

    return { props: { data: { leagues: leagues }, metadata: metadata.data, menu } }
  } catch (error) {
    return { props: { data: { leagues: {} }, metadata: metadata.data, menu } }
  }
}
