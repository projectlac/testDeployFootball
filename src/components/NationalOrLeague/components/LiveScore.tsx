import Default from '@/layouts/Default'
import { getFixturesByTeamOrLeague, getFixturesByCountry } from '@/resources/api-constants'
import { useAppDispatch } from '@/store/reducers/store'
import { loadingAction } from '@/store/slice/loading.slice'
import { IServerProps, ILeagueMatches } from '@/types/app-type'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import NationalOrTournament from '../NationalOrLeague'
import dynamic from 'next/dynamic'

const Tournament = dynamic(() => import('@/components/Tournament'))

const LiveScorePage = ({ data, metadata, menu }: IServerProps<ILeagueMatches>) => {
  const [isLoadMore, setIsLoadMore] = useState(true)
  const [page, setPage] = useState(1)
  // Page type 1 is National page, 0 is Club page
  const [pageType, setPageType] = useState(1)
  const [leagues, setLeagues] = useState<ILeagueMatches | null>(data)
  const [fixtures, setFixtures] = useState<ILeagueMatches | null>(data)
  const dispatch = useAppDispatch()

  const params = useParams<{ slug: string }>()

  useEffect(() => {
    dispatch(loadingAction.show())

    if (!params?.slug?.includes('-football')) {
      setPageType(0)
      setFixtures(data)
    } else {
      setPageType(1)
      setLeagues(data)
    }
    if (Object.entries(data ?? []).length < 15) {
      setIsLoadMore(false)
      return
    }
  }, [params?.slug])

  const fetchFixturesByLeague = async (page: number) => {
    try {
      if (!params?.slug) {
        return
      }
      const result = await getFixturesByTeamOrLeague({ slug: params?.slug, status: 3, page, perPage: 15 })

      if (Object.entries(result.data).length < 15) {
        setIsLoadMore(false)
        return
      }
      if (fixtures) {
        setFixtures({ ...fixtures, ...result.data })
      } else {
        setFixtures(result.data)
      }
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(loadingAction.hide())
    }
  }

  const fetchData = async (page: number) => {
    try {
      if (params?.slug) {
        const teamSlug = params?.slug.includes('-football') ? params?.slug.replace('-football', '') : params?.slug
        const result = await getFixturesByCountry({ countrySlug: teamSlug, status: 3, page })

        if (Object.entries(result.data).length < 15) {
          setIsLoadMore(false)
        }
        if (leagues) {
          setLeagues({ ...leagues, ...result.data })
        } else {
          setLeagues(result.data)
        }
      }
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(loadingAction.hide())
    }
  }

  return (
    <Default menu={menu} metadata={metadata}>
      <NationalOrTournament metadata={metadata}>
        {pageType === 1 && leagues && (
          <InfiniteScroll
            style={{
              height: 'unset',
              overflow: 'unset'
            }}
            hasMore={isLoadMore}
            loader={<p>Loading...</p>}
            next={() => {
              setPage((prev) => prev + 1)
              fetchData(page + 1)
            }}
            dataLength={Object.entries(leagues).length}
          >
            {Object.entries(leagues).map((item) => {
              return <Tournament key={item[0]} league={item[1]?.league} country={item[1]?.country} name={item[0]} matches={item[1]?.items} />
            })}
          </InfiniteScroll>
        )}
        {pageType === 0 && fixtures && (
          <InfiniteScroll
            style={{
              height: 'unset',
              overflow: 'unset'
            }}
            hasMore={isLoadMore}
            loader={<p>Loading...</p>}
            next={() => {
              setPage((prev) => prev + 1)
              fetchFixturesByLeague(page + 1)
            }}
            dataLength={Object.entries(fixtures).length}
          >
            {Object.entries(fixtures).map((item) => {
              return <Tournament key={item[0]} league={item[1]?.league} country={item[1]?.country} name={item[0]} matches={item[1]?.items} />
            })}
          </InfiniteScroll>
        )}
      </NationalOrTournament>
    </Default>
  )
}

export default LiveScorePage
