import { getCountries } from '@/resources/api-constants'
import { useAppDispatch } from '@/store/reducers/store'
import { loadingAction } from '@/store/slice/loading.slice'
import { ICountry } from '@/types/app-type'
import { ChevronDownOutline, ChevronUpOutline } from '@carbon/icons-react'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const Standings = () => {
  const t = useTranslations('FifaRanking')
  const [countries, setCountries] = useState<[] | ICountry[]>([])
  const dispatch = useAppDispatch()
  const [currentCountry, setCurrentCountry] = useState<ICountry>()
  const params = useParams<{ slug: string }>()
  const fetchData = async () => {
    dispatch(loadingAction.show())
    if (!params?.slug) return
    try {
      const result = await getCountries({ perPage: 300 })

      const currentCountrySlug = params?.slug.replace('-football', '')
      const sortedCountries = result.data.filter((country) => country.rank).sort((a, b) => Number(a.rank) - Number(b.rank))
      const deepCopy = [...sortedCountries]
      const currentCountry = deepCopy.filter((country) => String(country.slug) === String(currentCountrySlug))[0]

      setCurrentCountry(currentCountry)
      setCountries(sortedCountries)
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(loadingAction.hide())
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
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
          {currentCountry && (
            <tr className="text-sm [&>td]:p-2 [&>td]:w-[80px] sm:[&>td]:w-auto border-b-2 border-[#000] flex flex-col sm:table-row">
              <td>{countries.findIndex((country) => country.slug === currentCountry.slug)}</td>
              <td className="text-center sm:text-left overflow-hidden whitespace-nowrap">{currentCountry.name_vi ?? currentCountry.name}</td>
              <td>{countries.findIndex((country) => country.slug === currentCountry.slug)}</td>
              <td>{Math.floor(Number(currentCountry.points))}</td>
              <td>{Math.floor(Number(currentCountry.previous_points))}</td>
              <td>
                {Math.floor(Number(currentCountry.points) - Number(currentCountry.previous_points))}
                {Number(currentCountry.previous_points) - Number(currentCountry.points) !== 0 ? (
                  Number(currentCountry.previous_points) - Number(currentCountry.points) > 0 ? (
                    <ChevronDownOutline className="ml-1 text-red inline-block" />
                  ) : (
                    <ChevronUpOutline className="ml-1 text-primary inline-block" />
                  )
                ) : (
                  ''
                )}
              </td>
              <td>
                {Math.floor(Number(currentCountry.rank) - Number(currentCountry.previous_rank))}
                {Number(currentCountry.previous_rank) - Number(currentCountry.rank) !== 0 ? (
                  Number(currentCountry.previous_rank) - Number(currentCountry.rank) > 0 ? (
                    <ChevronDownOutline className="ml-1 text-red inline-block" />
                  ) : (
                    <ChevronUpOutline className="ml-1 text-primary inline-block" />
                  )
                ) : (
                  ''
                )}
              </td>
              <td className="text-center sm:text-right">{currentCountry.region_vi ?? currentCountry.region}</td>
            </tr>
          )}
          {countries.length > 0 &&
            countries.map((country, index) => {
              return (
                <tr key={index} className="text-sm [&>td]:p-2 [&>td]:w-[80px] sm:[&>td]:w-auto border-b border-[#eee] flex flex-col sm:table-row">
                  <td>{index}</td>
                  <td className="text-center sm:text-left overflow-hidden whitespace-nowrap">{country.name_vi ?? country.name}</td>
                  <td>{index}</td>
                  <td>{Math.floor(Number(country.points))}</td>
                  <td>{Math.floor(Number(country.previous_points))}</td>
                  <td>
                    {Math.floor(Number(country.points) - Number(country.previous_points))}
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
                    {Math.floor(Number(country.rank) - Number(country.previous_rank))}
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
  )
}

export default Standings
