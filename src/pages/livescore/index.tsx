import api from '@/api/api_instance'
import NoData from '@/components/NoData/NoData'
import Tournament from '@/components/Tournament'
import Default from '@/layouts/Default'
import { getLiveFixtures, getMenus, getMetaData } from '@/resources/api-constants'
import { useAppDispatch } from '@/store/reducers/store'
import { loadingAction } from '@/store/slice/loading.slice'
import { ILeagueMatches, IServerProps } from '@/types/app-type'
import { renderPrefixLang } from '@/utility/stringToSlug'
import { isEmpty, isUndefined } from 'lodash'
import { GetServerSidePropsContext } from 'next'
import { useEffect, useState } from 'react'

interface IDataFootball {
  leagues: ILeagueMatches | null
}

const LiveScore = ({ data, metadata, menu }: IServerProps<IDataFootball>) => {
  const [leagues, setLeagues] = useState<ILeagueMatches | null>(data.leagues)
  const dispatch = useAppDispatch()

  useEffect(() => {
    // fetchFixtures()
    const intervalId = setInterval(() => {
      fetchFixtures()
    }, 300000)
    return () => clearInterval(intervalId)
  }, [])

  const fetchFixtures = async () => {
    dispatch(loadingAction.show())
    try {
      const result = await getLiveFixtures()
      setLeagues(result.data)
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(loadingAction.hide())
    }
  }
  return (
    <div>
      {isUndefined(data) ? (
        <Default menu={menu} metadata={metadata}>
          Loading...
        </Default>
      ) : (
        <>
          {isEmpty(data) ? (
            <Default menu={menu} metadata={metadata}>
              <NoData />
            </Default>
          ) : (
            <Default menu={menu} metadata={metadata}>
              {leagues &&
                Object.entries(leagues).map((item) => {
                  return <Tournament key={item[0]} country={item[1].country} league={item[1].league} name={item[0]} matches={item[1].items} />
                })}
            </Default>
          )}
        </>
      )}
    </div>
  )
}

export default LiveScore

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const params = context.params
  const slugRaw: string = (params?.slug as string) ?? ''
  api.defaults.headers.common['lang'] = context.locale
  const metadata = await getMetaData({ type: 'livescore', slug: slugRaw, url: `${renderPrefixLang(context.locale ?? '')}livescore` })
  const menu = await getMenus(context.locale ?? 'en')
  //pre-render data
  const result = await getLiveFixtures()

  return { props: { data: { leagues: result.data }, metadata: metadata.data, menu } }
}
