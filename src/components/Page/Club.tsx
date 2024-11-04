import { ROUTES } from '@/resources/routes-constants'
import { IListOfLeague, IStaticProps } from '@/types/app-type'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface IDataFootball {
  leagues: IListOfLeague
}

const Club = ({ data }: IStaticProps<IDataFootball>) => {
  const [leagues] = useState<IListOfLeague | null>(data.leagues)

  return (
    <div>
      {leagues &&
        Object.entries(leagues).map(([, v], index) => {
          return (
            <div key={index}>
              {v.teams.length > 0 && (
                <div className="mb-4">
                  <h2 className="font-bold text-primary pl-1.5 border-l-4 border-red flex items-center mb-2">
                    <Link href={ROUTES.NATIONAL_TEAM.replace(':id', String(v.country.slug))} className="flex">
                      {v.country.flag && <Image src={v.country.flag} alt={v.country.name} width={25} height={25} className="mr-2" />}

                      {v.country.name}
                    </Link>
                    <span className='px-2'>»</span>
                    <Link href={ROUTES.NATIONAL_TOURNAMENT.replace(':id', String(v.league.slug))}>{v.league.name}</Link>
                  </h2>
                  <ul className="columns-3">
                    {v.teams.map((team, teamIndex) => {
                      return (
                        <li className="text-sm text-primary" key={teamIndex}>
                          <Link className="inline-flex gap-1 px-2.5" href={ROUTES.CLUB_PAGE.replace(':id', String(team.slug))}>
                            <Image src={team.logo} alt={team.name ?? ''} width={25} height={25} className="mr-2" />
                            {team.name ?? ''}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}
            </div>
          )
        })}
    </div>
  )
}

export default Club
