import { ROUTES } from '@/resources/routes-constants'
import { IMatch } from '@/types/app-type'
import { Screen } from '@carbon/icons-react'
import { format } from 'date-fns'
import dayjs from 'dayjs'
import { isNull } from 'lodash'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { FC, memo } from 'react'

interface MatchProps {
  match: IMatch
}

const Match: FC<MatchProps> = ({ match }) => {
  const t = useTranslations('MatchDetail')
  const s = useTranslations('MatchDetail.status')
  console.log(dayjs().diff(dayjs(match.date), 'day'))
  return (
    <>
      <div className="flex items-center text-sm py-1.5 border-b border-[#eee] last-of-type:border-b-0 flex-wrap justify-between">
        <div className="w-[140px] hidden sm:block">
          {(match.status.short === 'NS' || match.status.long === 'Match Finished') && (
            <span className="text-primary">
              {dayjs().diff(dayjs(match.date), 'day')
                ? format(new Date(match.date), 'dd/MM/yyyy HH:mm')
                : format(new Date(match.date), 'HH:mm')}
            </span>
          )}
          {match.status.elapsed && match.status.long !== 'Match Finished' && (
            <span className="text-red">
              {match.status.elapsed}
              {'′'}
            </span>
          )}
          {match.status.long === 'Match Cancelled' && s(match.status.long)}
        </div>

        <div className="w-[40px] sm:hidden">
          {(match.status.short === 'NS' || match.status.long === 'Match Finished') && (
            <span className="text-primary">{format(new Date(match.date), 'HH:mm')}</span>
          )}
          {match.status.elapsed && match.status.long !== 'Match Finished' && (
            <span className="text-red">
              {match.status.elapsed}
              {'′'}
            </span>
          )}
          {match.status.long === 'Match Cancelled' && s(match.status.long)}
        </div>
        <div className="w-[130px]  sm:w-[23%] flex justify-end items-center gap-1">
          {/* <Image className="w-5 hidden md:block" src={match.teams.home.logo} alt="" width={20} height={20} /> */}
          <span className={match.teams.home.winner ? 'font-bold' : 'font-normal'}>{match.teams.home.name}</span>
        </div>
        <div className="w-[40px] text-center mx-2 ">
          <Link
            className="text-white hover:text-secondary text-sm font-bold"
            href={ROUTES.MATCH_DETAIL.replace(':id', match.slug).replace(':date', match.date_slug)}
          >
            <p className="bg-primary rounded py-0.5 cursor-pointer">
              <span>{match.goals.home}</span>
              {isNull(match.goals.home) || isNull(match.goals.away) ? <span>VS</span> : <span>-</span>}
              <span>{match.goals.away}</span>
            </p>
          </Link>
        </div>
        <div className="w-[130px] sm:w-[23%] justify-start flex items-center gap-1">
          {/* <Image className="w-5 hidden md:block" src={match.teams.away.logo} alt="" width={20} height={20} /> */}
          <span className={match.teams.away.winner ? 'font-bold' : 'font-normal'}>{match.teams.away.name}</span>
        </div>
        <div className="w-0 sm:w-[40px] text-right sm:text-center mt-1 sm:mt-0">
          {match.score.halftime.away !== null && (
            <p className="bg-primary rounded py-0.5 cursor-pointer">
              <span className="text-white hover:text-secondary text-sm font-bold">
                <span>{match.score.halftime.away}</span>
                {isNull(match.score.halftime.away) && isNull(match.score.halftime.home) ? <span>VS</span> : <span>-</span>}
                <span>{match.score.halftime.home}</span>
              </span>
            </p>
          )}
        </div>
        <div className="md:flex-1 items-center mt-1 sm:mt-0 hidden md:flex">
          <div className="px-1 py-1 bg-primary rounded mx-2">
            <Link href={ROUTES.MATCH_DETAIL.replace(':id', match.slug).replace(':date', match.date_slug)}>
              <Screen color="#fff" />
            </Link>
          </div>
          <div>
            <span> {match.league.round} </span>
          </div>
        </div>
      </div>
      {match.score.extratime.home !== null && (
        <div>
          <p className="text-center text-red text-sm leading-5 bg-[#edf2f7]">
            {+match.status.elapsed === 120 && t('min')}[{match.score.extratime.away} - {match.score.extratime.home}]
            {match.score.extratime.home !== null && (
              <>
                {' '}
                Penalty [{match.score.penalty.away} - {match.score.penalty.home}]
              </>
            )}
          </p>
        </div>
      )}
    </>
  )
}

export default memo(Match)
