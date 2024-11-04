import React, { memo } from 'react'
import { getReadableDate } from '@/utility/date'
import BettingAsianHandicap from './BettingAsianHandicap'
import BettingOverUnder from './BettingOverUnder'
import BettingMatchWinnter from './BettingMatchWinnter'
import { ROUTES } from '@/resources/routes-constants'
import { IBettingOdd } from '@/types/app-type'
import Link from 'next/link'
import Image from 'next/image'

interface TournamentProps {
  name: string
  bettingOdd: IBettingOdd
}

const BettingMatch = ({ name, bettingOdd }: TournamentProps) => {
  return (
    <>
      <div className="mt-4">
        <div className="pl-2.5 py-1.5 border-l-4 border-secondary bg-[#edf2f7] flex items-center justify-between">
          <div>
            {bettingOdd.country && (
              <span className="inline-flex gap-2 items-center">
                {bettingOdd.country.flag && <Image className="w-4" src={bettingOdd.country.flag ?? null} alt="" width={20} height={20} />}

                <Link className="text-primary hover:text-red text-sm font-bold" href={`/${bettingOdd.country.slug}`}>
                  {bettingOdd.country.name}
                </Link>
              </span>
            )}

            <span className='px-2'>»</span>
            <Link className="text-primary hover:text-red text-sm font-bold" href={ROUTES.TOURNAMENT_BETTING_ODDS.replace(':id', bettingOdd.slug)}>
              {name}
            </Link>
          </div>
          <div className="clear-both"></div>
        </div>
        {Object.entries(bettingOdd.matches).map((match) => (
          <div key={match[1].bet[0]?.id}>
            <div className="flex items-center text-sm py-1.5 border-b border-[#eee] last-of-type:border-b-0">
              <div className="w-[100px] text-red">{getReadableDate(match[1].date)}</div>
              <div className="w-[calc(100%-300px)]">
                <div className="w-1/4 py-2 flex justify-start gap-1">
                  <Image width={20} height={20} className="w-5" src={match[1].teams.home.logo} alt="" />
                  <span>{match[1].teams.home.name}</span>
                </div>
                <div className="w-1/4 flex justify-start gap-1">
                  <Image width={20} height={20} className="w-5" src={match[1].teams.away.logo} alt="" />
                  <span>{match[1].teams.away.name}</span>
                </div>
              </div>
              <BettingAsianHandicap bet={match[1].bet} />
              <BettingOverUnder bet={match[1].bet} />
              <BettingMatchWinnter bet={match[1].bet} />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default memo(BettingMatch)
