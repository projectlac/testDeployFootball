import api from '@/api/api_instance'
import NationalOrTournament from '@/components/NationalOrLeague/NationalOrLeague'
import NoData from '@/components/NoData/NoData'
import PredictionTable from '@/components/Prediction/PredictionTable'
import Default from '@/layouts/Default'
import { getFixturePredictions, getMenus, getMetaData } from '@/resources/api-constants'
import { useAppDispatch } from '@/store/reducers/store'
import { loadingAction } from '@/store/slice/loading.slice'
import { ILeagueMatches, IServerProps } from '@/types/app-type'
import { getPrevDateWithYear } from '@/utility/date'
import { renderPrefixLang } from '@/utility/stringToSlug'
import { isEmpty, isUndefined } from 'lodash'
import { GetServerSidePropsContext } from 'next'
import { useParams } from 'next/navigation'
import { useCallback, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

interface IDataFootball {
  leagues: ILeagueMatches | null
}

const Predictions = ({ metadata, data, menu }: IServerProps<IDataFootball>) => {
  const dispatch = useAppDispatch()
  const [leagues, setLeagues] = useState<ILeagueMatches | null>(data.leagues)
  const [page, setPage] = useState<number>(1)
  const [isLoadMore, setIsLoadMore] = useState(true)

  const params = useParams<{ slug: string }>()

  const fetchData = useCallback(
    async (page: number) => {
      dispatch(loadingAction.show())
      try {
        const slug = params?.slug?.replace('-football', '')
        const type = params?.slug?.includes('-football') ? 'country' : 'league'
        const result = await getFixturePredictions({ date: getPrevDateWithYear(0), slug, type, page, per_page: 10 })

        if (Object.entries(result).length < 10) {
          setIsLoadMore(false)
          return
        }
        if (leagues) {
          setLeagues({ ...leagues, ...result })
        } else {
          setLeagues(result)
        }
      } catch (error) {
        console.log(error)
      } finally {
        dispatch(loadingAction.hide())
      }
    },
    [dispatch, params?.slug]
  )

  return (
    <div>
      {isUndefined(data.leagues) ? (
        <Default menu={menu} metadata={metadata}>
          <NationalOrTournament metadata={metadata}>{isEmpty(data.leagues) ? 'Nodata...' : 'Loading...'}</NationalOrTournament>
        </Default>
      ) : (
        <>
          <Default menu={menu} metadata={metadata}>
            <NationalOrTournament metadata={metadata}>
              {isEmpty(data.leagues) ? (
                <div>
                  <NoData />
                </div>
              ) : (
                <div className="mt-2">
                  {leagues !== null && Object.entries(leagues).length > 0 && (
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
                        return (
                          <div key={item[0]}>
                            <PredictionTable league={item[1].league} items={item[1].items} />
                          </div>
                        )
                      })}
                    </InfiniteScroll>
                  )}
                </div>
              )}
            </NationalOrTournament>
          </Default>
        </>
      )}
    </div>
  )
}

export default Predictions

export async function getServerSideProps(context: GetServerSidePropsContext) {
  api.defaults.headers.common['lang'] = context.locale
  const params = context.params
  const slugRaw = (params?.slug as string) ?? ''
  const slug = slugRaw.replace('-football', '')
  const type = slugRaw?.includes('-football') ? 'country' : 'league'
  // fetch data
  const menu = await getMenus(context.locale ?? 'en')
  const metadata = await getMetaData({
    type: type,
    slug: slug,
    url: `${renderPrefixLang(context.locale ?? '')}${slugRaw}/predictions`
  })

  try {
    const result = await getFixturePredictions({ date: getPrevDateWithYear(0), slug, type, page: 1, per_page: 10 })

    //pre-render data
    return { props: { data: { leagues: result }, metadata: metadata.data, menu } }
  } catch (error) {
    return {
      redirect: {
        permanent: false, // or true
        destination: '/not-found'
      }
    }
  }
}
