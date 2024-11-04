import api from '@/api/api_instance'
import CompactPlayer from '@/components/PlayerOrCoach/components/Compact'
import { getCoachs, getMenus, getMetaData } from '@/resources/api-constants'
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
  api.defaults.headers.common['lang'] = context.locale
  const menu = await getMenus(context.locale ?? 'en')
  // fetch data
  const [metadata, playerList] = await Promise.all([
    getMetaData({
      slug: slugRaw,
      url: `${renderPrefixLang(context.locale ?? '')}coachs`,
      type: METADATA_TYPE.COACH_LIST
    }),
    getCoachs({ perPage: 32 })
  ])

  //pre-render data
  return { props: { data: { playerList: playerList }, metadata: metadata.data, menu } }
}
