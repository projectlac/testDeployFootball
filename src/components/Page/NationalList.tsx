import { ROUTES } from '@/resources/routes-constants'
import { ICountryRegion, IStaticProps } from '@/types/app-type'
import { isUndefined } from 'lodash'
import Image from 'next/image'
import Link from 'next/link'

interface IDataFootball {
  regionList: ICountryRegion[]
}

const NationalList = ({ data }: IStaticProps<IDataFootball>) => {
  return (
    <div>
      {data.regionList &&
        data.regionList.map((region, index) => {
          return (
            <div key={index}>
              <h2 className="border-l-4 border-red pl-1 font-bold text-primary my-2.5">{!isUndefined(region.name_vi) ? region.name_vi : region.name}</h2>
              <ul className="columns-3">
                {region.items.map((national, index) => {
                  return (
                    <li className="text-sm text-primary" key={index}>
                      <Link className="inline-flex gap-1 px-2.5" href={ROUTES.NATIONAL_TEAM.replace(':id', String(national.slug) + '-football')}>
                        <Image loading="lazy" className="w-4" src={national.flag} alt={national.name} width={20} height={20} />
                        {!isUndefined(national.name_vi) ? national.name_vi : national.name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
    </div>
  )
}

export default NationalList
