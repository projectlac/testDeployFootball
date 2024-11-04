import BettingMatch from '@/components/BettingOdd/BettingMatch'
import Default from '@/layouts/Default'
import { getBettingOdds, getBookmakers } from '@/resources/api-constants'
import { useAppDispatch } from '@/store/reducers/store'
import { loadingAction } from '@/store/slice/loading.slice'
import { IBettingOdd, IBookmaker, IServerProps } from '@/types/app-type'
import { getPrevDate, getPrevDateWithYear } from '@/utility/date'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

interface IDataFootball {
  bookmakers: IBookmaker[]
  bettingOdds: IBettingOdd[]
  bookmakersId: number
}

const BettingOddsComponent = ({ data, metadata, menu }: IServerProps<IDataFootball>) => {
  const [bettingOdds, setBettingOdds] = useState<IBettingOdd[]>(data?.bettingOdds)
  const numbers = Array.from({ length: 9 }, (_, i) => i)
  const [bookmakers, setBookmakers] = useState<IBookmaker[]>(data?.bookmakers)
  const [day, setDay] = useState(0)
  const [bookmakerId, setBookmakerId] = useState<number>(data?.bookmakersId)
  const t = useTranslations('Predictions')
  const dispatch = useAppDispatch()

  useEffect(() => {
    fetchBookmakers()
  }, [day])

  useEffect(() => {
    if (bookmakerId) {
      fetchFixtures()
    }
  }, [bookmakerId, day])

  const fetchFixtures = async () => {
    dispatch(loadingAction.show())
    try {
      const formattedDate = getPrevDateWithYear(day)
      const result = await getBettingOdds({ date: formattedDate, bookmaker_id: bookmakerId })
      setBettingOdds(result.data)
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(loadingAction.hide())
    }
  }

  const fetchBookmakers = async () => {
    dispatch(loadingAction.show())
    try {
      const result = await getBookmakers()

      if (result.data.length > 0) {
        setBookmakers(result.data)
        setBookmakerId(result.data[0]?.id)
      }
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(loadingAction.hide())
    }
  }

  return (
    <Default menu={menu} metadata={metadata}>
      <div className="flex items-center text-nowrap whitespace-nowrap overflow-x-auto pb-2.5">
        {numbers.map((number, index) => {
          return (
            <span key={number}>
              <span
                onClick={() => setDay(number)}
                className={
                  day === number
                    ? 'px-3 py-1 bg-secondary rounded text-primary  hover:cursor-pointer text-sm mr-2'
                    : 'px-3 py-1 bg-[#dce0e4] rounded text-primary hover:text-primary hover:bg-secondary hover:cursor-pointer text-sm mr-2'
                }
              >
                {index === 0 ? t('today') : index === 1 ? t('yesterday') : getPrevDate(number)}
              </span>
            </span>
          )
        })}
      </div>
      {bookmakers && (
        <div className="text-right mt-5">
          <select
            name="bookmaker_id"
            className="border-2 border-primary p-2 text-left w-[200px]"
            onChange={(e: any) => {
              setBookmakerId(e.target.value)
            }}
          >
            {Object.entries(data?.bookmakers).map((bookmaker: any) => {
              return (
                <option key={bookmaker[1].id} value={bookmaker[1].id}>
                  {bookmaker[1].name}
                </option>
              )
            })}
          </select>
        </div>
      )}

      {bettingOdds &&
        Object.entries(bettingOdds).map((item) => {
          return <BettingMatch key={item[0]} name={item[0]} bettingOdd={item[1]} />
        })}
    </Default>
  )
}

export default BettingOddsComponent
