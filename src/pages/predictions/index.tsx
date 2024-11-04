import api from '@/api/api_instance'
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
import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

interface IDataFootball {
  leagues: ILeagueMatches | null
}

const Predictions = ({ metadata, data, menu }: IServerProps<IDataFootball>) => {
  const t = useTranslations('Predictions')
  const dispatch = useAppDispatch()
  const [leagues, setLeagues] = useState<ILeagueMatches | null>(data.leagues)
  const [date, setDate] = useState<string>(getPrevDateWithYear(0))
  const [page, setPage] = useState<number>(1)
  const [isLoadMore, setIsLoadMore] = useState(true)

  const dates = [
    {
      label: t('today'),
      value: getPrevDateWithYear(0)
    },
    {
      label: t('tomorrow'),
      value: getPrevDateWithYear(-1)
    }
  ]

  const fetchData = useCallback(
    async (page: number) => {
      dispatch(loadingAction.show())
      try {
        const result = await getFixturePredictions({ date: date, page, per_page: 10 })

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
    [date]
  )

  useEffect(() => {
    setLeagues(null)
    setPage(1)
    fetchData(1)
  }, [date])

  return (
    <Default menu={menu} metadata={metadata}>
      {dates.map((_date: { label: string; value: string }) => (
        <span key={_date.value}>
          {_date.value === date ? (
            <span className="px-3 py-1 bg-red rounded text-white  hover:cursor-pointer text-sm mr-2" onClick={() => setDate(_date.value)}>
              {_date.label}
            </span>
          ) : (
            <span className="px-3 py-1 bg-secondary rounded text-primary  hover:cursor-pointer text-sm mr-2" onClick={() => setDate(_date.value)}>
              {_date.label}
            </span>
          )}
        </span>
      ))}

      <div>
        {isUndefined(data.leagues) ? (
          'Loading..'
        ) : (
          <>
            {isEmpty(data.leagues) ? (
              <>
                <NoData />
              </>
            ) : (
              <>
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
              </>
            )}
          </>
        )}
      </div>
    </Default>
  )
}

export default Predictions

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const params = context.params
  const slug = (params?.slug as string) ?? ''
  api.defaults.headers.common['lang'] = context.locale
  // fetch data
  const menu = await getMenus(context.locale ?? 'en')

  const metadata = await getMetaData({
    type: 'predictions',
    slug: slug,
    url: `${renderPrefixLang(context.locale ?? '')}predictions`
  })

  const result = await getFixturePredictions({ date: getPrevDateWithYear(0), page: 1, per_page: 10 })

  //pre-render data
  return { props: { data: { leagues: result }, metadata: metadata.data, menu } }
}
