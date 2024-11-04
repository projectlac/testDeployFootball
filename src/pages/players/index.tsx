import api from '@/api/api_instance'
import CompactPlayer from '@/components/PlayerOrCoach/components/Compact'
import { getMenus, getMetaData, getPlayers } from '@/resources/api-constants'
import { IPlayer, IServerProps, PaginationResponse } from '@/types/app-type'
import { METADATA_TYPE } from '@/utility/constant'
import { renderPrefixLang } from '@/utility/stringToSlug'
import { isUndefined } from 'lodash'
import { GetServerSidePropsContext } from 'next'
import dynamic from 'next/dynamic'

const PlayerOrCoach = dynamic(() => import('@/components/PlayerOrCoach/PlayerOrCoach'))
const Default = dynamic(() => import('@/layouts/Default'))

interface ICompact {
  playerList: PaginationResponse<IPlayer[]>
}

const CompactPlayerList = ({ data, metadata, menu }: IServerProps<ICompact>) => {
  return (
    <>
      {isUndefined(data) ? (
        <Default menu={menu} metadata={metadata}>
          Loading...
        </Default>
      ) : (
        <>
          <Default menu={menu} metadata={metadata}>
            <PlayerOrCoach metadata={metadata}>
              <CompactPlayer data={data} />
            </PlayerOrCoach>
          </Default>
        </>
      )}
    </>
  )
}

export default CompactPlayerList

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const params = context.params
  const slugRaw: string = (params?.slug as string) ?? ''
  const menu = await getMenus(context.locale ?? 'en')
  api.defaults.headers.common['lang'] = context.locale
  // fetch data
  const [metadata, playerList] = await Promise.all([
    getMetaData({
      slug: slugRaw,
      url: `${renderPrefixLang(context.locale ?? '')}players`,
      type: METADATA_TYPE.PLAYER_LIST
    }),

    getPlayers({ perPage: 32 })
  ])

  //pre-render data
  return { props: { data: { playerList: playerList }, metadata: metadata.data, menu } }
}
