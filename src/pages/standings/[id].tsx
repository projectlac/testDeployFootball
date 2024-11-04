import api from '@/api/api_instance'
import { getLeagues, getMenus, getMetaData, getPopularLeagues, getStanding } from '@/resources/api-constants'
import { ILeague, IServerProps, ITeamStanding } from '@/types/app-type'
import { renderPrefixLang } from '@/utility/stringToSlug'
import { GetServerSidePropsContext } from 'next'
import dynamic from 'next/dynamic'

interface IDataFootball {
  popularLeagues: ILeague[]
  leagues: ILeague[]
  standing: ITeamStanding[]
  currentLeague: string
  currentYear: number
}

const Standings = dynamic(() => import('@/components/Page/Standings'))

const StandingsPageDetail = ({ data, metadata, menu }: IServerProps<IDataFootball>) => {
  return <Standings data={data} menu={menu} metadata={metadata}></Standings>
}

export default StandingsPageDetail

export async function getServerSideProps(context: GetServerSidePropsContext) {
  api.defaults.headers.common['lang'] = context.locale
  const metadata = await getMetaData({
    type: 'standings',
    slug: context.params?.id as string,
    url: `${renderPrefixLang(context.locale ?? '')}standings/${context.params?.id}`
  })
  const menu = await getMenus(context.locale ?? 'en')

  //pre-render data

  try {
    const popularLeagues = await getPopularLeagues(context.locale)
    const currentLeague = popularLeagues[0].slug
    const currentYear = popularLeagues[0].current_season

    const leagues = await getLeagues({ page: 1 })

    const standing = await getStanding({ slug: currentLeague, season: currentYear })
    return { props: { data: { popularLeagues, leagues: leagues.data, standing, currentLeague, currentYear }, metadata: metadata.data, menu } }
  } catch (error) {
    return { props: { data: {}, metadata: metadata.data, menu } }
  }
}
