'use client'
import api from '@/api/api_instance'
import Default from '@/layouts/Default'
import { getCountries, getMenus, getMetaData } from '@/resources/api-constants'
import { ICountry, IServerProps } from '@/types/app-type'
import { renderPrefixLang } from '@/utility/stringToSlug'
import { ChevronDownOutline, ChevronUpOutline } from '@carbon/icons-react'
import { GetServerSidePropsContext } from 'next'
import { useTranslations } from 'next-intl'

interface IDataFootball {
  countries: ICountry[] | []
}

const FIFAStandings = ({ data, metadata, menu }: IServerProps<IDataFootball>) => {
  const t = useTranslations('FifaRanking')
  return (
    <Default menu={menu} metadata={metadata}>
      <div>
        <table className="w-full text-center flex sm:table">
          <thead>
            <tr className="bg-[#edf2f7] text-sm [&>th]:p-2 flex flex-col items-start sm:table-row w-[108px] sm:w-auto">
              <th>{t('xhKV')}</th>
              <th className="text-left">{t('dtqg')}</th>
              <th>{t('xhFF')}</th>
              <th>{t('cunrrent')}</th>
              <th>{t('prev')}</th>
              <th>{t('point')}</th>
              <th>{t('xh')}</th>
              <th className="text-right">{t('kv')}</th>
            </tr>
          </thead>
          <tbody className="flex flex-row sm:table-row-group overflow-auto">
            {data.countries.length > 0 &&
              data.countries.map((country, index) => {
                return (
                  <tr key={index} className="text-sm [&>td]:p-2 [&>td]:w-[80px] sm:[&>td]:w-auto border-b border-[#eee] flex flex-col sm:table-row">
                    <td>{index}</td>
                    <td className="text-center sm:text-left overflow-hidden whitespace-nowrap">{country.name_vi ?? country.name}</td>
                    <td>{index}</td>
                    <td>{Math.floor(Number(country.points))}</td>
                    <td>{Math.floor(Number(country.previous_points))}</td>
                    <td>
                      {Math.floor(Number(country.previous_points) - Number(country.points))}
                      {Number(country.previous_points) - Number(country.points) !== 0 ? (
                        Number(country.previous_points) - Number(country.points) > 0 ? (
                          <ChevronDownOutline className="ml-1 text-red inline-block" />
                        ) : (
                          <ChevronUpOutline className="ml-1 text-primary inline-block" />
                        )
                      ) : (
                        ''
                      )}
                    </td>

                    <td>
                      {Math.floor(Number(country.previous_rank) - Number(country.rank))}
                      {Number(country.previous_rank) - Number(country.rank) !== 0 ? (
                        Number(country.previous_rank) - Number(country.rank) > 0 ? (
                          <ChevronDownOutline className="ml-1 text-red inline-block" />
                        ) : (
                          <ChevronUpOutline className="ml-1 text-primary inline-block" />
                        )
                      ) : (
                        ''
                      )}
                    </td>
                    <td className="text-center sm:text-right">{country.region_vi ?? country.region}</td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    </Default>
  )
}

export default FIFAStandings

export async function getServerSideProps(context: GetServerSidePropsContext) {
  api.defaults.headers.common['lang'] = context.locale
  const menu = await getMenus(context.locale ?? 'en')
  const params = context.params
  const slugRaw: string = (params?.slug as string) ?? ''

  const metadata = await getMetaData({ slug: slugRaw, url: `${renderPrefixLang(context.locale ?? '')}fifa-rankings`, type: 'fifa-rankings' })

  //pre-render data
  const countries = await getCountries({ perPage: 300 })
  const sortedCountries = countries.data.filter((country) => country.rank).sort((a, b) => Number(a.rank) - Number(b.rank))
  return { props: { data: { countries: sortedCountries }, metadata: metadata.data, menu } }
}
