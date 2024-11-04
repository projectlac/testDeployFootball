import Tournament from '@/components/Tournament'
import { getFixturesByCountry } from '@/resources/api-constants'
import { useAppDispatch } from '@/store/reducers/store'
import { loadingAction } from '@/store/slice/loading.slice'
import { ILeagueMatches } from '@/types/app-type'
import { useParams } from 'next/navigation'
import { memo, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

const Result = () => {
  const [leagues, setLeagues] = useState<ILeagueMatches | null>(null)
  const [isLoadMore, setIsLoadMore] = useState(true)
  const [page, setPage] = useState(1)
  const dispatch = useAppDispatch()
  const params = useParams<{ slug: string }>()
  const fetchData = async (page: number) => {
    try {
      if (params?.slug) {
        const teamSlug = params?.slug.includes('-football') ? params?.slug.replace('-football', '') : params?.slug
        const result = await getFixturesByCountry({ countrySlug: teamSlug, status: 2, page })

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
  useEffect(() => {
    dispatch(loadingAction.show())
    fetchData(page)
  }, [params?.slug])
  return (
    <div>
      {leagues && (
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
    </div>
  )
}

export default memo(Result)
