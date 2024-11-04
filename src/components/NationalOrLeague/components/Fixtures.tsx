import NationalOrTournament from '@/components/NationalOrLeague/NationalOrLeague'
import Tournament from '@/components/Tournament'
import Default from '@/layouts/Default'
import { getFixturesByCountry } from '@/resources/api-constants'
import { useAppDispatch } from '@/store/reducers/store'
import { loadingAction } from '@/store/slice/loading.slice'
import { ILeagueMatches, IServerProps } from '@/types/app-type'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

interface IDataFootball {
  teamOfLeague: ILeagueMatches | null
  country: ILeagueMatches | null
}

const FixturesPageGauGau = ({ data, metadata, menu }: IServerProps<IDataFootball>) => {
  const [isLoadMore, setIsLoadMore] = useState(true)
  const [page, setPage] = useState(1)
  // Page type 1 is National page, 0 is Club page
  const [pageType, setPageType] = useState(1)
  const [leagues, setLeagues] = useState<ILeagueMatches | null>(data?.country)
  const dispatch = useAppDispatch()
  const params = useParams<{ slug: string }>()

  useEffect(() => {
    dispatch(loadingAction.show())
    setLeagues(data?.country)
    if (!params?.slug?.includes('-football')) {
      setPageType(0)
    } else {
      setPageType(1)
    }
    if (Object.entries(data?.country ?? []).length < 15) {
      setIsLoadMore(false)
      return
    }
  }, [params?.slug])

  const fetchData = async (page: number) => {
    try {
      if (params?.slug) {
        const teamSlug = params?.slug.includes('-football') ? params?.slug.replace('-football', '') : params?.slug
        const result = await getFixturesByCountry({ countrySlug: teamSlug, status: 1, page })

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
      {menu && (
        <NationalOrTournament metadata={metadata}>
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
                  return <Tournament key={item[0]} league={item[1].league} country={item[1].country} name={item[0]} matches={item[1].items} />
                })}
              </InfiniteScroll>
            )}
            {pageType === 0 && data?.teamOfLeague && (
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
                dataLength={Object.entries(data.teamOfLeague).length}
              >
                {Object.entries(data.teamOfLeague).map((item) => {
                  return <Tournament key={item[0]} league={item[1].league} country={item[1].country} name={item[0]} matches={item[1].items} />
                })}
              </InfiniteScroll>
            )}
          </div>
        </NationalOrTournament>
      )}
    </Default>
  )
}

export default FixturesPageGauGau
