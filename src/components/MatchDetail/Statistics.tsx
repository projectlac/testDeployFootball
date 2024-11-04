import { useTranslations } from 'next-intl'
import { memo } from 'react'
import React from 'react'
interface Props {
  statistics: any
  teams: any
}

const Statistics = ({ statistics, teams }: Props) => {
  const t = useTranslations('MatchDetail.static')
  return (
    <>
      {Object.keys(statistics).map((statistic: any) => (
        <div key={statistic}>
          <div className="w-100 flex border-b border-[#e5e5e5] *:text-center">
            <div className="w-[15%]">
              {statistics[statistic][teams.home.id]}
              {statistic === 'Ball Possession' || statistic === 'Passes %' ? '%' : ''}
            </div>
            <div className="w-[70%] font-bold text-sm">{t(statistic)}</div>
            <div className="w-[15%]">
              {statistics[statistic][teams.away.id]}
              {statistic === 'Ball Possession' || statistic === 'Passes %' ? '%' : ''}
            </div>
          </div>
          {statistics[statistic]['total'] && (
            <div className="w-[65%] m-auto flex border-b border-[#e5e5e5] *:text-center">
              <div className="w-[50%] flex justify-end ">
                <div
                  className="bg-[#0055A4] h-[60%]"
                  style={
                    statistics[statistic]['total']
                      ? { width: `${Math.round((statistics[statistic][teams.home.id] * 100) / statistics[statistic]['total'])}%` }
                      : {}
                  }
                >
                  &nbsp;
                </div>
              </div>
              <div className="w-[50%] flex justify-start">
                <div
                  className="bg-[#d42a2a] h-[60%]"
                  style={
                    statistics[statistic]['total']
                      ? { width: `${Math.round((statistics[statistic][teams.away.id] * 100) / statistics[statistic]['total'])}%` }
                      : {}
                  }
                >
                  &nbsp;
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  )
}

export default memo(Statistics)
