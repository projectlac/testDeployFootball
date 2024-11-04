'use client'
import api from '@/api/api_instance'
import BettingMatch from '@/components/BettingOdd/BettingMatch'
import NationalOrTournament from '@/components/NationalOrLeague/NationalOrLeague'
import Default from '@/layouts/Default'
import { getBettingOddByLeague, getBookmakers, getMenus, getMetaData } from '@/resources/api-constants'
import { useAppDispatch } from '@/store/reducers/store'
import { loadingAction } from '@/store/slice/loading.slice'
import { IBettingOdd, IBookmaker, IServerProps } from '@/types/app-type'
import { renderPrefixLang } from '@/utility/stringToSlug'
import { GetServerSidePropsContext } from 'next'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface IDataFootball {
  bookmakers: IBookmaker[]
  bettingOdds: IBettingOdd[]
  bookmakersId: number
}

const TournamentBettingOdds = ({ data, metadata, menu }: IServerProps<IDataFootball>) => {
  const [bettingOdds, setBettingOdds] = useState<IBettingOdd[]>(data?.bettingOdds)

  const [bookmakerId, setBookmakerId] = useState<number>(data?.bookmakersId)

  const dispatch = useAppDispatch()
  const params = useParams<{ slug: string }>()

  useEffect(() => {
    if (bookmakerId) {
      fetBettingOdds()
    }
  }, [bookmakerId])

  useEffect(() => {
    setBettingOdds(data?.bettingOdds)
  }, [data?.bettingOdds])

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
        {data?.bookmakers && (
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
      </NationalOrTournament>
    </Default>
  )
}

export default TournamentBettingOdds

export async function getServerSideProps(context: GetServerSidePropsContext) {
  api.defaults.headers.common['lang'] = context.locale
  const params = context.params
  const slugRaw: string = (params?.slug as string) ?? ''

  const slug = slugRaw.replace('-football', '')
  const type = slugRaw?.includes('-football') ? 'country' : 'league'
  const [metadata, menu] = await Promise.all([
    getMetaData({
      type: type,
      slug: slug,
      url: `${renderPrefixLang(context.locale ?? '')}${slugRaw}/betting-odds`
    }),
    getMenus(context.locale ?? 'en')
  ])

  //pre-render data

  try {
    if (!slug) {
      return
    }
    const bookmakers = await getBookmakers()
    const bookmakersId = bookmakers.data[0].id
    const bettingOdds = await getBettingOddByLeague({ league: slugRaw, bookmaker_id: bookmakers.data[0].id })

    return { props: { data: { bookmakers: bookmakers.data, bettingOdds: bettingOdds.data, bookmakersId: bookmakersId }, metadata: metadata.data, menu } }
  } catch (error) {
    return {
      redirect: {
        permanent: false, // or true
        destination: '/not-found'
      }
    }
  }
}
