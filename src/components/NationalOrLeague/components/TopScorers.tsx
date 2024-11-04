import NationalOrTournament from '@/components/NationalOrLeague/NationalOrLeague'
import Default from '@/layouts/Default'
import { getLeagues } from '@/resources/api-constants'
import { ROUTES } from '@/resources/routes-constants'
import { useAppDispatch } from '@/store/reducers/store'
import { loadingAction } from '@/store/slice/loading.slice'
import { ILeague, IServerProps, ITopScorePlayer, ITopScorePlayerClubResponse, ITopScorePlayerResponse } from '@/types/app-type'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

interface IDataFootball {
  highest: ITopScorePlayer[]
  league: ILeague[]
  topScore: ITopScorePlayer[] | ITopScorePlayerResponse | ITopScorePlayerClubResponse | null
}

const TopScoresPage = ({ data, metadata, menu }: IServerProps<IDataFootball>) => {
  const dispatch = useAppDispatch()

  const [isLoadMore, setIsLoadMore] = useState(true)
  const [page, setPage] = useState(1)
  // Page type 1 is National page, 0 is Club page
  const [pageType, setPageType] = useState(1)
  const [leagues, setLeagues] = useState<ILeague[] | null>(data?.league)
  const params = useParams<{ slug: string }>()

  const fetchLeagues = async (page: number) => {
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
  useEffect(() => {
    dispatch(loadingAction.show())
    setPage(1)
    if (!params?.slug?.includes('-football')) {
      setPageType(0)
    } else {
      setPageType(1)
    }
  }, [params?.slug])

  return (
    <Default menu={menu} metadata={metadata}>
      <NationalOrTournament metadata={metadata}>
        <div>
          <div className="py-2.5 pl-1 my-2.5 bg-[#f9f9f9] border border-[#eee]">
            <h1 className="text-sm font-bold text-red">TOP GHI BÀN BÓNG ĐÁ MỚI NHẤT</h1>
          </div>
          {pageType === 0 && (
            <>
              {typeof data.topScore === 'object' && !Array.isArray(data.topScore) && data.topScore !== null && (
                <div>
                  {Object.entries(data.topScore).map((league, index) => {
                    return (
                      <>
                        <div className="pl-2.5 py-1.5 mb-4 border-l-4 border-secondary bg-[#edf2f7] flex items-center justify-between">
                          <div>
                            <span className="text-primary hover:text-red text-sm font-bold">{league[0]}</span>
                          </div>
                          <div className="clear-both"></div>
                        </div>
                        <table key={index} className="w-full text-center flex sm:table">
                          <thead>
                            <tr className="bg-[#edf2f7] text-sm [&>th]:p-2 flex flex-col items-start sm:table-row w-[108px] sm:w-auto">
                              <th>XH</th>
                              <th className="text-left">Cầu thủ</th>
                              <th>Bàn thắng</th>
                              <th>Penalty</th>
                            </tr>
                          </thead>
                          {league[1] && Array.isArray(league[1]) && league[1].length > 0 && (
                            <tbody className="flex flex-row sm:table-row-group overflow-auto">
                              {league[1].map((item, index) => {
                                return (
                                  <tr key={index} className="text-sm [&>td]:p-2 border-b border-[#eee] flex flex-col sm:table-row">
                                    <td>{index + 1}</td>
                                    <td className="text-left">
                                      <p>{item.player_name}</p>
                                    </td>
                                    <td>{item.goals}</td>
                                    <td>{item.penalty}</td>
                                  </tr>
                                )
                              })}
                            </tbody>
                          )}
                        </table>
                      </>
                    )
                  })}
                </div>
              )}
              {data?.topScore && Array.isArray(data?.topScore) && data?.topScore.length > 0 && (
                <table className="w-full text-center flex sm:table">
                  <thead>
                    <tr className="bg-[#edf2f7] text-sm [&>th]:p-2 flex flex-col items-start sm:table-row w-[108px] sm:w-auto">
                      <th>XH</th>
                      <th className="text-left">Cầu thủ</th>
                      <th>Bàn thắng</th>
                      <th>Penalty</th>
                    </tr>
                  </thead>
                  <tbody className="flex flex-row sm:table-row-group overflow-auto">
                    {data.topScore.map((item, index) => {
                      return (
                        <tr key={index} className="text-sm [&>td]:p-2 border-b border-[#eee] flex flex-col sm:table-row">
                          <td>{index + 1}</td>
                          <td className="text-left">
                            <p>
                              <strong>{item.player_name}</strong>
                            </p>
                            <p>{item.team_name}</p>
                          </td>
                          <td>{item.goals}</td>
                          <td>{item.penalty}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              )}
            </>
          )}
          {pageType === 1 && leagues && (
            <>
              <table className="w-full text-center flex sm:table">
                <thead>
                  <tr className="bg-[#edf2f7] text-sm [&>th]:p-2 flex flex-col items-start sm:table-row w-[108px] sm:w-auto">
                    <th>XH</th>
                    <th className="text-left">Đội bóng</th>
                    <th>Bàn thắng</th>
                    <th>Penalty</th>
                  </tr>
                </thead>
                {data?.highest && data.highest.length > 0 && (
                  <tbody className="flex flex-row sm:table-row-group overflow-auto">
                    {data.highest.map((item, index) => {
                      return (
                        <tr key={index} className="text-sm [&>td]:p-2 border-b border-[#eee] flex flex-col sm:table-row">
                          <td>{index + 1}</td>
                          <td className="text-left">
                            <p>{item.player_name}</p>
                            <p>{item.team}</p>
                          </td>
                          <td>{item.goals}</td>
                          <td>{item.penalty}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                )}
              </table>
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
                  <span>Giải đấu</span>
                  <span>Cập nhật</span>
                </div>
                {leagues.map((item, index) => {
                  return (
                    <div key={index} className="text-sm [&>td]:p-2 border-b border-[#eee] px-2 py-2.5 flex justify-between">
                      <Link
                        className="text-primary hover:text-red font-bold flex items-center gap-4"
                        href={ROUTES.TOURNAMENT_TOP_SCORES.replace(':id', item.slug ?? '')}
                      >
                        <Image width={20} height={20} className="max-w-5" src={item.logo} alt={item.name} />
                        Vua phá lưới {item.name}
                      </Link>
                      <div>{new Date(item.updated_at).toLocaleDateString()}</div>
                    </div>
                  )
                })}
              </InfiniteScroll>
            </>
          )}
        </div>
      </NationalOrTournament>
    </Default>
  )
}

export default TopScoresPage
