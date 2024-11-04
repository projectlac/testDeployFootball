import { ROUTES } from '@/resources/routes-constants'
import { IMatch } from '@/types/app-type'
import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import { FC, memo } from 'react'
interface MatchProps {
  match: IMatch
}

const PredictionMatch: FC<MatchProps> = ({ match }) => {
  return (
    <>
      <div className="flex items-center text-sm py-1.5 border-b border-[#e5e5e5] last-of-type:border-b-0 flex-wrap">
        <div className="w-[15%] text-left color-[#333]">
          <span>{format(new Date(match.date), 'HH:mm')}</span>
        </div>
        <div className="w-[35%] text-left flex justify-end items-center">
          <Image className="w-5 mr-2 h-[auto]" src={match.teams.home.logo} alt="" width={20} height={20} />
          <span>{match.teams.home.name}</span>
        </div>
        <div className="w-[40px] text-center mx-2">
          <Link
            className="text-primary hover:text-red text-sm font-bold"
            href={ROUTES.MATCH_DETAIL.replace(':id', match.slug).replace(':date', match.date_slug)}
          >
            <p className="bg-primary rounded py-0.5 text-white">
              <span>{match.goals.home}</span>
              <span>-</span>
              <span>{match.goals.away}</span>
            </p>
          </Link>
        </div>

        <div className="w-[35%] text-right flex justify-start items-center">
          <Image className="w-5 mr-2" src={match.teams.away.logo} alt="" width={20} height={20} />
          <span>{match.teams.away.name}</span>
        </div>
      </div>
      <div className="bg-[#edf2f7] text-center p-2 text-[#656565] font-bold text-sm/[11px] text-red border-b border-[#e5e5e5] row">
        {match.predictions.join(', ')}
      </div>
    </>
  )
}

export default memo(PredictionMatch)
