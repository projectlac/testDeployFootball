import PlayerDetailComponent from '@/components/PlayerOrCoach/components/PlayerDetail'
import Default from '@/layouts/Default'
import { getMenus, getMetaData, getPlayerDetail } from '@/resources/api-constants'
import { IPlayerDetail, IServerProps } from '@/types/app-type'
import { METADATA_TYPE } from '@/utility/constant'
import { renderPrefixLang } from '@/utility/stringToSlug'
import { GetServerSidePropsContext } from 'next'

interface IDataFootball {
  playerInfo: IPlayerDetail
}

const PlayerDetail = ({ data, metadata, menu }: IServerProps<IDataFootball>) => {
  return (
    <Default metadata={metadata} menu={menu}>
      <PlayerDetailComponent data={data} />
    </Default>
  )
}

export default PlayerDetail

export const config = {
  runtime: 'experimental-edge' // warn: using an experimental edge runtime, the API might change
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const params = context.params
  const slugRaw: string = (params?.slug as string) ?? ''
  const dateRaw: string = (params?.date as string) ?? ''

  const [metadata, menu] = await Promise.all([
    getMetaData({ type: METADATA_TYPE.PLAYER, slug: dateRaw, url: `${renderPrefixLang(context.locale ?? '')}${slugRaw}/${dateRaw}/player` }),
    getMenus(context.locale ?? 'en')
  ])

  try {
    const player = await getPlayerDetail(+dateRaw)

    return { props: { data: { playerInfo: player.data }, metadata: metadata.data, menu } }
  } catch (error) {
    return { props: { data: { playerInfo: {} }, metadata: metadata.data, menu } }
  }
}
