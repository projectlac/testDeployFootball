// import Tournament from '@/components/Tournament'

import api from '@/api/api_instance'
import { usePrevious } from '@/hooks/usePrevious'
import { getFixtures, getMenus, getMetaData } from '@/resources/api-constants'
import { useAppDispatch } from '@/store/reducers/store'
import { loadingAction } from '@/store/slice/loading.slice'
import { IAppMenu, ILeagueMatches, IMetadataModel } from '@/types/app-type'
import { getPrevDate, getPrevDateWithYear } from '@/utility/date'
import { renderPrefixLang } from '@/utility/stringToSlug'
import { GetServerSidePropsContext } from 'next'
import { useTranslations } from 'next-intl'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const Tournament = dynamic(() => import('@/components/Tournament'))
const Default = dynamic(() => import('@/layouts/Default'))
const InfiniteScroll = dynamic(() => import('react-infinite-scroll-component'))

const HomePage = ({ data, metadata, menu }: { data: ILeagueMatches; metadata: IMetadataModel; menu: IAppMenu }) => {
  const t = useTranslations('Predictions')
  const [isLoadMore, setIsLoadMore] = useState(true)
  const [page, setPage] = useState(1)
  const [leagues, setLeagues] = useState<ILeagueMatches | null>(data)
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
      const formattedDate = getPrevDateWithYear(day)

      const result = await getFixtures({
        date: formattedDate,
        page: prevDay !== day ? 1 : page,
        perPage: 5
      })

      if (Object.entries(result.data).length < 5) {
        setIsLoadMore(false)
      }
      if (prevDay !== day) {
        setPage(1)
        setLeagues(result.data)
      } else {
        setLeagues({ ...leagues, ...result.data })
      }
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(loadingAction.hide())
    }
  }
  return (
    <Default menu={menu} metadata={metadata}>
      <>
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
                  {index === 0 ? t('today') : index === 1 ? t('yesterday') : getPrevDate(number)}
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
      </>
    </Default>
  )
}

export default HomePage

export async function getServerSideProps(context: GetServerSidePropsContext) {
  api.defaults.headers.common['lang'] = context.locale
  context.res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59')
  const slug = ''
  const [metadata, menu] = await Promise.all([
    getMetaData({ type: 'home', slug: slug, url: `${renderPrefixLang(context.locale ?? '')}` }),
    getMenus(context.locale ?? 'en')
  ])

  // Fetch data from external API
  try {
    const day = 0
    const formattedDate = getPrevDateWithYear(day)
    const result = await getFixtures({
      date: formattedDate,
      page: 1,
      perPage: 5
    })

    // Pass data to the page via props
    return { props: { data: result.data, metadata: metadata.data, menu } }
  } catch (error) {
    return { props: { data: null, metadata: metadata.data, menu } }
  }
}
