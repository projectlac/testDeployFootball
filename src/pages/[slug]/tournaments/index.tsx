import api from '@/api/api_instance'
import { getLeagues, getMenus, getMetaData, getTournaments } from '@/resources/api-constants'
import { ROUTES } from '@/resources/routes-constants'
import { useAppDispatch } from '@/store/reducers/store'
import { loadingAction } from '@/store/slice/loading.slice'
import { ILeague, IServerProps } from '@/types/app-type'
import { renderPrefixLang } from '@/utility/stringToSlug'
import { GetServerSidePropsContext } from 'next'
import { useTranslations } from 'next-intl'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const Default = dynamic(() => import('@/layouts/Default'))
const NationalOrTournament = dynamic(() => import('@/components/NationalOrLeague/NationalOrLeague'))
const InfiniteScroll = dynamic(() => import('react-infinite-scroll-component'))

interface IDataFootball {
  league: ILeague[]
  country: string
}

const TournamentIndex = ({ data, metadata, menu }: IServerProps<IDataFootball>) => {
  const t = useTranslations('Tournaments')
  const [leagues, setLeagues] = useState<ILeague[] | null>(data?.league)
  const [isLoadMore, setIsLoadMore] = useState(true)
  const [page, setPage] = useState(1)
  const dispatch = useAppDispatch()
  const params = useParams<{ slug: string }>()

  useEffect(() => {
    setLeagues(data?.league ?? [])
  }, [data?.league])

  const fetchData = async (page: number) => {
    try {
      if (!params?.slug) {
        return
      }
      const result = await getLeagues({
        countrySlug: params?.slug.includes('-football') ? params?.slug.replace('-football', '') : params?.slug,
        countryStandingPage: 1,
        page
      })

      if (result.data.length < 15) {
        setIsLoadMore(false)
      }
      if (leagues) {
        setLeagues([...leagues, ...result.data])
      } else {
        setLeagues(result.data)
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
        <div className="py-2.5 pl-1 my-2.5 bg-[#f9f9f9] border border-[#eee]">
          <h1 className="text-sm font-bold text-red uppercase">{t('title', { country: data?.country })} </h1>
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
            dataLength={leagues.length}
          >
            <table className="w-full">
              <thead>
                <tr className="bg-[#edf2f7] text-left text-sm [&>th]:p-2">
                  <th>{t('tournamentName')}</th>
                  <th>{t('rank')}</th>
                  <th>{t('format')}</th>
                </tr>
              </thead>
              <tbody>
                {leagues.map((item, index) => {
                  return (
                    <tr key={index} className="text-sm [&>td]:p-2 border-b border-[#eee]">
                      <td>
                        <Link
                          className="text-primary hover:text-red inline-flex gap-4 items-center"
                          href={ROUTES.NATIONAL_TOURNAMENT.replace(':id', item.slug ?? '')}
                        >
                          <Image width={20} height={20} className="max-w-5" src={item.logo} alt={item.name} />
                          {item.name}
                        </Link>
                      </td>
                      <td></td>
                      <td>{item.type}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </InfiniteScroll>
        )}
      </NationalOrTournament>
    </Default>
  )
}

export default TournamentIndex

export async function getServerSideProps(context: GetServerSidePropsContext) {
  api.defaults.headers.common['lang'] = context.locale
  const params = context.params
  const slugRaw: string = (params?.slug as string) ?? ''

  const slug = slugRaw.replace('-football', '')
  const type = slugRaw?.includes('-football') ? 'country' : 'league'
  const menu = await getMenus(context.locale ?? 'en')
  const metadata = await getMetaData({
    type: type,
    slug: slug,
    url: `${renderPrefixLang(context.locale ?? '')}${slugRaw}/tournaments`
  })

  //pre-render data

  try {
    const teamSlug = slugRaw?.includes('-football') ? slugRaw.replace('-football', '') : slugRaw
    const resultLeague = await getTournaments({
      countrySlug: teamSlug.includes('-football') ? teamSlug.replace('-football', '') : teamSlug,
      countryStandingPage: 1,
      page: 1
    })

    return { props: { data: { league: resultLeague.items.data ?? [], country: resultLeague.country }, metadata: metadata.data, menu } }
  } catch (error) {
    return {
      redirect: {
        permanent: false, // or true
        destination: '/not-found'
      }
    }
  }
}
