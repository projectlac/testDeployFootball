import api from '@/api/api_instance'
import StandingsPage from '@/components/NationalOrLeague/components/Standings'
import NationalOrTournament from '@/components/NationalOrLeague/NationalOrLeague'
import NoData from '@/components/NoData/NoData'
import Default from '@/layouts/Default'
import { getHighestLeagueStanding, getLeagues, getMenus, getMetaData, getStanding } from '@/resources/api-constants'
import { IHighestLeagueStanding, ILeague, IServerProps, ITeamStanding } from '@/types/app-type'
import { renderPrefixLang } from '@/utility/stringToSlug'
import { isEmpty, isUndefined } from 'lodash'
import { GetStaticPropsContext } from 'next'

interface IDataFootball {
  highest: IHighestLeagueStanding
  league: ILeague[]
  standing: ITeamStanding[]
}

const Standings = ({ data, metadata, menu }: IServerProps<IDataFootball>) => {
  return (
    <div>
      {isUndefined(data) ? (
        <Default menu={menu} metadata={metadata}>
          <NationalOrTournament metadata={metadata}>{isEmpty(data) ? 'Loading...' : 'Loading...'}</NationalOrTournament>
        </Default>
      ) : (
        <>
          {isEmpty(data) ? (
            <Default menu={menu} metadata={metadata}>
              <NationalOrTournament metadata={metadata}>
                <NoData />
              </NationalOrTournament>
            </Default>
          ) : (
            <StandingsPage menu={menu} data={data} metadata={metadata}></StandingsPage>
          )}
        </>
      )}
    </div>
  )
}

export default Standings

export async function getServerSideProps(context: GetStaticPropsContext) {
  api.defaults.headers.common['lang'] = context.locale
  const params = context.params
  const slugRaw: string = (params?.slug as string) ?? ''

  const slug = slugRaw.replace('-football', '')
  const type = slugRaw?.includes('-football') ? 'country' : 'league'

  const [metadata, menu] = await Promise.all([
    getMetaData({
      type: type,
      slug: slug,
      url: `${renderPrefixLang(context.locale ?? '')}${slugRaw}/standings`
    }),
    getMenus(context.locale ?? 'en')
  ])
  //pre-render data
  const currentYear = new Date().getFullYear()

  try {
    if (!slug) {
      return
    }

    const resultStanding = !slugRaw?.includes('-football') ? await getStanding({ slug: slug, season: currentYear }) : []

    const teamSlug = slugRaw?.includes('-football') ? slugRaw.replace('-football', '') : slugRaw
    const result = slugRaw?.includes('-football')
      ? await getHighestLeagueStanding({
          team_slug: teamSlug,
          season: currentYear
        })
      : null

    const resultLeague = slugRaw?.includes('-football')
      ? await getLeagues({
          countrySlug: teamSlug.includes('-football') ? teamSlug.replace('-football', '') : teamSlug,
          countryStandingPage: 1,
          page: 1
        })
      : { data: null }

    return { props: { data: { standing: resultStanding, highest: result, league: resultLeague.data }, metadata: metadata.data, menu } }
  } catch (error) {
    return {
      redirect: {
        permanent: false, // or true
        destination: '/not-found'
      }
    }
  }
}
