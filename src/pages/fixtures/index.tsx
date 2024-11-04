import api from '@/api/api_instance'
import NoData from '@/components/NoData/NoData'
import { usePrevious } from '@/hooks/usePrevious'
import { getFixtures, getMenus, getMetaData } from '@/resources/api-constants'
import { useAppDispatch } from '@/store/reducers/store'
import { loadingAction } from '@/store/slice/loading.slice'
import { ILeagueMatches, IServerProps } from '@/types/app-type'
import { getNextDate, getNextDateWithYear } from '@/utility/date'
import { renderPrefixLang } from '@/utility/stringToSlug'
import { isEmpty, isUndefined } from 'lodash'
import { GetServerSidePropsContext } from 'next'
import { useTranslations } from 'next-intl'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

interface IDataFootball {
  result: ILeagueMatches | null
}

const Default = dynamic(() => import('@/layouts/Default'))
const Tournament = dynamic(() => import('@/components/Tournament'))
const InfiniteScroll = dynamic(() => import('react-infinite-scroll-component'))

const FixturesPage = ({ data, metadata, menu }: IServerProps<IDataFootball>) => {
  const t = useTranslations('Predictions')
  const [isLoadMore, setIsLoadMore] = useState(true)
  const [page, setPage] = useState(1)
  const [leagues, setLeagues] = useState<ILeagueMatches | null>(data?.result)
  const numbers = Array.from({ length: 9 }, (_, i) => i)
  const [day, setDay] = useState(0)
  const dispatch = useAppDispatch()
  const prevDay = usePrevious(day)

  useEffect(() => {
    fetchData(1)
  }, [day])

  const fetchData = async (page: number) => {
    dispatch(loadingAction.show())
    try {
      const formattedDate = getNextDateWithYear(day)

      const result = await getFixtures({ date: formattedDate, page: prevDay !== day ? 1 : page })

      if (prevDay !== day) {
        setPage(1)
        setLeagues(result.data)
      } else {
        if (Object.entries(result.data).length < 15) {
          setIsLoadMore(false)
          return
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
      {isUndefined(data.result) ? (
        <Default menu={menu} metadata={metadata}>
          Loading...
        </Default>
      ) : (
        <>
          {isEmpty(data.result) ? (
            <Default menu={menu} metadata={metadata}>
              <NoData />
            </Default>
          ) : (
            <Default menu={menu} metadata={metadata}>
              <div className="flex items-center text-nowrap whitespace-nowrap overflow-x-auto pb-2.5">
                {numbers.map((number, index) => {
                  return (
                    <span key={number}>
                      <span
                        onClick={() => setDay(number)}
                        className={
                          day === number
                            ? 'px-3 py-1 bg-secondary rounded text-primary  hover:cursor-pointer text-sm mr-2'
                            : 'px-3 py-1 bg-[#dce0e4] rounded text-primary hover:text-primary hover:bg-secondary hover:cursor-pointer text-sm mr-2'
                        }
                      >
                        {index === 0 ? t('today') : index === 1 ? t('tomorrow') : getNextDate(number)}
                      </span>
                    </span>
                  )
                })}
              </div>

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
                  {Object.entries(leagues).map((item, index) => {
                    return <Tournament key={index} league={item[1].league} country={item[1].country} name={item[0]} matches={item[1].items} />
                  })}
                </InfiniteScroll>
              )}
            </Default>
          )}
        </>
      )}
    </div>
  )
}

export default FixturesPage

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const params = context.params
  const slugRaw: string = (params?.slug as string) ?? ''
  api.defaults.headers.common['lang'] = context.locale
  const metadata = await getMetaData({ type: 'fixtures', slug: slugRaw, url: `${renderPrefixLang(context.locale ?? '')}fixtures` })
  const menu = await getMenus(context.locale ?? 'en')

  //pre-render data

  try {
    const formattedDate = getNextDateWithYear(0)
    const result = await getFixtures({ date: formattedDate, page: 1 })

    return { props: { data: { result: result.data }, metadata: metadata.data, menu } }
  } catch (error) {
    return { props: { data: [], metadata: metadata.data, menu } }
  }
}
