import { getLeagues, getStanding } from '@/resources/api-constants'
import { ROUTES } from '@/resources/routes-constants'
import { useAppDispatch } from '@/store/reducers/store'
import { loadingAction } from '@/store/slice/loading.slice'
import { ILeague, IServerProps, ITeamStanding } from '@/types/app-type'
import { CheckmarkFilled, CloseFilled, SubtractFilled } from '@carbon/icons-react'
import { useTranslations } from 'next-intl'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface IDataFootball {
  popularLeagues: ILeague[]
  leagues: ILeague[]
  standing: ITeamStanding[]
  currentLeague: string
  currentYear: number
}

const Default = dynamic(() => import('@/layouts/Default'))
const InfiniteScroll = dynamic(() => import('react-infinite-scroll-component'))
interface ICurrentLeague {
  slug: string
  season: number
}
const Standings = ({ data, metadata, menu }: IServerProps<IDataFootball>) => {
  const [isLoadMore, setIsLoadMore] = useState(true)
  const [leagues, setLeagues] = useState<ILeague[] | null>(data.leagues)
  const t = useTranslations('Standing')
  const [currentLeague, setCurrentLeague] = useState<ICurrentLeague | null>({ slug: data.currentLeague, season: data.currentYear })
  const [teams, setTeams] = useState<ITeamStanding[] | null>(data.standing)
  const [page, setPage] = useState(1)

  const dispatch = useAppDispatch()

  const fetchLeagues = async (page: number) => {
    dispatch(loadingAction.show())
    try {
      const result = await getLeagues({ page })

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

  const fetchStanding = async () => {
    dispatch(loadingAction.show())
    try {
      if (!currentLeague) {
        return
      }
      const result = await getStanding({ slug: currentLeague.slug, season: currentLeague.season })
      setTeams(result)
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(loadingAction.hide())
    }
  }

  useEffect(() => {
    if (currentLeague) {
      fetchStanding()
    }
  }, [currentLeague])
  return (
    <Default menu={menu} metadata={metadata}>
      <div className="border-b-2 border-secondary mt-2">
        <ul className="text-nowrap whitespace-nowrap overflow-x-auto flex">
          {data.popularLeagues &&
            data.popularLeagues.map((league, index) => {
              return (
                <li key={index}>
                  <span
                    onClick={() => setCurrentLeague({ slug: league.slug, season: league.current_season })}
                    className={
                      league.slug === currentLeague?.slug
                        ? 'px-2.5 py-2 text-sm cursor-pointer bg-secondary text-primary hover:text-red mr-1.5 inline-block'
                        : 'px-2.5 py-2 text-sm cursor-pointer bg-[#f0f0f0] text-primary hover:text-red mr-1.5 inline-block'
                    }
                  >
                    {league.name}
                  </span>
                </li>
              )
            })}
        </ul>
      </div>
      {currentLeague && teams && (
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
            {teams.map((item, index) => {
              return (
                <tr key={index} className="text-sm [&>td]:p-2 [&>td]:w-[80px] sm:[&>td]:w-auto border-b border-[#eee] flex flex-col sm:table-row">
                  <td>{item.rank}</td>
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
      {leagues && (
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
                    <Image className="max-w-5" width={20} height={20} src={item.logo} alt={item.name} />
                    {t('rankingSort2')} {item.name}
                  </Link>
                  <div>{new Date(item.updated_at).toLocaleDateString()}</div>
                </div>
              )
            })}
          </InfiniteScroll>
        </div>
      )}
    </Default>
  )
}

export default Standings
