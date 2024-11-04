import api from '@/api/api_instance'
import { getFixturesByCountry, getFixturesByTeamOrLeague, getMenus, getMetaData } from '@/resources/api-constants'
import { ILeagueMatches, IServerProps } from '@/types/app-type'
import { renderPrefixLang } from '@/utility/stringToSlug'
import { GetServerSidePropsContext } from 'next'
import dynamic from 'next/dynamic'

const LiveScorePage = dynamic(() => import('@/components/NationalOrLeague/components/LiveScore'))
const LayoutNationalOrLeague = dynamic(() => import('@/components/NationalOrLeague/LayoutNationalOrLeague'))

const LiveScore = ({ data, metadata, menu }: IServerProps<ILeagueMatches>) => {
  return (
    <LayoutNationalOrLeague data={data} metadata={metadata} menu={menu}>
      <LiveScorePage data={data} metadata={metadata} menu={menu}></LiveScorePage>
    </LayoutNationalOrLeague>
  )
}

export default LiveScore

export async function getServerSideProps(context: GetServerSidePropsContext) {
  api.defaults.headers.common['lang'] = context.locale
  const params = context.params
  const slugRaw: string = (params?.slug as string) ?? ''

  const slug = slugRaw.replace('-football', '')
  const type = slugRaw?.includes('-football') ? 'country' : 'league'
  const metadata = await getMetaData({
    type: type,
    slug: slug,
    url: `${renderPrefixLang(context.locale ?? '')}${slugRaw}/livescore`
  })

  const menu = await getMenus(context.locale ?? 'en')

  //pre-render data
  if (!slugRaw?.includes('-football')) {
    try {
      if (!slugRaw) {
        return
      }

      const teamSlug = slugRaw?.includes('-football') ? slugRaw.replace('-football', '') : slugRaw
      const result = await getFixturesByTeamOrLeague({
        slug: teamSlug,
        status: 3,
        page: 1,
        perPage: 15
      })

      return { props: { data: result.data, metadata: metadata.data, menu } }
    } catch (error) {
      return {
        redirect: {
          permanent: false, // or true
          destination: '/not-found'
        }
      }
    }
  } else {
    try {
      if (slugRaw) {
        const teamSlug = slugRaw?.includes('-football') ? slugRaw.replace('-football', '') : slugRaw
        const result = await getFixturesByCountry({
          countrySlug: teamSlug,
          status: 3,
          page: 1
        })

        return { props: { data: result.data, metadata: metadata.data, menu } }
      }
    } catch (error) {
      return {
        redirect: {
          permanent: false, // or true
          destination: '/not-found'
        }
      }
    }
  }
}
