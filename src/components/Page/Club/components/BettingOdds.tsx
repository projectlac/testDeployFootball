import BettingMatch from '@/components/BettingOdd/BettingMatch'
import { getBettingOddByLeague, getBookmakers } from '@/resources/api-constants'
import { useAppDispatch } from '@/store/reducers/store'
import { loadingAction } from '@/store/slice/loading.slice'
import { IBettingOdd, IBookmaker } from '@/types/app-type'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const BettingOdds: React.FC = () => {
  const [bettingOdds, setBettingOdds] = useState<IBettingOdd[]>([])
  const [bookmakers, setBookmakers] = useState<IBookmaker[]>([])
  const [bookmakerId, setBookmakerId] = useState<number>()
  const params = useParams<{ slug: string }>()
  const dispatch = useAppDispatch()

  useEffect(() => {
    fetchBookmakers()
  }, [params?.slug])

  useEffect(() => {
    if (bookmakerId) {
      fetBettingOdds()
    }
  }, [bookmakerId])

  const fetBettingOdds = async () => {
    dispatch(loadingAction.show())
    try {
      if (!params?.slug) {
        return
      }

      const result = await getBettingOddByLeague({ league: params?.slug, bookmaker_id: bookmakerId })
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
        setBookmakerId(result.data[0].id)
      }
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(loadingAction.hide())
    }
  }

  return (
    <>
      {bookmakers && (
        <div className="text-right mt-5">
          <select
            name="bookmaker_id"
            className="border-2 border-primary p-2 text-left w-[200px]"
            onChange={(e: any) => {
              setBookmakerId(e.target.value)
            }}
          >
            {Object.entries(bookmakers).map((bookmaker: any) => {
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
    </>
  )
}

export default BettingOdds
