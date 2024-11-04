import { getTopScores } from '@/resources/api-constants'
import { useAppDispatch } from '@/store/reducers/store'
import { loadingAction } from '@/store/slice/loading.slice'
import { ITopScorePlayer, ITopScorePlayerClubResponse, ITopScorePlayerResponse } from '@/types/app-type'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const TopScores = () => {
  const t = useTranslations('TopScocers')
  const dispatch = useAppDispatch()
  const params = useParams<{ slug: string }>()
  const [players, setPlayers] = useState<ITopScorePlayer[] | ITopScorePlayerResponse | ITopScorePlayerClubResponse | null>(null)

  const fetchTopScores = async () => {
    try {
      if (!params?.slug) {
        return
      }
      const currentYear = new Date().getFullYear()
      const result = await getTopScores({
        slug: params?.slug.includes('-football') ? params?.slug.replace('-football', '') : params?.slug,
        season: currentYear
      })
      setPlayers(result)
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(loadingAction.hide())
    }
  }
  useEffect(() => {
    dispatch(loadingAction.show())
    fetchTopScores()
  }, [params?.slug])

  return (
    <div>
      {players &&
        Object.entries(players).map((item, index) => {
          return (
            <div key={index}>
              <div className="pl-2.5 py-1.5 mb-4 border-l-4 border-secondary bg-[#edf2f7] flex items-center justify-between">
                <div>
                  <span className="text-primary hover:text-red text-sm font-bold">{item[0]}</span>
                </div>
                <div className="clear-both"></div>
              </div>
              <table className="w-full text-center">
                <thead>
                  <tr className="bg-[#edf2f7] text-sm [&>th]:p-2  w-[108px]">
                    <th>{t('match')}</th>
                    <th className="text-left">{t('player')}</th>
                    <th>{t('goals')}</th>
                    <th>{t('penalty')}</th>
                  </tr>
                </thead>

                <tbody className=" overflow-auto">
                  {item[1].map((player: ITopScorePlayer, index: number) => {
                    return (
                      <tr key={index} className="text-sm [&>td]:p-2 border-b border-[#eee] ">
                        <td>{index + 1}</td>
                        <td className="text-left">
                          <p>
                            <b>{player.player_name}</b>
                          </p>
                          <p>{player.team_name}</p>
                        </td>
                        <td>{player.goals}</td>
                        <td>{player.penalty}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )
        })}
    </div>
  )
}

export default TopScores
