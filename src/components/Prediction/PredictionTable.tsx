import { ROUTES } from '@/resources/routes-constants'
import { IMatch, IMatchPredictData } from '@/types/app-type'
import dayjs from 'dayjs'
import Link from 'next/link'
import { FC, memo, useMemo } from 'react'
// interface MatchProps {
//   leagues: ILeagueMatches | null
// }

interface PredictionTableProps {
  items: IMatch[]
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

const PredictionTable: FC<PredictionTableProps> = (data: PredictionTableProps) => {
  const renderBetiball = useMemo(
    () => (data: IMatchPredictData) => {
      const first = data[1].slice(0, -1)
      const x = data['x'].slice(0, -1)
      const last = data[2].slice(0, -1)

      if (first === last) return 'x'
      if (first === x) return '1'
      if (last === x) return '2'
      if (first > last) return '1'
      return '2'
    },
    []
  )

  return (
    <div className=" w-full mt-2  overflow-x-auto">
      <table className="mb-2 w-full collapse-table">
        <thead className="bg-primary text-white">
          <tr className="[&>th]:p-2 [&>th:not(:first-child)]:text-center text-sm">
            <th className="md:w-[200px] min-w-[200px]">
              <Link href={`/${data.league?.slug}`}>
                {data.league?.name} ({data.items.length})
              </Link>
            </th>
            <th className="w-[50px] min-w-[50px]">1</th>
            <th className="w-[50px] min-w-[50px]">X</th>
            <th className="w-[50px] min-w-[50px]">2</th>
            <th>Betiball</th>
            <th>Correct score</th>
            <th>Avg. goals</th>
            <th>Goals</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((itemData, i) => (
            <tr className="text-sm [&>td]:p-2 border-b border-[#eee]  [&>td:not(:first-child)]:text-center" key={i}>
              <td>
                <div className="flex items-start">
                  <Link href={`/${data.league?.slug}`}>
                    <img src={itemData.league.logo} alt="" width={40} height={40} style={{ objectFit: 'contain' }} />
                  </Link>

                  <div className="pl-2">
                    <Link href={ROUTES.MATCH_DETAIL.replace(':id', itemData.slug).replace(':date', itemData.date_slug)}>
                      <p className="text-red font-bold">{itemData.teams.home.name}</p>
                      <b className="text-blue text-[10px]">VS</b>
                      <p className="text-red font-bold">{itemData.teams.away.name}</p>
                      <div className="text-sm text-[#7e7e7e]">
                        <span>{dayjs(itemData.date).format('DD/MM/YYYY HH:mm')}</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </td>
              <td className="text-center">
                <p className={`${renderBetiball(itemData.predict_data['1x2']) === '1' ? 'bg-primary text-secondary p-1 rounded-md font-bold' : ''}`}>
                  {itemData.predict_data['1x2'][1]}
                </p>
              </td>
              <td className="text-center">
                <p className={`${renderBetiball(itemData.predict_data['1x2']) === 'x' ? 'bg-primary text-secondary p-1 rounded-md font-bold' : ''}`}>
                  {itemData.predict_data['1x2']['x']}
                </p>
              </td>
              <td className="text-center">
                <p className={`${renderBetiball(itemData.predict_data['1x2']) === '2' ? 'bg-primary text-secondary p-1 rounded-md font-bold' : ''}`}>
                  {itemData.predict_data['1x2'][2]}
                </p>
              </td>
              <td className="text-red text-[15px] font-bold">{renderBetiball(itemData.predict_data['1x2'])}</td>
              <td className="w-[100px] text-center">
                <div className="font-bold text-sm ">
                  {itemData.predict_data.score?.home ? (
                    <p>
                      {itemData.predict_data.score?.home} - {itemData.predict_data.score?.away}
                    </p>
                  ) : (
                    'VS'
                  )}
                </div>
              </td>
              <td className="text-red">{itemData.predict_data.avg_goal}</td>
              <td>{itemData.predict_data.goal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default memo(PredictionTable)
