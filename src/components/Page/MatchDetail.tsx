import CommentItem from '@/components/Comment/CommentItem'
import BettingOddTable from '@/components/MatchDetail/BettingOddTable'
import LineUp from '@/components/MatchDetail/LineUp'
import MatchEvent from '@/components/MatchDetail/MatchEvent'
import Statistics from '@/components/MatchDetail/Statistics'
import { getCommentList } from '@/resources/api-constants'
import { ROUTES } from '@/resources/routes-constants'
import { IComment, IStaticProps } from '@/types/app-type'
import { isEmpty, isNull } from 'lodash'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import CommentForm from '../Comment/CommentForm'
import { useAppSelector } from '@/store/reducers/store'
interface IDataFootball {
  match: any
  bookmakerId: number
}

interface IReplyComment {
  id: number
  name: string
}

const MatchDetail = ({ data }: IStaticProps<IDataFootball>) => {
  const [commentList, setCommentList] = useState<IComment[]>([])
  const user = useAppSelector((state) => state.user.user)
  const [replyCommentId, setReplyCommentId] = useState<{ id: number; name: string } | undefined>(undefined)
  const t = useTranslations('MatchDetail')
  const ts = useTranslations('MatchDetail.status')
  const u = useTranslations('Comment')
  const commentRef = useRef<HTMLTextAreaElement | null>(null)

  const setReplyComment = (data: IReplyComment | undefined) => {
    if (!isNull(data?.id)) {
      const section = document.getElementById('comment')
      if (section?.getBoundingClientRect()) {
        const top = section?.getBoundingClientRect()?.top + window.scrollY - 100
        window.scrollTo({ top: top, behavior: 'smooth' })
      }
      commentRef.current?.focus()
    }
    setReplyCommentId(data)
  }

  const matchScores = (index: number): string => {
    let home = 0
    let away = 0
    const scores: string[] = []

    data.match.events.map((event: any) => {
      if (event.type === 'Goal') {
        if (event.team.id === data.match.teams.home.id) {
          home++
        } else {
          away++
        }
      }

      scores.push(`${home}-${away}`)
    })

    return scores[index]
  }

  const fetchComment = useCallback(async () => {
    try {
      if (!data.match?.api_id) return
      const cmt = await getCommentList(data.match?.api_id)
      setCommentList(cmt)
    } catch (error) {
      console.log(error)
    }
  }, [data.match?.api_id])

  useEffect(() => {
    fetchComment()
  }, [fetchComment])

  return (
    <div>
      {data.match && data.match !== undefined && (
        <>
          <div className="p-2.5 bg-[#edf2f7] my-2 text-center mb-5">
            <Link className="font-bold text-[#009246] inline-flex text-xl" href={ROUTES.TOURNAMENT_RESULTS.replace(':id', data.match.league_slug)}>
              <img className="w-6 mr-2" src={data.match.league?.logo} alt={data.match.league?.name} style={{ objectFit: 'cover' }} />
              <p className="text-primary hover:text-red">
                {t('result')} {data.match.league?.name}
              </p>
            </Link>
            <p className="text-[#656565]">{data.match.date_string}</p>
            <p className="text-[#ce2b37] text-2xl font-bold">{data.match.time_string}</p>
          </div>
          <div className="grid grid-flow-col gap-4 text-center mb-3">
            <div className="col-auto">
              <img className="m-auto w-[150px] h-[150px]" src={data.match.teams.home.logo} alt={data.match.teams.home.name} style={{ objectFit: 'contain' }} />
              {data.match.team_home_slug && data.match.team_home_type == 0 && (
                <Link className="m-3 mb-0 hover:text-red text-[#009246] font-bold" href={ROUTES.CLUB_PAGE.replace(':id', data.match.team_home_slug)}>
                  {data.match.teams.home.name}
                </Link>
              )}
              {data.match.team_home_slug && data.match.team_home_type == 1 && (
                <Link className="m-3 mb-0 hover:text-red text-[#009246] font-bold" href={ROUTES.NATIONAL_TEAM.replace(':id', data.match.team_home_slug)}>
                  {data.match.teams.home.name}
                </Link>
              )}
              {data.match.goals?.home !== null && <div className="text-center text-[#ce2b37] text-2xl font-bold">{data.match.goals?.home}</div>}
            </div>
            <div className="col-auto *:mb-5">
              {data.match.status.short === '1H' || data.match.status.short === '2H' ? (
                <div className="flex justify-center">
                  <img className="mr-2 w-[8px] h-[8px] relative top-[12px]" src="https://static.demo.kqbd.ai/flash_new.gif" alt="Live icon" />
                  <p className="text-[#ce2b37] text-2xl font-bold">{data.match.status.elapsed}</p>
                </div>
              ) : (
                <p className="text-[#ce2b37] text-2xl font-bold">{ts(data.match.status.long)}</p>
              )}
              <div>
                <p className="mb-2">
                  <b>
                    {t('round')}: {data.match.league.round}
                  </b>
                </p>
                <p>
                  <b>
                    {t('season')}: {data.match.league.season}
                  </b>
                </p>
              </div>
            </div>
            <div className="col-auto">
              <img className="m-auto w-[150px] h-[150px]" src={data.match.teams.away.logo} alt={data.match.teams.away.name} style={{ objectFit: 'contain' }} />
              {data.match.team_away_slug && data.match.team_away_type == 0 && (
                <Link className="m-3 mb-0 hover:text-red text-[#009246] font-bold" href={ROUTES.CLUB_PAGE.replace(':id', data.match.team_away_slug)}>
                  {data.match.teams.away.name}
                </Link>
              )}
              {data.match.team_away_slug && data.match.team_away_type == 1 && (
                <Link className="m-3 mb-0 hover:text-red text-[#009246] font-bold" href={ROUTES.NATIONAL_TEAM.replace(':id', data.match.team_away_slug)}>
                  {data.match.teams.away.name}
                </Link>
              )}
              {data.match.goals?.away !== null && <div className="text-center text-[#ce2b37] text-2xl font-bold">{data.match.goals?.away}</div>}
            </div>
          </div>
          {data.match.betting_odd && <BettingOddTable bettingOdd={data.match.betting_odd} />}
          <div className="*:border-t *:border-[#e5e5e5] *:text-[#009246] *:font-bold *:p-2 mt-5">
            <div>
              <Link href="/"> {t('today')} </Link>
            </div>
            <div>
              <Link href="/"> {t('yesterday')} </Link>
            </div>
          </div>
          <div className="bg-[#edf2f7] text-center p-3 mb-3 text-[#656565] font-bold border-b border-t border-[#e5e5e5] text-sm">
            {t('info')} {data.match.teams.home.name} vs {data.match.teams.away.name}
          </div>
          <div className="">
            <span className="font-bold pl-3"> {t('stadium')} </span> {data.match.venue.name}, {data.match.venue.city}
          </div>
          <div className="">
            <span className="font-bold pl-3"> {t('temp')} </span> -
          </div>
          {data.match.score?.halftime?.home !== null && (
            <div className="bg-[#edf2f7] text-center p-3 mt-3 mb-5 text-[#656565] font-bold border-b border-t border-[#e5e5e5] text-sm">
              {t('firstHalfScore')} {data.match.score?.halftime.home} - {data.match.score?.halftime.away}
            </div>
          )}

          {!isEmpty(data.match.events) && (
            <>
              <div className="bg-[#edf2f7] text-left p-3 mt-3 text-[#656565] font-bold border-b border-t border-[#e5e5e5]">
                {data.match.teams.home.name} vs {data.match.teams.away.name}: {t('event')}
              </div>
              {data.match.events.map((event: any, index: number) => {
                return <MatchEvent key={index} event={event} teams={data.match.teams} score={matchScores(index)} />
              })}
            </>
          )}
          {!isEmpty(data.match.lineups) && (
            <LineUp
              lineups={data.match.lineups}
              teams={data.match.teams}
              homeFormationGrid={data.match.home_formation_grid}
              awayFormationGrid={data.match.away_formation_grid}
            />
          )}
          {!isEmpty(data.match.statistics) && (
            <>
              <div className="bg-[#edf2f7] text-center p-3 mt-3 text-[#656565] font-bold border-b border-t border-[#e5e5e5] text-sm">
                {data.match.teams.home.name} vs {data.match.teams.away.name}: {t('statistics')}
              </div>
              <div className="bg-[#edf2f7] grid grid-flow-col *:col-auto gap-4 text-center p-2 text-[#656565] font-bold border-b border-[#e5e5e5] text-sm">
                <div>{data.match.teams.home.name}</div>
                <div>{data.match.teams.away.name}</div>
              </div>
              <Statistics statistics={data.match.statistics} teams={data.match.teams} />
            </>
          )}
        </>
      )}
      <div className="comment">
        {/*<p className="py-1 px-2.5 bg-[#f9f9f9] mb-2.5 border border-[#eee] font-bold text-primary mt-2">{u('title')}</p>*/}
        {user && (
          <CommentForm parentId={replyCommentId} setReplyComment={setReplyComment} ref={commentRef} apiId={data.match.api_id} fetchComment={fetchComment} />
        )}

        {commentList.map((cmt, index) => (
          <div key={index}>
            <CommentItem cmt={cmt} setReplyComment={setReplyComment} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default MatchDetail
