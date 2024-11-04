import { getFixturesByCountry, getFixturesByTeamOrLeague } from '@/resources/api-constants'
import { useAppDispatch } from '@/store/reducers/store'
import { loadingAction } from '@/store/slice/loading.slice'
import { ILeagueMatches, IServerProps } from '@/types/app-type'
import dynamic from 'next/dynamic'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const Tournament = dynamic(() => import('@/components/Tournament'))
const InfiniteScroll = dynamic(() => import('react-infinite-scroll-component'))

const ResultPage = ({ data }: IServerProps<ILeagueMatches>) => {
  const [isLoadMore, setIsLoadMore] = useState(true)
  const [page, setPage] = useState(1)
  const [fixtures, setFixtures] = useState<ILeagueMatches | null>(data)
  const [leagues, setLeagues] = useState<ILeagueMatches | null>(data)
  // Page type 1 is National page, 0 is Club page
  const [pageType, setPageType] = useState(1)
  const dispatch = useAppDispatch()

  const params = useParams<{ slug: string }>()

  useEffect(() => {
    setPage(1)
    setFixtures(data)
    setLeagues(data)

    if (!params?.slug?.includes('-football')) {
      setPageType(0)
    } else {
      setPageType(1)
    }
    if (Object.entries(data ?? []).length < 15) {
      setIsLoadMore(false)
      return
    }
  }, [params?.slug])

  useEffect(() => {
    if (data) {
      dispatch(loadingAction.hide())
    } else {
      dispatch(loadingAction.show())
    }
  }, [data])

  const fetchFixturesByTeamOrLeague = async (page: number) => {
    try {
      if (!params?.slug) {
        return
      }
      const teamSlug = params?.slug.includes('-football') ? params?.slug.replace('-football', '') : params?.slug
      const result = await getFixturesByTeamOrLeague({
        slug: teamSlug,
        status: 2,
        page,
        perPage: 15
      })

      if (Object.entries(result.data).length < 15) {
        setIsLoadMore(false)
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
        const result = await getFixturesByCountry({
          countrySlug: teamSlug,
          status: 2,
          page
        })

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
    <div>
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
            fetchFixturesByTeamOrLeague(page + 1)
          }}
          dataLength={Object.entries(fixtures).length}
        >
          {Object.entries(fixtures).map((item) => {
            return <Tournament key={item[0]} league={item[1]?.league} country={item[1]?.country} name={item[0]} matches={item[1]?.items} />
          })}
        </InfiniteScroll>
      )}
    </div>
  )
}

export default ResultPage
