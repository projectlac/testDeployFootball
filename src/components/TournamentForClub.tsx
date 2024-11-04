import { ROUTES } from '@/resources/routes-constants'
import { IMatch } from '@/types/app-type'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { FC, memo } from 'react'
import Match from './Match'
import PredictionsMatch from './Prediction/PredictionMatch'
import { GetStaticPropsContext } from 'next'
interface TournamentProps {
  name: string
  matches: IMatch[]
  isShowPrediction?: boolean
  country?: {
    name: string
    flag: string
    slug: string
  }
  league?: {
    name: string
    flag: string
    slug: string
  }
}

const Tournament: FC<TournamentProps> = ({ matches, country, league, isShowPrediction }) => {
  const t = useTranslations('Tournament')
  return (
    <div className="mt-4">
      <div className="py-1.5 pl-1.5 border-l-4 border-secondary bg-[#edf2f7] flex items-center justify-between">
        <div className="flex items-center">
          {country && (
            <span className="inline-flex gap-2 items-center">
              {country.flag && <Image className="w-4" src={country.flag ?? null} alt="" width={20} height={20} />}

              <Link className="text-primary hover:text-red text-sm font-bold" href={`/${country.slug}`}>
                {country.name}
              </Link>
            </span>
          )}
          {league && league.slug !== null && (
            <span className="text-primary leading-4">
              <span className='px-2'>»</span>
              <Link className="text-primary hover:text-red text-sm font-bold" href={ROUTES.NATIONAL_TOURNAMENT.replace(':id', league.slug)}>
                {league.name}
              </Link>
            </span>
          )}
        </div>
        <div className="text-right">
          {league && (
            <>
              <Link className="text-primary hover:text-red text-sm font-bold mr-2" href={ROUTES.TOURNAMENT_STANDINGS.replace(':id', league.slug)}>
                {t('ranking')}
              </Link>
              <Link className="text-primary hover:text-red text-sm font-bold mr-2" href={ROUTES.TOURNAMENT_FIXTURES.replace(':id', league.slug)}>
                {t('matchSchedule')}
              </Link>
            </>
          )}
        </div>
      </div>
      {(matches ?? []).map((item, index) => {
        return isShowPrediction === true ? <PredictionsMatch key={index} match={item} /> : <Match key={index} match={item} />
      })}
    </div>
  )
}

export default memo(Tournament)

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      // You can get the messages from anywhere you like. The recommended
      // pattern is to put them in JSON files separated by locale and read
      // the desired one based on the `locale` received from Next.js.
      messages: (await import(`@/lang/${context.locale}.json`)).default
    }
  }
}
