import { ROUTES } from '@/resources/routes-constants'
import { IMatch } from '@/types/app-type'
import { GetStaticPropsContext } from 'next'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { FC, memo, useState } from 'react'
import Match from './Match'
import PredictionsMatch from './Prediction/PredictionMatch'

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
  const [isShow, setIsShow] = useState<boolean>(false)

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
              {league.name !== 'all'&&(<span className='px-2'>»</span>)}
              {league.name !== 'all' && (
                <Link
                  className="text-primary hover:text-red text-sm font-bold"
                  href={isShowPrediction ? ROUTES.TOURNAMENT_PREDICTIONS.replace(':id', league.slug) : ROUTES.NATIONAL_TOURNAMENT.replace(':id', league.slug)}
                >
                  {league.name}
                </Link>
              )}
            </span>
          )}
        </div>
        <div className="text-right relative">
          {league && (
            <div className="block md:hidden">
              <button
                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                type="button"
                onClick={() => {
                  setIsShow((prv) => !prv)
                }}
              >
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
                  <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                </svg>
              </button>

              {isShow && (
                <div
                  id={league.slug}
                  className="z-10  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 absolute top-[35pxmmk] right-0 "
                >
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
                    <li>
                      <Link
                        className="text-primary hover:text-red text-sm font-bold mr-2 "
                        href={
                          league.name === 'all'
                            ? ROUTES.NATIONAL_TEAM_STANDINGS.replace(':id', country?.slug ?? '')
                            : ROUTES.TOURNAMENT_STANDINGS.replace(':id', league.slug)
                        }
                      >
                        {t('ranking')}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="text-primary hover:text-red text-sm font-bold mr-2"
                        href={
                          league.name === 'all'
                            ? ROUTES.NATIONAL_TEAM_FIXTURES.replace(':id', country?.slug ?? '')
                            : ROUTES.TOURNAMENT_FIXTURES.replace(':id', league.slug)
                        }
                      >
                        {t('matchSchedule')}
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}

          {league && (
            <div className="hidden md:block">
              <Link
                className="text-primary hover:text-red text-sm font-bold mr-2 "
                href={
                  league.name === 'all'
                    ? ROUTES.NATIONAL_TEAM_STANDINGS.replace(':id', country?.slug ?? '')
                    : ROUTES.TOURNAMENT_STANDINGS.replace(':id', league.slug)
                }
              >
                {t('ranking')}
              </Link>
              <Link
                className="text-primary hover:text-red text-sm font-bold mr-2"
                href={
                  league.name === 'all'
                    ? ROUTES.NATIONAL_TEAM_FIXTURES.replace(':id', country?.slug ?? '')
                    : ROUTES.TOURNAMENT_FIXTURES.replace(':id', league.slug)
                }
              >
                {t('matchSchedule')}
              </Link>
            </div>
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
