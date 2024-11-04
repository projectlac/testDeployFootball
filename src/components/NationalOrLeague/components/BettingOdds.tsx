import BettingMatch from '@/components/BettingOdd/BettingMatch'
import NationalOrTournament from '@/components/NationalOrLeague/NationalOrLeague'
import Default from '@/layouts/Default'
import { getBettingOddByLeague } from '@/resources/api-constants'
import { useAppDispatch } from '@/store/reducers/store'
import { loadingAction } from '@/store/slice/loading.slice'
import { IBettingOdd, IBookmaker, IServerProps } from '@/types/app-type'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface IDataFootball {
  bookmakers: IBookmaker[]
  bettingOdds: IBettingOdd[]
  bookmakersId: number
}

const BettingOddsPage = ({ data, metadata, menu }: IServerProps<IDataFootball>) => {
  const [bettingOdds, setBettingOdds] = useState<IBettingOdd[]>()
  const [bookmakers, setBookmakers] = useState<IBookmaker[]>([])
  const [bookmakerId, setBookmakerId] = useState<number>()

  const dispatch = useAppDispatch()
  const params = useParams<{ slug: string }>()

  useEffect(() => {
    if (bookmakerId) {
      fetBettingOdds()
    }
  }, [bookmakerId])

  useEffect(() => {
    setBettingOdds(data?.bettingOdds)
    setBookmakers(data?.bookmakers)
    setBookmakerId(data?.bookmakersId)
  }, [])

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

  return (
    <Default menu={menu} metadata={metadata}>
      <NationalOrTournament metadata={metadata}>
        {bookmakers! && (
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
      </NationalOrTournament>
    </Default>
  )
}

export default BettingOddsPage
