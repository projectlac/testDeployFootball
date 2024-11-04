import { ROUTES } from '@/resources/routes-constants'
import { IStaticProps, ITeamDetail } from '@/types/app-type'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import IndexPage from './components/index'
import { useTranslations } from 'next-intl'

interface IDataFootball {
  teamDetail: ITeamDetail
}

const ClubPage = ({ data }: IStaticProps<IDataFootball>) => {
  const t = useTranslations('NationalOrLeague')
  const u = useTranslations('Club')
  const pathname = usePathname()
  const params = useParams<{ slug: string }>()

  const tabs = [
    {
      label: t('info'),
      url: ROUTES.CLUB_PAGE.replace(':id', String(params?.slug))
    },
    {
      label: t('result'),
      url: ROUTES.TOURNAMENT_RESULTS.replace(':id', String(params?.slug))
    },
    {
      label: t('live'),
      url: ROUTES.TOURNAMENT_LIVESCORES.replace(':id', String(params?.slug))
    },
    {
      label: t('rankingTable'),
      url: ROUTES.TOURNAMENT_STANDINGS.replace(':id', String(params?.slug))
    },
    {
      label: t('topScorer'),
      url: ROUTES.TOURNAMENT_TOP_SCORES.replace(':id', String(params?.slug))
    },
    {
      label: t('schedule'),
      url: ROUTES.TOURNAMENT_FIXTURES.replace(':id', String(params?.slug))
    },
    {
      label: t('odds'),
      url: ROUTES.NATIONAL_BETTING_ODDS.replace(':id', String(params?.slug))
    },
    {
      label: t('predictions'),
      url: ROUTES.NATIONAL_PREDICTIONS.replace(':id', String(params?.slug))
    }
  ]
  return (
    <div>
      <h1 className="py-1 px-2.5 bg-[#f9f9f9] mb-2.5 border border-[#eee] font-bold text-secondary">
        {u('soccer')} {data.teamDetail?.name}
      </h1>
      <div className="border-b-2 border-secondary mt-2">
        <ul className="text-nowrap whitespace-nowrap overflow-x-auto flex">
          {tabs.map((tab, index) => {
            return (
              <li key={index}>
                <Link
                  href={tab.url}
                  key={index}
                  className={
                    tab.url === pathname
                      ? 'px-2.5 py-2 text-sm cursor-pointer bg-secondary text-primary hover:text-red mr-1.5 inline-block'
                      : 'px-2.5 py-2 text-sm cursor-pointer bg-[#f0f0f0] text-primary hover:text-red mr-1.5 inline-block'
                  }
                >
                  {tab.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
      <IndexPage data={data} />
    </div>
  )
}

export default ClubPage
