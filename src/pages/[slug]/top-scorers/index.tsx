import api from '@/api/api_instance'
import NoData from '@/components/NoData/NoData'
import Default from '@/layouts/Default'
import { getHighestLeagueTopScores, getLeagues, getMenus, getMetaData, getTopScores } from '@/resources/api-constants'
import { ILeague, IServerProps, ITopScorePlayer, ITopScorePlayerClubResponse, ITopScorePlayerResponse } from '@/types/app-type'
import { renderPrefixLang } from '@/utility/stringToSlug'
import { isEmpty, isUndefined } from 'lodash'
import { GetServerSidePropsContext } from 'next'
import dynamic from 'next/dynamic'

interface IHighest {
  name: string
  season: string
  slug: string
  items: ITopScorePlayer[]
}
interface IDataFootball {
  highest: IHighest
  league: ILeague[]
  topScore: ITopScorePlayer[] | ITopScorePlayerResponse | ITopScorePlayerClubResponse | null
}

const TopScoresComponent = dynamic(() => import('@/components/Page/TopScore'))
const NationalOrTournament = dynamic(() => import('@/components/NationalOrLeague/NationalOrLeague'))

const TopScoresPage = ({ data, metadata, menu }: IServerProps<IDataFootball>) => {
  return (
    <div>
      {isUndefined(data) ? (
        <Default menu={menu} metadata={metadata}>
          <NationalOrTournament metadata={metadata}>{isEmpty(data) ? 'Nodata...' : 'Loading...'}</NationalOrTournament>
        </Default>
      ) : (
        <>
          <Default menu={menu} metadata={metadata}>
            <NationalOrTournament metadata={metadata}>
              {isEmpty(data) ? (
                <div>
                  <NoData />
                </div>
              ) : (
                <TopScoresComponent data={data} />
              )}
            </NationalOrTournament>
          </Default>
        </>
      )}
    </div>
  )
}

export default TopScoresPage

export async function getServerSideProps(context: GetServerSidePropsContext) {
  api.defaults.headers.common['lang'] = context.locale
  const params = context.params
  const slugRaw: string = (params?.slug as string) ?? ''

  const slug = slugRaw?.replace('-football', '')
  const type = slugRaw?.includes('-football') ? 'country' : 'league'
  const metadata = await getMetaData({
    type: type,
    slug: slug,
    url: `${renderPrefixLang(context.locale ?? '')}${slugRaw}/top-scorers`
  })
  const menu = await getMenus(context.locale ?? 'en')
  //pre-render data

  try {
    if (!slug) {
      return
    }
    const currentYear = new Date().getFullYear()

    const resultTopScore = !slugRaw?.includes('-football') ? await getTopScores({ slug: slug, season: currentYear }) : []

    const teamSlug = slugRaw?.includes('-football') ? slugRaw.replace('-football', '') : slugRaw

    const result = slugRaw?.includes('-football')
      ? await getHighestLeagueTopScores({
          country_slug: teamSlug,
          season: currentYear
        })
      : []

    const resultLeague = slugRaw?.includes('-football')
      ? await getLeagues({
          countrySlug: teamSlug?.includes('-football') ? teamSlug.replace('-football', '') : teamSlug,
          countryStandingPage: 1,
          page: 1
        })
      : { data: [] }

    return { props: { data: { topScore: resultTopScore, highest: result, league: resultLeague.data }, metadata: metadata.data, menu } }
  } catch (error) {
    return {
      redirect: {
        permanent: false, // or true
        destination: '/not-found'
      }
    }
  }
}
