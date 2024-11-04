import api from '@/api/api_instance'
import { getBettingOdds, getBookmakers, getMenus, getMetaData } from '@/resources/api-constants'
import { IBettingOdd, IBookmaker, IServerProps } from '@/types/app-type'
import { getPrevDateWithYear } from '@/utility/date'
import { renderPrefixLang } from '@/utility/stringToSlug'
import { GetServerSidePropsContext } from 'next'
import dynamic from 'next/dynamic'

interface IDataFootball {
  bookmakers: IBookmaker[]
  bettingOdds: IBettingOdd[]
  bookmakersId: number
}

const BettingOddsComponent = dynamic(() => import('@/components/Page/BettingOdds'))

const BettingOddsPage = ({ data, metadata, menu }: IServerProps<IDataFootball>) => {
  return <BettingOddsComponent data={data} menu={menu} metadata={metadata}></BettingOddsComponent>
}

export default BettingOddsPage

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const params = context.params
  const slugRaw: string = (params?.slug as string) ?? ''
  api.defaults.headers.common['lang'] = context.locale
  const menu = await getMenus(context.locale ?? 'en')
  const metadata = await getMetaData({ type: 'betting-odds', slug: slugRaw, url: `${renderPrefixLang(context.locale ?? '')}betting-odds` })

  console.log({ type: 'betting-odds', slug: slugRaw, url: `${renderPrefixLang(context.locale ?? '')}betting-odds` })

  //pre-render data

  try {
    const bookmakers = await getBookmakers()
    const bookmakersId = bookmakers.data[0].id
    const formattedDate = getPrevDateWithYear(0)
    const bettingOdds = await getBettingOdds({ date: formattedDate, bookmaker_id: bookmakersId })

    return { props: { data: { bookmakers: bookmakers.data, bettingOdds: bettingOdds.data, bookmakersId: bookmakersId }, metadata: metadata.data, menu } }
  } catch (error) {
    return { props: { data: {}, metadata: metadata.data, menu } }
  }
}
