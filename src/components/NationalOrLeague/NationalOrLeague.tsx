'use client'
import { getTeamDetail } from '@/resources/api-constants'
import { ROUTES } from '@/resources/routes-constants'
import { useAppDispatch } from '@/store/reducers/store'
import { loadingAction } from '@/store/slice/loading.slice'
import { IMetadataModel, ITeamDetail } from '@/types/app-type'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'

const NationalOrTournament = ({ children }: { metadata?: IMetadataModel; children: React.ReactNode }) => {
  const t = useTranslations('NationalOrLeague')
  const pathname = usePathname()
  const dispatch = useAppDispatch()

  const params = useParams()

  const [teamDetail, setTeamDetail] = useState<ITeamDetail | null>(null)

  const fetchData = async () => {
    if (!params?.slug) return
    dispatch(loadingAction.show())
    try {
      const result = await getTeamDetail({ team_slug: params?.slug as string })
      if (result.status !== false) {
        setTeamDetail(result)
      }
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(loadingAction.hide())
    }
  }

  useEffect(() => {
    setTeamDetail(null)
    fetchData()
  }, [params?.slug])

  const tabs = useMemo(() => {
    return params?.slug?.includes('-football')
      ? [
          {
            label: t('result'),
            url: ROUTES.NATIONAL_TOURNAMENT.replace(':id', String(params?.slug))
          },
          {
            label: t('live'),
            url: ROUTES.NATIONAL_LIVESCORES.replace(':id', String(params?.slug))
          },
          {
            label: t('rankingTable'),
            url: ROUTES.NATIONAL_STANDINGS.replace(':id', String(params?.slug))
          },
          {
            label: t('topScorer'),
            url: ROUTES.NATIONAL_TOP_SCORES.replace(':id', String(params?.slug))
          },
          {
            label: t('schedule'),
            url: ROUTES.NATIONAL_FIXTURES.replace(':id', String(params?.slug))
          },
          {
            label: t('odds'),
            url: ROUTES.NATIONAL_BETTING_ODDS.replace(':id', String(params?.slug))
          },
          {
            label: t('tournament'),
            url: ROUTES.NATIONAL_TOURNAMENTS.replace(':id', String(params?.slug))
          },
          {
            label: t('predictions'),
            url: ROUTES.TOURNAMENT_PREDICTIONS.replace(':id', String(params?.slug))
          }
        ]
      : [
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
  }, [params?.slug])

  return (
    <>
      <div className="border-b-2 border-secondary mt-2">
        <ul className="text-nowrap whitespace-nowrap overflow-x-auto flex">
          {tabs.map((tab, index) => {
            if (!teamDetail && tab.label === t('info')) {
              return ''
            }
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
      {children}
    </>
  )
}

export default NationalOrTournament
