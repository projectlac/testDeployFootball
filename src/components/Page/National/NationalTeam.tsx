import { useAppDispatch } from '@/store/reducers/store'
import { fetchMetaData } from '@/store/slice/metadata.slice'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import BettingOddsPage from './components/BettingOdds'
import Fixtures from './components/Fixtures'
import IndexPage from './components/index'
import LiveScore from './components/LiveScore'
import Result from './components/Result'
import Standings from './components/Standings'
import TopScores from './components/TopScorers'
import { useLocale, useTranslations } from 'next-intl'
import PredictionsPage from './components/PredictionsPage'
import api from '@/api/api_instance'

const NationalTeamPage = () => {
  const t = useTranslations('NationalOrLeague')
  const dispatch = useAppDispatch()
  const params = useParams<{ slug: string }>()
  const [page, setPage] = useState<string | null>('index')
  const pathname = usePathname()
  const router = useRouter()
  const lang = useLocale()

  const fetchMeta = async () => {
    api.defaults.headers.common['lang'] = lang
    try {
      const slug = (params?.slug ?? '').replace('-football', '')
      const type = 'national'

      dispatch(fetchMetaData({ slug, url: pathname, type }))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchMeta()
  }, [params?.slug])

  const handleSwitchTab = (param: string) => {
    const searchParams: Record<string, any> = new URLSearchParams(window.location.search)
    if (searchParams.has('results')) searchParams.delete('results')
    if (searchParams.has('livescore')) searchParams.delete('livescore')
    if (searchParams.has('standings')) searchParams.delete('standings')
    if (searchParams.has('top-scores')) searchParams.delete('top-scores')
    if (searchParams.has('fixtures')) searchParams.delete('fixtures')
    if (searchParams.has('index')) searchParams.delete('index')
    if (searchParams.has('betting-odds')) searchParams.delete('betting-odds')
    if (searchParams.has('predictions')) searchParams.delete('predictions')

    setPage(param)
    searchParams.set(param, '')

    router.push(`/${params?.slug}/national-team?${searchParams.toString().replace(/=(?=&|$)/gm, '')}`)
  }

  useEffect(() => {
    const searchParams: Record<string, any> = new URLSearchParams(window.location.search)
    setPage(searchParams.keys().next().value)
  }, [])

  const tabs = [
    {
      label: t('info'),
      url: ''
    },
    {
      label: t('result'),
      url: 'results'
    },
    {
      label: t('live'),
      url: 'livescore'
    },
    {
      label: t('rankingTable'),
      url: 'standings'
    },
    {
      label: t('topScorer'),
      url: 'top-scores'
    },
    {
      label: t('schedule'),
      url: 'fixtures'
    },
    {
      label: t('odds'),
      url: 'betting-odds'
    },
    {
      label: t('predictions'),
      url: 'predictions'
    }
  ]

  return (
    <div>
      <div className="border-b-2 border-secondary mt-2">
        <ul className="text-nowrap whitespace-nowrap overflow-x-auto flex">
          {tabs.map((tab, index) => {
            return (
              <li key={index}>
                <span
                  onClick={() => handleSwitchTab(tab.url)}
                  className={
                    tab.url === page
                      ? 'px-2.5 py-2 text-sm cursor-pointer bg-secondary text-primary hover:text-red mr-1.5 inline-block'
                      : 'px-2.5 py-2 text-sm cursor-pointer bg-[#f0f0f0] text-primary hover:text-red mr-1.5 inline-block'
                  }
                >
                  {tab.label}
                </span>
              </li>
            )
          })}
        </ul>
      </div>

      {page === '' && <IndexPage />}
      {!page && <IndexPage />}
      {page === 'results' && <Result />}
      {page === 'standings' && <Standings />}
      {page === 'top-scores' && <TopScores />}
      {page === 'fixtures' && <Fixtures />}
      {page === 'livescore' && <LiveScore />}
      {page === 'betting-odds' && <BettingOddsPage />}
      {page === 'predictions' && <PredictionsPage />}
    </div>
  )
}

export default NationalTeamPage
