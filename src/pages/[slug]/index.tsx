import api from '@/api/api_instance'
import NoData from '@/components/NoData/NoData'
import { getFixturesByCountry, getFixturesByTeamOrLeague, getMenus, getMetaData, getPostBySlug } from '@/resources/api-constants'
import { IAppMenu, ILeagueMatches, IMetadataModel, IPostList } from '@/types/app-type'
import { renderPrefixLang } from '@/utility/stringToSlug'
import { isEmpty, isNull, isUndefined } from 'lodash'
import { GetServerSidePropsContext } from 'next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

const ResultPage = dynamic(() => import('@/components/NationalOrLeague/components/Result'))
const NationalOrTournament = dynamic(() => import('@/components/NationalOrLeague/NationalOrLeague'))
const Default = dynamic(() => import('@/layouts/Default'))
const DetailNews = dynamic(() => import('@/components/DetailNews'))

interface IPostProps {
  post: IPostList
}

type StaticProps = {
  data: ILeagueMatches | IPostProps
  metadata: IMetadataModel
  menu: IAppMenu
}

const Result = ({ data, metadata, menu }: StaticProps) => {
  const regex = /-a\d+$/
  const pathname = useRouter()

  return (
    <div>
      {isUndefined(data) ? (
        <Default menu={menu} metadata={metadata}>
          Loading...
        </Default>
      ) : (
        <>
          {isEmpty(data) ? (
            <Default menu={menu} metadata={metadata}>
              <NoData />
            </Default>
          ) : (
            <Default menu={menu} metadata={metadata}>
              {!regex.test(pathname.asPath) ? (
                <NationalOrTournament metadata={metadata}>
                  <ResultPage menu={menu} data={data as ILeagueMatches} metadata={metadata}></ResultPage>
                </NationalOrTournament>
              ) : (
                <DetailNews menu={menu} data={data as IPostProps} metadata={metadata}></DetailNews>
              )}
            </Default>
          )}
        </>
      )}
    </div>
  )
}

export default Result

export async function getServerSideProps(context: GetServerSidePropsContext) {
  api.defaults.headers.common['lang'] = context.locale

  const menu = await getMenus(context.locale ?? 'en')
  const params = context.params
  const slugRaw = (params?.slug as string) ?? ''
  const slug = slugRaw.replace('-football', '')
  const type = slugRaw?.includes('-football') ? 'country' : 'league'
  // fetch data
  const metadata = await getMetaData({
    slug,
    url: `${renderPrefixLang(context.locale ?? '')}${slugRaw}`,
    type
  })

  //pre-render data
  const regex = /-a\d+$/

  if (regex.test(slugRaw)) {
    const regexGetSlug = /^(.*)-a\d+$/
    const slugForNews = slugRaw.replace(regexGetSlug, '$1')
    const metadata = await getMetaData({ type: 'detail-news', slug: slugForNews, url: `${renderPrefixLang(context.locale ?? '')}${slugForNews}` })

    try {
      const post = await getPostBySlug({ slug: slugForNews, timezone: Intl.DateTimeFormat().resolvedOptions().timeZone })

      if (isNull(post.data) || isEmpty(post.data) || post.data.toString() === 'No data')
        return {
          redirect: {
            permanent: true,
            destination: '/not-found'
          }
        }

      return { props: { data: { post: post.data }, metadata: metadata.data, menu } }
    } catch (error) {
      return {
        redirect: {
          permanent: true,
          destination: '/not-found'
        }
      }
    }
  } else {
    if (!slugRaw?.includes('-football')) {
      try {
        if (!slugRaw) {
          return
        }
        const teamSlug = slugRaw?.includes('-football') ? slugRaw.replace('-football', '') : slugRaw

        const result = await getFixturesByTeamOrLeague({
          slug: teamSlug,
          status: 2,
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
            status: 2,
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

  //pre-render data
}
