import api from '@/api/api_instance'
import NationalOrTournament from '@/components/NationalOrLeague/NationalOrLeague'
import NoData from '@/components/NoData/NoData'
import Default from '@/layouts/Default'
import { getFixturesByCountry, getFixturesByTeamOrLeague, getMenus, getMetaData } from '@/resources/api-constants'
import { ILeagueMatches, IServerProps } from '@/types/app-type'
import { renderPrefixLang } from '@/utility/stringToSlug'
import { isEmpty, isUndefined } from 'lodash'
import { GetStaticPropsContext } from 'next'
import dynamic from 'next/dynamic'
interface IDataFootball {
  teamOfLeague: ILeagueMatches | null
  country: ILeagueMatches | null
}

const FixturesPage = dynamic(() => import('@/components/NationalOrLeague/components/Fixtures'))

const FixturesIndex = ({ data, metadata, menu }: IServerProps<IDataFootball>) => {
  return (
    <div>
      {isUndefined(data) ? (
        <Default menu={menu} metadata={metadata}>
          <NationalOrTournament metadata={metadata}>{isEmpty(data) ? 'Loading...' : 'Loading...'}</NationalOrTournament>
        </Default>
      ) : (
        <>
          {isEmpty(data.teamOfLeague) && isEmpty(data.country) ? (
            <Default menu={menu} metadata={metadata}>
              <NationalOrTournament metadata={metadata}>
                <NoData />
              </NationalOrTournament>
            </Default>
          ) : (
            <FixturesPage menu={menu} data={data} metadata={metadata}></FixturesPage>
          )}
        </>
      )}
    </div>
  )
}

export default FixturesIndex

export async function getServerSideProps(context: GetStaticPropsContext) {
  const params = context.params
  const slugRaw: string = (params?.slug as string) ?? ''

  const slug = slugRaw.replace('-football', '')
  const type = slugRaw?.includes('-football') ? 'country' : 'league'
  const [metadata, menu] = await Promise.all([
    getMetaData({
      type: type,
      slug: slug,
      url: `${renderPrefixLang(context.locale ?? '')}${slugRaw}/fixtures`
    }),
    getMenus(context.locale ?? 'en')
  ])

  //pre-render data

  try {
    api.defaults.headers.common['lang'] = context.locale

    if (!slug) {
      return
    }

    const teamSlug = slugRaw?.includes('-football') ? slugRaw.replace('-football', '') : slugRaw
    const teamOfLeague = !slugRaw?.includes('-football')
      ? await getFixturesByTeamOrLeague({
          slug: slugRaw,
          status: 1,
          page: 1,
          perPage: 15
        })
      : { data: null }

    const country = slugRaw?.includes('-football') ? await getFixturesByCountry({ countrySlug: teamSlug, status: 1, page: 1, perPage: 15 }) : { data: null }

    return { props: { data: { teamOfLeague: teamOfLeague.data, country: country.data }, metadata: metadata.data, menu } }
  } catch (error) {
    return {
      redirect: {
        permanent: false, // or true
        destination: '/not-found'
      }
    }
  }
}
