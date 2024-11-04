import NationalOrTournament from '@/components/NationalOrLeague/NationalOrLeague'
import Default from '@/layouts/Default'
import { getLeagues } from '@/resources/api-constants'
import { ROUTES } from '@/resources/routes-constants'
import { useAppDispatch } from '@/store/reducers/store'
import { loadingAction } from '@/store/slice/loading.slice'
import { IHighestLeagueStanding, ILeague, IServerProps, ITeamStanding } from '@/types/app-type'
import { CheckmarkFilled, CloseFilled, SubtractFilled } from '@carbon/icons-react'
import dayjs from 'dayjs'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

interface IDataFootball {
  highest: IHighestLeagueStanding
  league: ILeague[]
  standing: ITeamStanding[]
}

const StandingsPage = ({ data, metadata, menu }: IServerProps<IDataFootball>) => {
  const t = useTranslations('Standing')
  const dispatch = useAppDispatch()
  const params = useParams<{ slug: string }>()
  const [isLoadMore, setIsLoadMore] = useState(true)
  const [page, setPage] = useState(1)
  const [leagues, setLeagues] = useState<ILeague[] | null>(data?.league)
  const [teams, setTeams] = useState<ITeamStanding[] | null>(null)
  const [teamsStanding, setTeamsStanding] = useState<IHighestLeagueStanding | null>(null)
  // Page type 1 is National page, 0 is Club page
  const [pageType, setPageType] = useState(1)

  const fetchLeagues = async (page: number) => {
    dispatch(loadingAction.show())
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
        setLeagues([...result.data])
      }
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(loadingAction.hide())
    }
  }

  useEffect(() => {
    if (!params?.slug?.includes('-football')) {
      setPageType(0)
      setTeams(data?.standing)
    } else {
      setPageType(1)
      setTeamsStanding(data?.highest)
      setLeagues(data?.league)
    }
  }, [params?.slug])

  return (
    <Default menu={menu} metadata={metadata}>
      <NationalOrTournament metadata={metadata}>
        <div>
          {pageType === 0 && data?.standing && teams && (
            <table className="w-full text-center flex sm:table">
              <thead>
                <tr className="bg-[#edf2f7] text-sm [&>th]:p-2 flex flex-col items-start sm:table-row w-[108px] sm:w-auto">
                  <th>{t('rankingSort1')}</th>
                  <th className="text-left">{t('team')}</th>
                  <th>{t('match')}</th>
                  <th>{t('win')}</th>
                  <th>{t('draw')}</th>
                  <th>{t('lose')}</th>
                  <th>{t('goalScored')}</th>
                  <th>{t('goalConceded')}</th>
                  <th>{t('coefficient')}</th>
                  <th>{t('point')}</th>
                  <th>{t('formLast5Matches')}</th>
                </tr>
              </thead>
              <tbody className="flex flex-row sm:table-row-group overflow-auto">
                {teams &&
                  teams.map((item, index) => {
                    return (
                      <tr key={index} className="text-sm [&>td]:p-2 [&>td]:w-[80px] sm:[&>td]:w-auto border-b border-[#eee] flex flex-col sm:table-row">
                        <td>{index + 1}</td>
                        <td className="text-left overflow-hidden whitespace-nowrap">{item.team_name}</td>
                        <td>{item.all.played}</td>
                        <td>{item.all.win}</td>
                        <td>{item.all.draw}</td>
                        <td>{item.all.lose}</td>
                        <td>{item.all.goals.for}</td>
                        <td>{item.all.goals.against}</td>
                        <td>{item.goalsDiff}</td>
                        <td>{item.points}</td>
                        <td>
                          <div className="flex">
                            {item.form?.split('').map((item, index) => {
                              return (
                                <span key={index}>
                                  {item === 'W' && <CheckmarkFilled className="text-primary" />}
                                  {item === 'D' && <SubtractFilled className="text-[#EEE]" />}
                                  {item === 'L' && <CloseFilled className="text-red" />}
                                </span>
                              )
                            })}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          )}

          {pageType === 1 && leagues && (
            <>
              {teamsStanding && (
                <>
                  <div className="pl-2.5 py-1.5 mb-4 border-l-4 border-secondary bg-[#edf2f7] flex items-center justify-between">
                    <div>
                      <span className="text-primary hover:text-red text-sm font-bold">
                        {t('longtext', { name: data.highest?.name ?? '', season: data.highest?.season ?? dayjs().get('year') })}
                      </span>
                    </div>
                    <div className="clear-both"></div>
                  </div>
                  <table className="w-full text-center flex sm:table">
                    <thead>
                      <tr className="bg-[#edf2f7] text-sm [&>th]:p-2 flex flex-col items-start sm:table-row w-[108px] sm:w-auto">
                        <th>{t('rankingSort1')}</th>
                        <th className="text-left">{t('team')}</th>
                        <th>{t('match')}</th>
                        <th>{t('win')}</th>
                        <th>{t('draw')}</th>
                        <th>{t('lose')}</th>
                        <th>{t('goalScored')}</th>
                        <th>{t('goalConceded')}</th>
                        <th>{t('coefficient')}</th>
                        <th>{t('point')}</th>
                        <th>{t('formLast5Matches')}</th>
                      </tr>
                    </thead>
                    <tbody className="flex flex-row sm:table-row-group overflow-auto">
                      {data?.highest?.items?.map((item, index) => {
                        return (
                          <tr key={index} className="text-sm [&>td]:p-2 [&>td]:w-[80px] sm:[&>td]:w-auto border-b border-[#eee] flex flex-col sm:table-row">
                            <td>{index + 1}</td>
                            <td className="text-left overflow-hidden whitespace-nowrap">{item.team_name}</td>
                            <td>{item.all.played}</td>
                            <td>{item.all.win}</td>
                            <td>{item.all.draw}</td>
                            <td>{item.all.lose}</td>
                            <td>{item.all.goals.for}</td>
                            <td>{item.all.goals.against}</td>
                            <td>{item.goalsDiff}</td>
                            <td>{item.points}</td>
                            <td>
                              <div className="flex">
                                {item.form?.split('').map((item, index) => {
                                  return (
                                    <span key={index}>
                                      {item === 'W' && <CheckmarkFilled className="text-primary" />}
                                      {item === 'D' && <SubtractFilled className="text-[#EEE]" />}
                                      {item === 'L' && <CloseFilled className="text-red" />}
                                    </span>
                                  )
                                })}
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </>
              )}
              <div className="mt-4">
                <InfiniteScroll
                  style={{
                    height: 'unset',
                    overflow: 'unset'
                  }}
                  hasMore={isLoadMore}
                  loader={<p>Loading...</p>}
                  next={() => {
                    setPage((prev) => prev + 1)
                    fetchLeagues(page + 1)
                  }}
                  dataLength={leagues.length}
                >
                  <div className="bg-[#edf2f7] text-left text-sm [&>th]:p-2 flex justify-between px-2 py-2.5">
                    <span>{t('tournament')}</span>
                    <span>{t('update')}</span>
                  </div>
                  {leagues.map((item, index) => {
                    return (
                      <div key={index} className="text-sm [&>td]:p-2 border-b border-[#eee] px-2 py-2.5 flex justify-between">
                        <Link
                          className="text-primary hover:text-red font-bold flex items-center gap-4"
                          href={ROUTES.TOURNAMENT_STANDINGS.replace(':id', item.slug ?? '')}
                        >
                          <Image className="max-w-5" src={item.logo} alt={item.name} width={20} height={20} />
                          {t('rankingSort2')} {item.name}
                        </Link>
                        <div>{new Date(item.updated_at).toLocaleDateString()}</div>
                      </div>
                    )
                  })}
                </InfiniteScroll>
              </div>
            </>
          )}
        </div>
      </NationalOrTournament>
    </Default>
  )
}

export default StandingsPage
